import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, of, switchMap } from 'rxjs';
import { UserResponse } from '../../interfaces/authInterface';
import { FirestoreUser } from '../../interfaces/booksInterfaces';
import { AuthService } from '../../services/auth.service';
import { UsersFirebaseService } from '../../services/users-firebase.service';
import {
  SetUserDataError,
  deleteUserBookData,
  deleteUserBookDataFailure,
  deleteUserBookDataSuccess,
  getUserData,
  getUserDataComplete,
  login,
  loginComplete,
  loginFailed,
  setUserData,
  setUserDataFailure,
  setUserDataSuccess,
  signUp,
  signUpComplete,
} from '../actions';

interface loginType {
  email: string;
  password: string;
}

interface signUpType {
  email: string;
  username: string;
  password: string;
}

@Injectable()
export class UsersEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login.type),
      switchMap((action: loginType) =>
        this.firestoreService.login(action.email, action.password).pipe(
          map(({ username, email }) => loginComplete({ username, email })),
          catchError((error) => {
            console.error('Error logging in:', error);
            return of(
              loginFailed({
                errorMessage:
                  "This email and password combination doesn't exist. Please try again.",
              })
            );
          })
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp.type),
      switchMap((action: signUpType) =>
        this.firestoreService
          .register(action.email, action.username, action.password)
          .pipe(
            map(({ username, email }) => signUpComplete({ username, email })),
            catchError((error) => {
              console.error('Error logging in:', error);
              return EMPTY;
            })
          )
      )
    )
  );

  // deleteProfile$ = createEffect(() =>

  getUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserData.type),
      switchMap((action: { email: string }) =>
        this.databaseService.getUser(action.email).pipe(
          map((users: FirestoreUser[]) => {
            return getUserDataComplete({ users: users });
          }),
          catchError((error) => {
            console.error('Error getting user data:', error);
            return EMPTY;
          })
        )
      )
    )
  );

  //remember to actually implement these in the service
  setUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setUserData.type),
      switchMap((action: { user: UserResponse }) =>
        this.databaseService.setUserData(action.user).pipe(
          map(() => setUserDataSuccess()),
          catchError((error: SetUserDataError) => {
            console.error('Error setting user data:', error);
            return of(setUserDataFailure({ error }));
          })
        )
      )
    )
  );

  deleteUserBookData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserBookData.type),
      switchMap((action: { bookId: string }) =>
        this.databaseService.deleteUserBookData(action.bookId).pipe(
          map(() => deleteUserBookDataSuccess()),
          catchError((error: SetUserDataError) => {
            console.error('Error setting user data:', error);
            return of(deleteUserBookDataFailure({ error }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private firestoreService: AuthService,
    private databaseService: UsersFirebaseService
  ) {}
}
