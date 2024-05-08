import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState, booksFeatureKey } from '../reducers/book.reducer';

export const selectFeature = createFeatureSelector<BooksState>(booksFeatureKey);

export const selectBooks = createSelector(
  selectFeature,
  (state) => state.books
);

export const selectSearchedBook = createSelector(
  selectFeature,
  (state) => state.searchedBook
);

export const selectRemoveFromList = createSelector(
  selectFeature,
  (state) => state.searchedBook
);
