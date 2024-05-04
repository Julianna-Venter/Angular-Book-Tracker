import { createReducer, on } from '@ngrx/store';
import { loginComplete, signUpComplete } from '../actions';

export const userFeatureKey = 'User Store';

export interface UserState {
  username: string | null;
  email: string | null;
}

export const initialState: UserState = {
  username: null,
  email: null,
};

export const userReducer = createReducer(
  initialState,
  on(loginComplete, (state, { username, email }) => ({
    ...state,
    username,
    email,
  })),
  on(signUpComplete, (state, { username, email }) => ({
    ...state,
    username,
    email,
  }))
);
