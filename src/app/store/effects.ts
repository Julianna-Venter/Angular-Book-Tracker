import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map, retry } from 'rxjs';
import { BooksApiService } from '../services/books-api.service';
import { getBooksAction, getBooksComplete } from './actions';
Injectable();
export class BooksEffects {
  getBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBooksAction.type),
      exhaustMap((action: any) =>
        this.booksApiService.getBooks(action.query).pipe(
          map((books) => getBooksComplete({ books })),
          retry(2),
          catchError((error) => {
            console.error('Error fetching books', error);
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private booksApiService: BooksApiService
  ) {}
}
