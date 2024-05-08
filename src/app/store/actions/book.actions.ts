import { createAction, props } from '@ngrx/store';
import { UsableBooks } from '../../interfaces/booksInterfaces';

export interface SetUserDataError {
  message: string;
}

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
