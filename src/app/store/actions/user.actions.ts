import { createAction, props } from '@ngrx/store';
import { UserResponse } from '../../interfaces/authInterface';
import { FirestoreUser, UsableBooks } from '../../interfaces/booksInterfaces';

export interface SetUserDataError {
  message: string;
}

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

//for later use
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
