import { createAction, props } from '@ngrx/store';
import { Volume } from '../interfaces/booksInterfaces';

//API Actions

export const getBooksAction = createAction(
  '[Books API] GetBooks',
  props<{ query: string }>()
);

export const getBooksComplete = createAction(
  '[Books API] GetBooksComplete',
  props<{ books: Volume[] }>()
);

//Application Actions

export const login = createAction(
  '[Login Page] Login',
  props<{ username: string; password: string }>()
);
