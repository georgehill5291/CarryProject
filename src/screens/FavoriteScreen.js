import { useIsFocused } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import VerseItem from '../components/Book/VerseItem';
import PublicHeader from '../components/shared/PublicHeader';
import { BookContext } from '../context/BookContext';

const FavoriteScreen = ({ navigation }) => {
  const {
    bookState: { localVerseListing },
    getLocalVerse
  } = useContext(BookContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    getLocalVerse();
  }, [isFocused]);

  return (
    <View>
      <PublicHeader title="Favorite" />
      {localVerseListing &&
        localVerseListing.length > 0 &&
        localVerseListing.map((item, index) => (
          <VerseItem
            item={item}
            key={index}
            isFavorite={true}
            navigation={navigation}
          />
        ))}
    </View>
  );
};

export default FavoriteScreen;
