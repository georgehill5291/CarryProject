import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from './../../assets/theme';

const BibleBook = ({ navigation, item }) => {
  const onBookPress = () => {
    console.log('item', item.id);
    navigation.navigate('BookDetail', { bookId: item.id });
  };

  return (
    <View style={styles.Container}>
      <TouchableOpacity onPress={onBookPress}>
        <Text style={styles.BibleBookTitle}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    padding: theme.spacing.m
  },
  BibleBookTitle: {}
});

export default BibleBook;
