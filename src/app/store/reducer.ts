import { createReducer, on } from '@ngrx/store';
import { UsableBooks } from '../interfaces/booksInterfaces';
import { getBooksComplete } from './actions';

export const featureKey = 'Books API';

export interface BooksState {
  books: UsableBooks[];
  error: string | null;
  status: string;
}

export const initialState: BooksState = {
  books: [],
  error: null,
  status: 'pending',
};

export const booksReducer = createReducer(
  initialState,
  on(getBooksComplete, (state, { books }) => ({
    ...state,
    books,
    status: 'success',
    error: null,
  }))
);

// export const metaReducers: MetaReducer<OpsState>[] = isDevMode() ? [] : [];
