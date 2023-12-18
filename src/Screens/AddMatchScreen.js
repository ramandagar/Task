import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button, Card, Paragraph, TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { addSlot } from '../Slices/MatchSlice';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const AddMatchScreen = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);

  const dispatch = useDispatch();
  const slots = useSelector((state) => state.schedule.slots);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateChange = (date) => {
    hideDatePicker();
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
  };

  const showTimePicker = (isStartTime) => {
    if (isStartTime) {
      setStartTimePickerVisibility(true);
    } else {
      setEndTimePickerVisibility(true);
    }
  };

  const hideTimePicker = () => {
    setStartTimePickerVisibility(false);
    setEndTimePickerVisibility(false);
  };

  const handleTimeChange = (time, isStartTime) => {
    hideTimePicker();
    const formattedTime = moment(time).format('hh:mm A'); 

  
    if (isStartTime) {
      setSelectedStartTime(formattedTime);
      if (selectedEndTime && moment(formattedTime, 'HH:mm').isSameOrAfter(moment(selectedEndTime, 'HH:mm'))) {
        Alert.alert('Invalid Time', 'Start time must be before end time.');
        setSelectedStartTime('');
      }
    } else {
      setSelectedEndTime(formattedTime);
       if (
        selectedStartTime &&
        (!moment(formattedTime, 'HH:mm').isSameOrAfter(moment(selectedStartTime, 'HH:mm')) ||
          moment(formattedTime, 'HH:mm').diff(moment(selectedStartTime, 'HH:mm'), 'hours') > 4)
      ) {
        Alert.alert('Invalid Time', 'End time must be after start time and within a 2-hour range.');
        setSelectedEndTime('');
      }
    }
  };
  

  const toggleDaySelection = (day) => {
    if (day === 'All') {
      setSelectedDays(selectedDays.length === daysOfWeek.length ? [] : [...daysOfWeek]);
    } else {
      const updatedDays = selectedDays.includes(day)
        ? selectedDays.filter((selectedDay) => selectedDay !== day)
        : [...selectedDays, day];
      setSelectedDays(updatedDays);
    }
  };

  const areAllDaysSelected = selectedDays.length === daysOfWeek.length;

  const isOverlap = () => {
    const newSlotStart = moment(`${selectedDate} ${selectedStartTime}`, 'YYYY-MM-DD HH:mm');
    const newSlotEnd = moment(`${selectedDate} ${selectedEndTime}`, 'YYYY-MM-DD HH:mm');

    return slots.some((slot) => {
      const existingSlotStart = moment(`${slot.date} ${slot.startTime}`, 'YYYY-MM-DD HH:mm');
      const existingSlotEnd = moment(`${slot.date} ${slot.endTime}`, 'YYYY-MM-DD HH:mm');

      return (
        newSlotStart.isBetween(existingSlotStart, existingSlotEnd, null, '[)') ||
        newSlotEnd.isBetween(existingSlotStart, existingSlotEnd, null, '(]')
      );
    });
  };

  const saveSlot = () => {
    let errorMessage = '';

    if (!selectedDate) {
      errorMessage += 'Please select a date.\n';
    }

    if (!selectedStartTime) {
      errorMessage += 'Please select a start time.\n';
    }

    if (!selectedEndTime) {
      errorMessage += 'Please select an end time.\n';
    }

 

    if (errorMessage) {
      Alert.alert('Missing Information', errorMessage);
      return;
    }


    const newSlot = {
      date: selectedDate,
      startTime: selectedStartTime,
      endTime: selectedEndTime,
      days: areAllDaysSelected ? [] : selectedDays,
    };

    if (isOverlap()) {
      Alert.alert('Overlap Warning', 'The selected time slot overlaps with an existing slot.');
    } else {
      dispatch(addSlot(newSlot));
      navigation.goBack();
    }
  };


  const DateTimePickerButton = ({ onPress, label, value }) => (
    <View style={{marginVertical:10}}>
      <Card>
        <Card.Content>
          <Paragraph>{label}</Paragraph>
          <TouchableOpacity onPress={onPress} style={styles.dateTimePickerTouchable}>
            <TextInput
              mode="outlined"
              style={styles.dateTimePickerInput}
              value={value || label}
              editable={false}
            />
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Schedule Your Match Timings</Text>

      <DateTimePickerButton label="Select Date:" onPress={showDatePicker} value={selectedDate} />

<DateTimePickerButton
  label="Select Start Time:"
  onPress={() => showTimePicker(true)}
  value={selectedStartTime}
/>

<DateTimePickerButton
  label="Select End Time:"
  onPress={() => showTimePicker(false)}
  value={selectedEndTime}
/>
      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateChange}
        onCancel={hideDatePicker}
      />

      <DateTimePickerModal
        isVisible={isStartTimePickerVisible}
        mode="time"
        onConfirm={(time) => handleTimeChange(time, true)}
        onCancel={hideTimePicker}
      />

      <DateTimePickerModal
        isVisible={isEndTimePickerVisible}
        mode="time"
        onConfirm={(time) => handleTimeChange(time, false)}
        onCancel={hideTimePicker}
      />
      <Button  mode='contained' onPress={saveSlot} >Save Match</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'white'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:20
  },
  checkboxContainer: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 10,
    marginHorizontal: 5,
  },
  selectedDay: {
    backgroundColor: '#ADD8E6',  
  },
});

export default AddMatchScreen;
