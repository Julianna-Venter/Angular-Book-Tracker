import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { BooksApiService } from '../../services/books-api.service';

@Injectable()
export class UsersEffects {
  //   getBooks$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(getBooksAction.type),
  //       switchMap((action: quereType) =>
  //         this.booksApiService.getBooks(action.query).pipe(
  //           map((givenBooks) => {
  //             const books: UsableBooks[] = givenBooks.map((book) => ({
  //               id: book.id,
  //               title: book.volumeInfo.title,
  //               subtitle: book.volumeInfo.subtitle ?? '',
  //               authors: book.volumeInfo.authors ?? [],
  //               description: book.volumeInfo.description ?? '',
  //               pageCount: book.volumeInfo.pageCount ?? 0,
  //               publishedDate: book.volumeInfo.publishedDate ?? '',
  //               categories: book.volumeInfo.categories ?? [],
  //               imageLink: book.volumeInfo.imageLinks?.thumbnail ?? '',
  //             }));
  //             return getBooksComplete({ books });
  //           }),
  //           retry(2),
  //           catchError((error) => {
  //             console.error('Error fetching books', error);
  //             return EMPTY;
  //           })
  //         )
  //       )
  //     )
  //   );

  constructor(
    private actions$: Actions,
    private booksApiService: BooksApiService
  ) {}
}
