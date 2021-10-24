import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BibleBook from '../components/Book/BibleBook';
import PublicHeader from '../components/shared/PublicHeader';
import Storage from '../helper/Storage';

const bibleBookSampleList = [
  {
    id: 'John 1',
    title: 'John chapter 1'
  },
  {
    id: 'John 2',
    title: 'John chapter 2'
  },
  {
    id: 'John 3',
    title: 'John chapter 3'
  },
  {
    id: 'John 4',
    title: 'John chapter 4'
  },
  {
    id: 'John 5',
    title: 'John chapter 5'
  },
  {
    id: 'Genesis 1',
    title: 'Genesis chapter 1'
  },
  {
    id: 'Genesis 2',
    title: 'Genesis chapter 2'
  },
  {
    id: 'Genesis 3',
    title: 'Genesis chapter 3'
  },
  {
    id: 'Genesis 4',
    title: 'Genesis chapter 4'
  },
  {
    id: 'Genesis 5',
    title: 'Genesis chapter 5'
  }
];

const BibleBookScreen = ({ navigation }) => {
  // Storage.removeItem('favoriteVerses');
  return (
    <View>
      <PublicHeader />
      <View>
        <FlatList
          data={bibleBookSampleList}
          renderItem={({ item, index }) => (
            <BibleBook navigation={navigation} item={item} key={index} />
          )}
          keyExtractor={item => item.id}
          numColumns={1}
        />
      </View>
    </View>
  );
};

export default BibleBookScreen;
