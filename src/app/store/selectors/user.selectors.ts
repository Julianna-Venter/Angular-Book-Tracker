import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserDataState, userDataFeatureKey } from '../reducers/user.reducer';

export const selectFeatureUsers =
  createFeatureSelector<UserDataState>(userDataFeatureKey);

export const selectgetUserData = createSelector(
  selectFeatureUsers,
  (state) => state.users
);

export const selectsetUserData = createSelector(
  selectFeatureUsers,
  (state) => state.users
);

export const selectAddToList = createSelector(
  selectFeatureUsers,
  (state) => state.users
);

export const selectRemoveFromList = createSelector(
  selectFeatureUsers,
  (state) => state.users
);

export const selectGetBookList = createSelector(
  selectFeatureUsers,
  (state) => state.bookList
);
