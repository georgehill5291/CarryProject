import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import {
  apiUrl,
  BOOK_LOADED_SUCCESS,
  LOCAL_BOOK_LOADED_SUCCESS
} from '../helper/ConstUtil';
import Storage from '../helper/Storage';
import { bookReducer } from '../reducers/BookReducer';

const defaultData = {
  verseListing: [],
  localVerseListing: []
};

export const BookContext = createContext({
  bookState: defaultData,
  getBook: () => {},
  getLocalVerse: () => {}
});

const BookContextProvider = ({ children }) => {
  //reducer
  const [bookState, dispatch] = useReducer(bookReducer, defaultData);

  //get book
  const getBook = async bookId => {
    try {
      const response = await axios.get(`${apiUrl}/${bookId}`);

      // alert(response.data.verses[0].text);

      if (response.data) {
        dispatch({
          type: BOOK_LOADED_SUCCESS,
          payload: {
            verseListing: response.data.verses
          }
        });
      }
    } catch (error) {
      // ADD THIS THROW error
      alert(error.message);
    }
  };

  //get book
  const getLocalVerse = async bookId => {
    try {
      let localVerseListing = await Storage.getItem('favoriteVerses');

      //alert(response);

      if (localVerseListing) {
        dispatch({
          type: LOCAL_BOOK_LOADED_SUCCESS,
          payload: {
            localVerseListing: localVerseListing
          }
        });
      }
    } catch (error) {
      // ADD THIS THROW error
      alert(error.message);
    }
  };

  const bookContextData = {
    bookState: bookState,
    getBook: getBook,
    getLocalVerse
  };

  return (
    <BookContext.Provider value={bookContextData}>
      {children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
