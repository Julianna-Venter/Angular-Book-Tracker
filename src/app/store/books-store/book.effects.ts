import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, retry, switchMap } from 'rxjs';
import { UsableBooks } from '../../interfaces/booksInterfaces';
import { BooksApiService } from '../../services/books-api.service';
import { getBooksAction, getBooksComplete } from '../actions';

interface queryType {
  query: string;
  type: string;
}

@Injectable()
export class BooksEffects {
  getBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBooksAction.type),
      switchMap((action: queryType) =>
        this.booksApiService.getBooks(action.query).pipe(
          map((givenBooks) => {
            const books: UsableBooks[] = givenBooks.map((book) => ({
              id: book.id,
              title: book.volumeInfo.title,
              subtitle: book.volumeInfo.subtitle ?? '',
              authors: book.volumeInfo.authors ?? [],
              description: book.volumeInfo.description ?? '',
              pageCount: book.volumeInfo.pageCount ?? 0,
              publishedDate: book.volumeInfo.publishedDate ?? '',
              categories: book.volumeInfo.categories ?? [],
              imageLink: book.volumeInfo.imageLinks?.thumbnail ?? '',
            }));
            return getBooksComplete({ books });
          }),
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
