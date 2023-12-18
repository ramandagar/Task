import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import MatchSchedule from '../Components/MatchCard'


const UpcomingMatchesScreen = ({ navigation }) => {

  const matchesData = [
    { id: '1', team1: 'WC', team2: 'PK', prizePool: '30CR', date: '24 Dec' },
    { id: '2', team1: 'IN', team2: 'AUS', prizePool: '25CR', date: '10 Nov' },
    { id: '3', team1: 'ENG', team2: 'SA', prizePool: '35CR', date: '15 Dec' },
    { id: '4', team1: 'NZ', team2: 'SL', prizePool: '28CR', date: '18 Nov' },
    { id: '5', team1: 'AFG', team2: 'BAN', prizePool: '32CR', date: '30 Nov' },
    { id: '6', team1: 'WC', team2: 'ENG', prizePool: '30CR', date: '05 Dec' },
    { id: '7', team1: 'IN', team2: 'NZ', prizePool: '25CR', date: '22 Nov' },
    { id: '8', team1: 'AUS', team2: 'SA', prizePool: '35CR', date: '12 Dec' },
    { id: '9', team1: 'SL', team2: 'BAN', prizePool: '28CR', date: '17 Nov' },
    { id: '10', team1: 'AFG', team2: 'PK', prizePool: '32CR', date: '28 Nov' },
    { id: '11', team1: 'WC', team2: 'AUS', prizePool: '30CR', date: '08 Dec' },
    { id: '12', team1: 'ENG', team2: 'NZ', prizePool: '25CR', date: '20 Nov' },
    { id: '13', team1: 'IN', team2: 'SL', prizePool: '35CR', date: '14 Dec' },
    { id: '14', team1: 'SA', team2: 'BAN', prizePool: '28CR', date: '02 Dec' },
    { id: '15', team1: 'AFG', team2: 'WC', prizePool: '32CR', date: '25 Nov' },
    { id: '16', team1: 'PK', team2: 'ENG', prizePool: '30CR', date: '07 Dec' },
    { id: '17', team1: 'AUS', team2: 'NZ', prizePool: '25CR', date: '11 Nov' },
    { id: '18', team1: 'SL', team2: 'SA', prizePool: '35CR', date: '13 Dec' },
    { id: '19', team1: 'BAN', team2: 'AFG', prizePool: '28CR', date: '03 Dec' },
    { id: '20', team1: 'IN', team2: 'PK', prizePool: '32CR', date: '29 Nov' },
    // Add more match data as needed
  ];




  return (
    <View style={{flex:1}}>



      <ScrollView contentContainerStyle={styles.contentContainer}>
      <MatchSchedule matchData={matchesData} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});

export default UpcomingMatchesScreen;

