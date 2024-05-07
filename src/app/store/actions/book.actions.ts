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
