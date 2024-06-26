import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState, booksFeatureKey } from './book.reducer';

export const selectFeature = createFeatureSelector<BooksState>(booksFeatureKey);

export const selectBooks = createSelector(
  selectFeature,
  (state) => state.books
);
