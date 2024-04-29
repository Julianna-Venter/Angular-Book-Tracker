import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState, featureKey } from './reducer';

export const selectfeature = createFeatureSelector<BooksState>(featureKey);

export const selectBooks = createSelector(
  selectfeature,
  (state) => state.books
);
