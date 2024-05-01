import { createReducer, on } from '@ngrx/store';
import { UserResponse } from '../../interfaces/authInterface';
import {
  getUserDataComplete,
  loginComplete,
  setUserDataComplete,
  signUpComplete,
} from '../actions';

export const featureKey = 'User Store';

export interface UserState {
  user: UserResponse;
}

export const initialState: UserState = {
  user: {} as UserResponse,
};

export let username: string;

export const booksReducer = createReducer(
  initialState,
  on(loginComplete, (state, { username }) => ({
    ...state,
    username,
  })),
  on(signUpComplete, (state, { username }) => ({
    ...state,
    username,
  })),
  on(getUserDataComplete, (state, { user }) => ({
    ...state,
    user,
  })),
  on(setUserDataComplete, (state) => ({
    ...state,
  }))
);
