import { createReducer, on } from '@ngrx/store';
import { FirestoreUser, UsableBooks } from '../../interfaces/booksInterfaces';
import {
  addToListComplete,
  getBookListComplete,
  getUserDataComplete,
  removeFromListComplete,
} from '../actions/user.actions';

export const userDataFeatureKey = 'User Data Store';

export interface UserDataState {
  users: FirestoreUser[];
  bookList: UsableBooks[];
}

export const initialState: UserDataState = {
  users: [],
  bookList: [],
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
  })),
  on(getBookListComplete, (state, { books }) => ({
    ...state,
    bookList: books,
  }))
);
