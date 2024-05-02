import { createAction, props } from '@ngrx/store';
import { UserResponse } from '../interfaces/authInterface';
import { UsableBooks } from '../interfaces/booksInterfaces';

//API Actions

export const getBooksAction = createAction(
  '[Books API] GetBooks',
  props<{ query: string }>()
);

export const getBooksComplete = createAction(
  '[Books API] GetBooksComplete',
  props<{ books: UsableBooks[] }>()
);

//Application Actions

//login
export const login = createAction(
  '[Login Page] Login',
  props<{ email: string; password: string }>()
);

export const loginComplete = createAction(
  '[Login Page] LoginComplete',
  props<{ username: string }>()
);

//signup
export const signUp = createAction(
  '[SignUp Page] SignUp',
  props<{ email: string; username: string; password: string }>()
);

export const signUpComplete = createAction(
  '[SignUp Page] SignUpComplete',
  props<{ username: string }>()
);

//delete
export const deleteProfile = createAction(
  '[Profile Page] Delete',
  props<{ email: string }>()
);

export const deleteProfileComplete = createAction(
  '[Profile Page] DeleteComplete'
);

//get data
export const getUserData = createAction(
  '[User Data] getData',
  props<{ username: string }>()
);

export const getUserDataComplete = createAction(
  '[User Data] getDataComplete',
  props<{ user: UserResponse }>()
);

export const getUserDataLoading = createAction('[User Data] getDataLoading'); //check how to do this

//set data
export const setUserData = createAction(
  '[User Data] setData',
  props<{ user: UserResponse }>()
);

export const setUserDataComplete = createAction('[User Data] setDataComplete');

//delete a book's data
export const deleteUserBookData = createAction(
  '[User Data] deleteBookData',
  props<{ user: UsableBooks }>()
);

export const deleteUserBookDataComplete = createAction(
  '[User Data] deleteBookDataComplete'
);
