import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState, featureKey } from './book.reducer';

export const selectFeature = createFeatureSelector<BooksState>(featureKey);

export const selectBooks = createSelector(
  selectFeature,
  (state) => state.books
);
