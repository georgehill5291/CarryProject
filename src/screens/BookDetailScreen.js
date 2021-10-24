import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
      setVerseListing(response.data.verses);
      setIsLoading(false);
      console.log('scrollText', scrollText);

      if (scrollText) {
        const indexScrollText = response.data.verses.findIndex(
          x => x.text === scrollText
        );
        console.log('indexScrollText', indexScrollText);

        setTimeout(() => {
          scrollViewRef.current.scrollTo({ y: indexScrollText * 100 });
        }, 100);
      }
    }
    fetchMyAPI();
    getLocalVerse();
  }, []);

  return (
    <View style={styles.Container}>
      <Text style={styles.BookTitle}>{bookId}</Text>
      {isLoading ? <LoadingView /> : <></>}
      <ScrollView ref={scrollViewRef}>
        {verseListing &&
          verseListing.length > 0 &&
          verseListing.map(item => (
            <VerseItem
              item={item}
              key={item.verse}
              style={styles.VerItemWrapper}
            />
          ))}
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
  ActiveVerse: {
    backgroundColor: 'yellow'
  },
  NormalVerse: {}
});

export default BookDetailScreen;
