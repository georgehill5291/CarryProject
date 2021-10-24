import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import theme from '../../assets/theme';
import { BookContext } from '../../context/BookContext';
import Storage from '../../helper/Storage';

const VerseItem = ({ navigation, item, isFavorite = false }) => {
  const {
    bookState: { localVerseListing, verseListing }
  } = useContext(BookContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const isExist = localVerseListing.filter(t => t.text === item.text);
    if (isExist && isExist.length > 0) {
      setIsActive(true);
    }
  }, [verseListing]);

  const onVersePress = async () => {
    if (!isFavorite) {
      onVersePress4Normal();
    } else {
      onVersePress4Favorite();
    }
  };

  const onVersePress4Favorite = () => {
    console.log('bookId', item);
    navigation.navigate('BookDetail', {
      bookId: `${item.book_name} ${item.chapter}`
    });
  };

  const onVersePress4Normal = async () => {
    setIsActive(!isActive);

    let favoriteVerses = await Storage.getItem('favoriteVerses');
    console.log('favoriteVerses', favoriteVerses);

    if (!isActive) {
      if (favoriteVerses) {
        var isExist = favoriteVerses.find(a => a.text === item.text);
        if (!isExist) {
          favoriteVerses.push(item);
          // console.log('multi books', currentLocalBooks);
          await Storage.setItem('favoriteVerses', favoriteVerses);
        }
      } else {
        let books = [];
        books.push(item);
        await Storage.setItem('favoriteVerses', books);
      }
    } else {
      const newFavoriteVerses = favoriteVerses.filter(
        t => t.text !== item.text
      );
      await Storage.setItem('favoriteVerses', newFavoriteVerses);
    }
  };

  return (
    <View>
      <TouchableHighlight
        activeOpacity={1}
        style={isActive ? styles.ActiveVerse : styles.NormalVerse}
        onPress={onVersePress}>
        <Text style={styles.VerItemWrapper}>{item.text}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  ActiveVerse: {
    backgroundColor: 'yellow'
  },
  NormalVerse: {},
  VerItemWrapper: {
    paddingLeft: theme.spacing.m,
    paddingRight: theme.spacing.m
  }
});

export default VerseItem;
