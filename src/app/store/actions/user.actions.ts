import { createAction, props } from '@ngrx/store';
import { FirestoreUser, UsableBooks } from '../../interfaces/booksInterfaces';

export interface SetUserDataError {
  message: string;
}

//Application Actions

//get data
export const getUserData = createAction(
  '[User Data] getData',
  props<{ email: string }>()
);

export const getUserDataComplete = createAction(
  '[User Data] getDataComplete',
  props<{ users: FirestoreUser[] }>()
);

export const addToList = createAction(
  '[User Data] addToList',
  props<{ list: string; book: UsableBooks; user: FirestoreUser }>()
);

export const addToListComplete = createAction('[User Data] addToListComplete');

export const removeFromList = createAction(
  '[User Data] removeFromList',
  props<{ list: string; bookId: string; userId: string }>()
);

export const removeFromListComplete = createAction(
  '[User Data] removeFromListComplete'
);

export const getMatchedBook = createAction(
  '[User Data] getMatchedBook',
  props<{ user: FirestoreUser; list: string; bookId: string }>()
);

export const getBookList = createAction(
  '[User Data] getBookList',
  props<{ user: FirestoreUser; list: string }>()
);

export const getBookListComplete = createAction(
  '[User Data] getBookListComplete',
  props<{ books: UsableBooks[] }>()
);
