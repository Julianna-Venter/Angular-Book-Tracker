import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserDataState, userDataFeatureKey } from './user-data.reducer';
import { UserState, userFeatureKey } from './user.reducer';

export const selectFeatureUsers =
  createFeatureSelector<UserDataState>(userDataFeatureKey);
export const selectFeatureCredentials =
  createFeatureSelector<UserState>(userFeatureKey);

export const selectLogin = createSelector(
  selectFeatureCredentials,
  (state) => state
);

export const selectSignUp = createSelector(
  selectFeatureCredentials,
  (state) => state
);

export const selectgetUserData = createSelector(
  selectFeatureUsers,
  (state) => state.users
);

export const selectsetUserData = createSelector(
  selectFeatureUsers,
  (state) => state.users
);
