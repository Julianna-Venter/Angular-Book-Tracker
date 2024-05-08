import { createReducer, on } from '@ngrx/store';
import { UsableBooks } from '../../interfaces/booksInterfaces';
import { getBooksComplete, setSearchedBook } from '../actions/book.actions';

export const booksFeatureKey = 'Books API';

export interface BooksState {
  books: UsableBooks[];
  searchedBook: UsableBooks | null;
}

export const initialState: BooksState = {
  books: [],
  searchedBook: {} as UsableBooks,
};

export const booksReducer = createReducer(
  initialState,
  on(getBooksComplete, (state, { books }) => ({
    ...state,
    books,
  })),
  on(setSearchedBook, (state, { searchedBook }) => ({
    ...state,
    searchedBook,
  }))
);
