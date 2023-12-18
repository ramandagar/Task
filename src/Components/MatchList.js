import { View, Text, Alert ,FlatList,Button} from 'react-native'
import React ,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMatchesFromStorage, saveMatchesToStorage } from '../services/AsyncStorage';
import { addMatch, deleteMatch } from '../Slices/MatchSlice';
import store from '../Store/Store';

const MatchList = ({navigation}) => {
    const dispatch = useDispatch();
    const matches = store.getState().matches.schedule
    console.log('matches',matches)
    
    useEffect(() => {
      const loadMatches = async () => {
        const storedMatches = await getMatchesFromStorage();
        storedMatches.forEach((match) => dispatch(addMatch(match)));
      };
  
      loadMatches();
    }, [dispatch]);
  
    const handleDeleteMatch = (matchId) => {
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
              dispatch(deleteMatch(matchId));
              saveMatchesToStorage(matches);
            },
            style: 'destructive',
          },
        ],
        { cancelable: false }
      );
    };
  
  

 
    const renderItem = ({ item }) => (
        <View>
          <Text>{item.title}</Text>
          <Text>{item.time}</Text>
          <Button title="Delete" onPress={() => handleDeleteMatch(item.id)} />
          <Button title="Edit" onPress={() => handleEditMatch(item.id)} />
        </View>
      );

    const handleEditMatch = (matchId) => {
      navigation.navigate('EditMatch',matchId);
    };
  return (
    <View>
      <Text>MatchList</Text>

        <FlatList
        data={matches}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} />
      
    </View>
  )
}

export default MatchList