import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { deleteSlot } from '../Slices/MatchSlice';

const MainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const slots = useSelector((state) => state.schedule.slots);

  const navigateToAddMatch = () => {
    navigation.navigate('AddMatch');
  };

  const navigateToEditMatch = (index) => {
    navigation.navigate('EditMatch', { index });
  };

  const handleDelete = (index) => {
    Alert.alert(
      'Delete Match',
      'Are you sure you want to delete this match?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            dispatch(deleteSlot(index));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderDays = (days) => {
    if (days.length === 7) {
      return 'All Days';
    }
    return days.join(', ');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Match Scheduling App</Text>

      <Button icon="plus" mode="contained" onPress={navigateToAddMatch}>
        Schedule Your Match
      </Button>

      {slots.length === 0 ? (
        <Text style={styles.noMatchesText}>No matches scheduled yet.</Text>
      ) : (
        <FlatList
          data={slots}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Card key={index} style={styles.slotCard}>
              <Card.Content>
                <Text>{`Date: ${item.date}, Time: ${item.startTime} - ${item.endTime}`}</Text>
                {item?.days?.length !== 0 && <Text>Day schedule: {renderDays(item.days)}</Text>}
              </Card.Content>
              <Card.Actions>
                <Button mode="outlined" icon="pencil" onPress={() => navigateToEditMatch(index)}>
                  Edit Match
                </Button>
                <Button onPress={() => handleDelete(index)}>Delete</Button>
              </Card.Actions>
            </Card>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  slotCard: {
    marginVertical: 10,
  },
  noMatchesText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MainScreen;
