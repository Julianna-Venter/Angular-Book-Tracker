import { createAction, props } from '@ngrx/store';
import { BookArrays, Volume, UsableBooks } from '../interfaces/booksInterfaces';

//API Actions

export const getBooksAction = createAction(
  '[Books API] GetBooks',
  props<{ query: string }>()
);

export const getBooksComplete = createAction(
  '[Books API] GetBooksComplete',
  props<{ books: UsableBooks[] }>()
);

//Application Actions

export const login = createAction(
  '[Login Page] Login',
  props<{ username: string; password: string }>()
);
