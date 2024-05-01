import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, featureKey } from './user.reducer';

export const selectFeatureUsers = createFeatureSelector<UserState>(featureKey);
export const selectFeatureCredentials =
  createFeatureSelector<string>(featureKey);

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
  (state) => state.user
);

export const selectsetUserData = createSelector(
  selectFeatureUsers,
  (state) => state.user
);
