import { createReducer, on } from '@ngrx/store';
import { UserResponse } from '../../interfaces/authInterface';
import { getUserDataComplete, loginComplete, signUpComplete } from '../actions';
import { FirestoreUser } from '../../interfaces/booksInterfaces';

export const userFeatureKey = 'User Store';

export interface UserState {
  users: FirestoreUser;
}

export const initialState: UserState = {
  users: {} as FirestoreUser,
};

export let username: string;

export const userReducer = createReducer(
  initialState,
  on(loginComplete, (state, { username }) => ({
    ...state,
    username,
  })),
  on(signUpComplete, (state, { username }) => ({
    ...state,
    username,
  })),
  on(getUserDataComplete, (state, { users }) => ({
    ...state,
    users,
  }))
);
