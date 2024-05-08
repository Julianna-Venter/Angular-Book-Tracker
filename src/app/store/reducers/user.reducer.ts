import { createReducer, on } from '@ngrx/store';
import { FirestoreUser } from '../../interfaces/booksInterfaces';
import {
  addToListComplete,
  getUserDataComplete,
  removeFromListComplete,
} from '../actions/user.actions';

export const userDataFeatureKey = 'User Data Store';

export interface UserDataState {
  users: FirestoreUser[];
}

export const initialState: UserDataState = {
  users: [],
};

export const userDataReducer = createReducer(
  initialState,
  on(getUserDataComplete, (state, { users }) => ({
    ...state,
    users,
  })),
  on(addToListComplete, (state) => ({
    ...state,
  })),
  on(removeFromListComplete, (state) => ({
    ...state,
  }))
);
