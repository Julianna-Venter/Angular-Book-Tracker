import { createReducer, on } from '@ngrx/store';
import { FirestoreUser } from '../../interfaces/booksInterfaces';
import { getUserDataComplete } from '../actions';

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
  }))
);
