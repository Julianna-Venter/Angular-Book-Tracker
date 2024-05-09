import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, of, switchMap } from 'rxjs';
import {
  BookList,
  FirestoreUser,
  UsableBooks,
} from '../../interfaces/booksInterfaces';
import { UserCalcStats } from '../../interfaces/chartsInterface';
import { AuthService } from '../../services/auth.service';
import { UsersFirebaseService } from '../../services/users-firebase.service';
import { UsersStatsService } from '../../services/users-stats.service';
import { setSearchedBook } from '../actions/book.actions';
import {
  addToList,
  getBookList,
  getBookListComplete,
  getBookListDNF,
  getBookListDNFComplete,
  getBookListREAD,
  getBookListREADComplete,
  getBookListTBR,
  getBookListTBRComplete,
  getUserData,
  getUserDataComplete,
  getUserStats,
  getUserStatsComplete,
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

  getBookList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBookList.type),
      switchMap((action: { user: FirestoreUser; list: string }) =>
        this.databaseService
          .getBookList(action.user, action.list as keyof BookList)
          .pipe(
            map((books: UsableBooks[]) => {
              return getBookListComplete({ books });
            }),
            catchError((error) => {
              console.error('Error getting user data:', error);
              return EMPTY;
            })
          )
      )
    )
  );

  getBookListTBR$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBookListTBR.type),
      switchMap((action: { user: FirestoreUser; list: string }) =>
        this.databaseService
          .getBookList(action.user, action.list as keyof BookList)
          .pipe(
            map((books: UsableBooks[]) => {
              return getBookListTBRComplete({ books });
            }),
            catchError((error) => {
              console.error('Error getting user data:', error);
              return EMPTY;
            })
          )
      )
    )
  );

  getBookListDNF$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBookListDNF.type),
      switchMap((action: { user: FirestoreUser; list: string }) =>
        this.databaseService
          .getBookList(action.user, action.list as keyof BookList)
          .pipe(
            map((books: UsableBooks[]) => {
              return getBookListDNFComplete({ books });
            }),
            catchError((error) => {
              console.error('Error getting user data:', error);
              return EMPTY;
            })
          )
      )
    )
  );

  getBookListREAD$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBookListREAD.type),
      switchMap((action: { user: FirestoreUser; list: string }) =>
        this.databaseService
          .getBookList(action.user, action.list as keyof BookList)
          .pipe(
            map((books: UsableBooks[]) => {
              return getBookListREADComplete({ books });
            }),
            catchError((error) => {
              console.error('Error getting user data:', error);
              return EMPTY;
            })
          )
      )
    )
  );

  getUserStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserStats.type),
      switchMap((action: { user: FirestoreUser }) =>
        this.statsService.calculateStats(action.user).pipe(
          map((stats: UserCalcStats) => {
            return getUserStatsComplete({ stats });
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
    private databaseService: UsersFirebaseService,
    private statsService: UsersStatsService
  ) {}
}
