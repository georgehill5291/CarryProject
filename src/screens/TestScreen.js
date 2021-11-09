import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const TestScreen = () => {
  const data = [
    'Test Screen 1',
    'Test Screen 2',
    'Test Screen 3',
    ' Screen 4',
    'a Test Screen 5'
  ];

  return (
    <Text style={styles.Container}>
      {data.map(item => (
        <Text>{item}</Text>
      ))}
    </Text>
  );
};

const styles = StyleSheet.create({
  Container: {}
});

export default TestScreen;
