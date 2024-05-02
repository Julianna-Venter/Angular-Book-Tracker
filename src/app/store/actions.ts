import { createAction, props } from '@ngrx/store';
import { UserResponse } from '../interfaces/authInterface';
import { FirestoreUser, UsableBooks } from '../interfaces/booksInterfaces';

export interface SetUserDataError {
  message: string;
}

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
// export const deleteProfile = createAction(
//   '[Profile Page] Delete',
//   props<{ email: string }>()
// );

// export const deleteProfileComplete = createAction(
//   '[Profile Page] DeleteComplete'
// );

//get data
export const getUserData = createAction(
  '[User Data] getData',
  props<{ username: string }>()
);

export const getUserDataComplete = createAction(
  '[User Data] getDataComplete',
  props<{ users: FirestoreUser }>()
);

// export const getUserDataLoading = createAction('[User Data] getDataLoading'); //check how to do this

//set data
export const setUserData = createAction(
  '[User Data] setData',
  props<{ user: UserResponse }>()
);

export const setUserDataSuccess = createAction('[User Data] setDataSuccess');

export const setUserDataFailure = createAction(
  '[User Data] setDataFailure',
  props<{ error: SetUserDataError }>()
);

//delete a book's data
export const deleteUserBookData = createAction(
  '[User Data] deleteBookData',
  props<{ id: string }>()
);

export const deleteUserBookDataSuccess = createAction(
  '[User Data] deleteSuccess'
);

export const deleteUserBookDataFailure = createAction(
  '[User Data] deleteFailure',
  props<{ error: SetUserDataError }>()
);
