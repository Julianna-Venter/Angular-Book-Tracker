import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, of, switchMap } from 'rxjs';
import {
  BookList,
  FirestoreUser,
  UsableBooks,
} from '../../interfaces/booksInterfaces';
import { AuthService } from '../../services/auth.service';
import { UsersFirebaseService } from '../../services/users-firebase.service';
import { setSearchedBook } from '../actions/book.actions';
import {
  addToList,
  getMatchedBook,
  getUserData,
  getUserDataComplete,
  removeFromList,
  removeFromListComplete,
} from '../actions/user.actions';

@Injectable()
export class UsersEffects {
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

  addToList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToList.type),
      switchMap(
        (action: { list: string; book: UsableBooks; user: FirestoreUser }) => {
          this.databaseService.addToList(action.list, action.book, action.user);

          return of(
            getUserData({ email: action.user.email }),
            setSearchedBook({ searchedBook: action.book })
          );
        }
      )
    )
  );

  removeFromList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFromList.type),
      switchMap(
        async (action: {
          list: string;
          book: UsableBooks;
          user: FirestoreUser;
        }) => {
          console.log('Removing from list: ', action.list);
          await this.databaseService.removeFromList(
            action.list,
            action.book.id,
            action.user.id
          );
          return removeFromListComplete();
        }
      )
    )
  );

  getMatchedBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMatchedBook.type),
      switchMap((action: { userEmail: string; list: string; bookId: string }) =>
        this.databaseService
          .getMatchedBook(
            action.userEmail,
            action.list as keyof BookList,
            action.bookId
          )
          .pipe(
            map((matchedBook: UsableBooks) => {
              return setSearchedBook({ searchedBook: matchedBook });
            }),
            catchError((error) => {
              console.error('Error getting user data:', error);
              return EMPTY;
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
