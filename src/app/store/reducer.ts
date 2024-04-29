import { createReducer, on } from '@ngrx/store';
import { Volume } from '../interfaces/booksInterfaces';
import * as BookActions from './actions';

export const featureKey = 'Books API';

export interface BooksState {
  books: Volume[];
}

export const initialState: BooksState = {
  books: [],
};

export const booksReducer = createReducer(
  initialState,
  on(BookActions.getBooksComplete, (state, { books }) => ({
    ...state,
    books,
  }))
);

// export const metaReducers: MetaReducer<OpsState>[] = isDevMode() ? [] : [];
