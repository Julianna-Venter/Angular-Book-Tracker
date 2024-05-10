import { createAction, props } from '@ngrx/store';
import { FirestoreUser, UsableBooks } from '../../interfaces/booksInterfaces';

//API Actions

export const getBooksAction = createAction(
  '[Books API] GetBooks',
  props<{ query: string }>()
);

export const getBooksComplete = createAction(
  '[Books API] GetBooksComplete',
  props<{ books: UsableBooks[] }>()
);

export const setSearchedBook = createAction(
  '[Books API] SetSearchedBooks',
  props<{ searchedBook: UsableBooks | null }>()
);

export const setSearchedBookComplete = createAction(
  '[Books API] SetSearchedBooksComplete',
  props<{ searchedBook: UsableBooks }>()
);

export const getSearchedBook = createAction(
  '[Books API] GetSearchedBooks',
  props<{ bookId: string; user: FirestoreUser; list: string }>()
);

export const getSearchedBookComplete = createAction(
  '[Books API] GetSearchedBooksComplete',
  props<{ searchedBook: UsableBooks }>()
);
