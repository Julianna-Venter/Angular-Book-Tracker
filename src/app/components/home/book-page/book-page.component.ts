import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest, take } from 'rxjs';
import { ReviewData, UsableBooks } from '../../../interfaces/booksInterfaces';
import { getSearchedBook } from '../../../store/actions/book.actions';
import { addToList, removeFromList } from '../../../store/actions/user.actions';
import { BooksState } from '../../../store/reducers/book.reducer';
import { UserDataState } from '../../../store/reducers/user.reducer';
import { selectSearchedBook } from '../../../store/selectors/book.selectors';
import { selectgetUserData } from '../../../store/selectors/user.selectors';
import { HaveReadComponent } from './have-read/have-read.component';
import { ReadingComponent } from './reading/reading.component';
import { TbrComponent } from './tbr/tbr.component';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReadingComponent,
    TbrComponent,
    HaveReadComponent,
    JsonPipe,
    AsyncPipe,
  ],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.scss',
})
export class BookPageComponent implements OnInit, OnDestroy {
  router = inject(Router);
  reviewData: ReviewData | undefined;
  bookStore = inject(Store<BooksState>);
  userStore = inject(Store<UserDataState>);
  userData$ = this.userStore.select(selectgetUserData);
  searchedBook$ = this.bookStore.select(selectSearchedBook);
  selected = 'unread';
  bookId = localStorage.getItem('bookId') || '';
  list = localStorage.getItem('list') || 'unread';
  selectedBookSubscriptions: Subscription | undefined;

  changeSelected(event: string) {
    this.selected = event;
    this.setSelectedBook(event);
  }

  ngOnInit(): void {
    if (this.list !== 'unread') {
      this.selectedBookSubscriptions = combineLatest([
        this.userData$,
        this.searchedBook$,
      ]).subscribe(([users, book]) => {
        this.bookStore.dispatch(
          getSearchedBook({
            bookId: this.bookId,
            user: users[0],
            list: this.list,
          })
        );
      });
    }

    this.searchedBook$.pipe(take(2)).subscribe((book) => {
      this.selected = book?.status || 'unread';
    });
  }

  setSelectedBook(event: string, reviewData?: ReviewData) {
    this.list = event;
    localStorage.setItem('list', event);
    combineLatest([this.userData$, this.searchedBook$])
      .pipe(take(2))
      .subscribe(([users, book]) => {
        const newBook = {
          ...book,
        };
        if (users && book && users[0] !== undefined) {
          newBook.status = event; //chnage the book's status to the list it is moving to
          if (reviewData) {
            //if a review has been added, update the book with the review data
            newBook.rating = reviewData.rating;
            newBook.pace = reviewData.pace;
            newBook.status = reviewData.status;
            newBook.character_plot = reviewData.character_plot;
            newBook.tense_lighthearted = reviewData.tense_lighthearted;
            newBook.dark_light = reviewData.dark_light;
            newBook.informative_fun = reviewData.informative_fun;
            newBook.adventurous_grounded = reviewData.adventurous_grounded;
            newBook.reflective_action = reviewData.reflective_action;
            newBook.comments = reviewData.comments;
            newBook.lastUpdated = reviewData.lastUpdated;
            if (reviewData.DNF_reason !== undefined) {
              newBook.DNF_reason = reviewData.DNF_reason;
            }
          }
          {
            if (book.status !== 'unread') {
              this.userStore.dispatch(
                removeFromList({
                  list: book.status,
                  book: book,
                  user: users[0],
                })
              );
            }
            if (event !== 'unread') {
              this.userStore.dispatch(
                addToList({
                  list: event,
                  book: newBook as UsableBooks,
                  user: users[0],
                }) //add the book with the updated data to the new list in the db
              );
            }
            this.bookStore.dispatch(
              getSearchedBook({
                bookId: this.bookId,
                user: users[0],
                list: event,
              })
            );
          }
        }
      });
  }

  sendReviewData(event: ReviewData) {
    this.reviewData = event;
    let status = this.reviewData.status;
    if (this.reviewData.status === 'dnf') {
      status = 'read';
    }
    this.setSelectedBook(status || 'unread', this.reviewData);
  }

  ngOnDestroy(): void {
    this.selectedBookSubscriptions?.unsubscribe();
  }
}
