import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import PublicHeader from '../components/shared/PublicHeader';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BibleBookScreen from './BibleBookScreen';
import FavoriteScreen from './FavoriteScreen';
import { BookContext } from '../context/BookContext';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const {
    bookState: { localVerseListing },
    getLocalVerse
  } = useContext(BookContext);

  useEffect(() => {
    getLocalVerse();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="BibleBook"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63'
      }}>
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen
        name="BibleBook"
        component={BibleBookScreen}
        options={{
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
