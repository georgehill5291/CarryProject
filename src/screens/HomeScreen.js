import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import PublicHeader from '../components/shared/PublicHeader';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BibleBookScreen from './BibleBookScreen';
import FavoriteScreen from './FavoriteScreen';
import { BookContext } from '../context/BookContext';
import Storage from '../helper/Storage';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    async function callAsyncFunction() {
      let localVerseListing = await Storage.getItem('favoriteVerses');
      console.log('favoriteVerses', localVerseListing);
      if (localVerseListing && localVerseListing.length > 0) {
        navigation.navigate('Favorite');
      }
    }
    callAsyncFunction();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="BibleBook"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 15
        },
        tabBarIconStyle: { display: 'none' }
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
          headerShown: false,
          tabBarIcon: null
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
