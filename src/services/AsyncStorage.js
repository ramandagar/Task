import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'fantasyMatchSchedule';

export const saveMatchesToStorage = async (matches) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
  } catch (error) {
    console.error('Error saving matches to storage:', error);
  }
};

export const getMatchesFromStorage = async () => {
  try {
    const matchesString = await AsyncStorage.getItem(STORAGE_KEY);
    return matchesString ? JSON.parse(matchesString) : [];
  } catch (error) {
    console.error('Error getting matches from storage:', error);
    return [];
  }
};
