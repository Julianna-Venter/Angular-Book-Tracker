import { createReducer, on } from '@ngrx/store';
import { UsableBooks } from '../../interfaces/booksInterfaces';
import { getBooksComplete } from '../actions/book.actions';

export const booksFeatureKey = 'Books API';

export interface BooksState {
  books: UsableBooks[];
}

export const initialState: BooksState = {
  books: [],
};

export const booksReducer = createReducer(
  initialState,
  on(getBooksComplete, (state, { books }) => ({
    ...state,
    books,
  }))
);
