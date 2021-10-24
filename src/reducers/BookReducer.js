import {
  BOOK_LOADED_SUCCESS,
  LOCAL_BOOK_LOADED_SUCCESS
} from '../helper/ConstUtil';

export const bookReducer = (state, action) => {
  console.log('action', action);
  switch (action.type) {
    case BOOK_LOADED_SUCCESS:
      return {
        ...state,
        verseListing: action.payload.verseListing
      };
    case LOCAL_BOOK_LOADED_SUCCESS:
      return {
        ...state,
        localVerseListing: action.payload.localVerseListing
      };
    default:
      return state;
  }
};
