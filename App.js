/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BookContextProvider from './src/context/BookContext';
import BibleBookScreen from './src/screens/BibleBookScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import HomeScreen from './src/screens/HomeScreen';

const App: () => Node = () => {
  const Stack = createNativeStackNavigator();

  return (
    <BookContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BookDetail"
            component={BookDetailScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BookContextProvider>
  );
};

export default App;
