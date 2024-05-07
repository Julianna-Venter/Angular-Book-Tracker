import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, switchMap } from 'rxjs';
import { FirestoreUser } from '../../interfaces/booksInterfaces';
import { AuthService } from '../../services/auth.service';
import { UsersFirebaseService } from '../../services/users-firebase.service';
import { getUserData, getUserDataComplete } from '../actions/user.actions';

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
  //for later use
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
  // setUserData$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(setUserData.type),
  //     switchMap((action: { user: UserResponse }) =>
  //       from(this.databaseService.setUserData(action.user)).pipe(
  //         map(() => setUserDataSuccess()),
  //         catchError((error: SetUserDataError) => {
  //           console.error('Error setting user data:', error);
  //           return EMPTY;
  //         })
  //       )
  //     )
  //   )
  // );

  // deleteUserBookData$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(deleteUserBookData.type),
  //     switchMap((action: { bookId: string }) =>
  //       this.databaseService.deleteUserBookData(action.bookId).pipe(
  //         map(() => deleteUserBookDataSuccess()),
  //         catchError((error: SetUserDataError) => {
  //           console.error('Error setting user data:', error);
  //           return of(deleteUserBookDataFailure({ error }));
  //         })
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private firestoreService: AuthService,
    private databaseService: UsersFirebaseService
  ) {}
}
