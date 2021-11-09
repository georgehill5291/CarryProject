import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import theme from '../assets/theme';
import VerseItem from '../components/Book/VerseItem';
import LoadingView from '../components/shared/LoadingView';
import { BookContext } from '../context/BookContext';
import { apiUrl } from '../helper/ConstUtil';

const BookDetailScreen = ({ route, navigation }) => {
  const { bookId, scrollText } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [verseListing, setVerseListing] = useState([]);
  const scrollViewRef = useRef();

  const { getBook, getLocalVerse } = useContext(BookContext);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await axios.get(`${apiUrl}/${bookId}`);
      // console.log('data', response.data.verses);
      const tempVerse = response.data.verses.map(t =>
        t.text ? { ...t, text: t.text.replace('\n', ' ') } : { ...t }
      );
      console.log('data', tempVerse);
      setVerseListing(tempVerse);
      setIsLoading(false);
      console.log('scrollText', scrollText);

      if (scrollText) {
        const indexScrollText = response.data.verses.findIndex(
          x => x.text === scrollText
        );
        console.log('indexScrollText', indexScrollText);

        setTimeout(() => {
          scrollViewRef.current.scrollToIndex({ y: indexScrollText });
        }, 100);
      }
    }
    fetchMyAPI();
    getLocalVerse();
  }, []);

  const handleScroll = event => {
    console.log(event.nativeEvent.contentOffset.y);
  };

  return (
    <View style={styles.Container}>
      <Text style={styles.BookTitle}>{bookId}</Text>
      {isLoading ? <LoadingView /> : <></>}
      <ScrollView
        ref={scrollViewRef}
        style={styles.ScrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <Text style={styles.VerItemWrapper}>
          {verseListing &&
            verseListing.length > 0 &&
            verseListing.map(item => (
              <VerseItem item={item} key={item.verse} />
            ))}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  BookTitle: {
    fontSize: 24,
    marginBottom: 10
  },
  BookVerse: {
    fontSize: 12
  },
  ScrollView: {
    paddingLeft: theme.spacing.m,
    paddingRight: theme.spacing.m
  },
  VerItemWrapper: {
    flexDirection: 'row',
    flexShrink: 1
  }
});

export default BookDetailScreen;
