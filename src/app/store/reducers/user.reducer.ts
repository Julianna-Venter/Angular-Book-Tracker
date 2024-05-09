import { createReducer, on } from '@ngrx/store';
import { FirestoreUser, UsableBooks } from '../../interfaces/booksInterfaces';
import { UserCalcStats } from '../../interfaces/chartsInterface';
import {
  addToListComplete,
  getBookListComplete,
  getBookListDNFComplete,
  getBookListREADComplete,
  getBookListTBRComplete,
  getUserDataComplete,
  getUserStatsComplete,
  removeFromListComplete,
} from '../actions/user.actions';

export const userDataFeatureKey = 'User Data Store';

export interface UserDataState {
  users: FirestoreUser[];
  bookList: UsableBooks[];
  TBRList: UsableBooks[];
  DNFList: UsableBooks[];
  READList: UsableBooks[];
  userStats: UserCalcStats;
}

export const initialState: UserDataState = {
  users: [],
  bookList: [],
  TBRList: [],
  DNFList: [],
  READList: [],
  userStats: {} as UserCalcStats,
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
  })),
  on(getBookListTBRComplete, (state, { books }) => ({
    ...state,
    TBRList: books,
  })),
  on(getBookListDNFComplete, (state, { books }) => ({
    ...state,
    DNFList: books,
  })),
  on(getBookListREADComplete, (state, { books }) => ({
    ...state,
    READList: books,
  })),
  on(getUserStatsComplete, (state, { stats }) => ({
    ...state,
    userStats: stats,
  }))
);
