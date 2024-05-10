import { createAction, props } from '@ngrx/store';
import { FirestoreUser, UsableBooks } from '../../interfaces/booksInterfaces';
import { UserCalcStats } from '../../interfaces/chartsInterface';

//Application Actions

//get data
export const getUserData = createAction(
  '[User Data] getData',
  props<{ email: string }>()
);

export const getUserDataComplete = createAction(
  '[User Data] getDataComplete',
  props<{ users: FirestoreUser[] }>()
);

export const addToList = createAction(
  '[User Data] addToList',
  props<{ list: string; book: UsableBooks; user: FirestoreUser }>()
);

export const addToListComplete = createAction('[User Data] addToListComplete');

export const removeFromList = createAction(
  '[User Data] removeFromList',
  props<{ list: string; book: UsableBooks; user: FirestoreUser }>()
);

export const removeFromListComplete = createAction(
  '[User Data] removeFromListComplete'
);

export const getBookList = createAction(
  '[User Data] getBookList',
  props<{ user: FirestoreUser; list: string }>()
);

export const getBookListComplete = createAction(
  '[User Data] getBookListComplete',
  props<{ books: UsableBooks[] }>()
);

export const getBookListTBR = createAction(
  '[User Data] getBookListTBR',
  props<{ user: FirestoreUser; list: string }>()
);

export const getBookListTBRComplete = createAction(
  '[User Data] getBookListTBRComplete',
  props<{ books: UsableBooks[] }>()
);

export const getBookListDNF = createAction(
  '[User Data] getBookListDNF',
  props<{ user: FirestoreUser; list: string }>()
);

export const getBookListDNFComplete = createAction(
  '[User Data] getBookListDNFComplete',
  props<{ books: UsableBooks[] }>()
);

export const getBookListREAD = createAction(
  '[User Data] getBookListRead',
  props<{ user: FirestoreUser; list: string }>()
);

export const getBookListREADComplete = createAction(
  '[User Data] getBookListReadComplete',
  props<{ books: UsableBooks[] }>()
);

export const getUserStats = createAction(
  '[User Data] getUserStats',
  props<{ user: FirestoreUser }>()
);

export const getUserStatsComplete = createAction(
  '[User Data] getUserStatsComplete',
  props<{ stats: UserCalcStats }>()
);
