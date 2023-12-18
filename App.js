import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './src/Store/Store';
import 'react-native-gesture-handler';
import HomeScreen from './src/Screens/HomeScreen';
import EditMatchScreen from './src/Screens/EditMatchScreen';
import AddMatchScreen from './src/Screens/AddMatchScreen';
import UpcomingMatchesScreen from './src/Screens/UpcomingMatchesScreen';
 import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MatchList from './src/Components/MatchList';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddMatch" component={AddMatchScreen} />
      <Stack.Screen name="EditMatch" component={EditMatchScreen} />
    </Stack.Navigator>
  );
};

const CalnedarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Upcoming Matches" component={UpcomingMatchesScreen} />
    </Stack.Navigator>
  );
};

 

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: 'black',
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'MyMatches') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              }  

              return <Icon name={iconName} size={25} />;
            },
          })}>
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="MyMatches" component={CalnedarStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
