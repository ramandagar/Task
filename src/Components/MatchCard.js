// MatchSchedule.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const MatchScheduleItem = ({ team1, team2, prizePool ,date}) => (
  <>
    <View style={styles.matchContainer}>
      <View style={styles.teamContainer}>
        <Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.teamLogo} />
        <Text>{team1}</Text>
      </View>
      <Text>VS</Text>
      <View style={styles.teamContainer}>
        <Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.teamLogo} />
        <Text>{team2}</Text>
      </View>
    </View>
    <View style={styles.prizeContainer}>
      <Text style={styles.prizeText}>Prize Pool worth {prizePool}</Text>
      <Text style={[styles.prizeText,{ color: '#F08080	',}]}>{date}</Text>
      <Image source={{ uri: 'https://cdn.vectorstock.com/i/1000x1000/95/33/share-icon-sharing-social-media-in-frame-vector-31579533.webp' }} style={styles.shareIcon} />
    </View>
  </>
);

const MatchSchedule = ({ matchData }) => (
  <View>
    <FlatList
      data={matchData}
      renderItem={({ item }) => <MatchScheduleItem {...item} />}
      keyExtractor={(item) => item.id}
    />
  </View>
);

const styles = {
  matchContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flex: 1,
    height: 100,
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
   
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderTopRightRadius:8,
    borderTopLeftRadius:8,
  },
  teamContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  teamLogo: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  prizeContainer: {
    height: 40,
    marginHorizontal: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 10,
    borderBottomRightRadius:8,
    borderBottomLeftRadius:8,
  },
  prizeText: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 16,
    color: '#6897bb',
    fontWeight:'bold'
  },
  shareIcon: {
    height: 25,
    width: 25,
    borderRadius: 50,
    marginHorizontal: 10,
  },
};

export default MatchSchedule;
