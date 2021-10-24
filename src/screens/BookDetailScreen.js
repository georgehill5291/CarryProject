import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import theme from '../assets/theme';
import VerseItem from '../components/Book/VerseItem';
import LoadingView from '../components/shared/LoadingView';
import { BookContext } from '../context/BookContext';
import { apiUrl } from '../helper/ConstUtil';

const BookDetailScreen = ({ route, navigation }) => {
  const { bookId } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [verseListing, setVerseListing] = useState([]);

  const { getBook, getLocalVerse } = useContext(BookContext);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await axios.get(`${apiUrl}/${bookId}`);
      console.log('data', response.data.verses);
      setVerseListing(response.data.verses);
    }
    fetchMyAPI();
    getLocalVerse();
  }, []);

  return (
    <View style={styles.Container}>
      {/* {isLoading ? <LoadingView /> : <></>} */}
      <Text style={styles.BookTitle}>{bookId}</Text>
      <ScrollView>
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
