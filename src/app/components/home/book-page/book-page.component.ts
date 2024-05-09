import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, take } from 'rxjs';
import { ReviewData, UsableBooks } from '../../../interfaces/booksInterfaces';
import { UsersFirebaseService } from '../../../services/users-firebase.service';
import { getSearchedBook } from '../../../store/actions/book.actions';
import { addToList } from '../../../store/actions/user.actions';
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
export class BookPageComponent implements OnInit {
  router = inject(Router);
  firebaseService = inject(UsersFirebaseService);
  reviewData: ReviewData | undefined;
  bookStore = inject(Store<BooksState>);
  userStore = inject(Store<UserDataState>);
  userData$ = this.userStore.select(selectgetUserData);
  searchedBook$ = this.bookStore.select(selectSearchedBook);
  selected = 'unread';
  bookId = this.router.url.split('/')[5];
  list = this.router.url.split('/')[3];

  changeSelected(event: string) {
    this.selected = event;
  }

  ngOnInit(): void {
    // console.log(this.bookId, this.list);
    // this.searchedBook$.subscribe(console.log);
    combineLatest([this.userData$, this.searchedBook$])
      .pipe(take(1))
      .subscribe(([users, book]) => {
        if (
          users &&
          book &&
          users[0] !== undefined &&
          this.list !== undefined &&
          this.bookId !== undefined &&
          users[0].id !== undefined
        ) {
          this.bookStore.dispatch(
            getSearchedBook({
              bookId: this.bookId,
              user: users[0],
              list: this.list,
            })
          );
        }
      });
    this.searchedBook$.subscribe((book) => {
      this.selected = book?.status || 'unread';
    });
  }

  setSelectedBook(event: string, reviewData?: ReviewData) {
    // this.userData$.subscribe(console.log);
    // this.searchedBook$.subscribe(console.log);
    combineLatest([this.userData$, this.searchedBook$])
      .pipe(take(2))
      .subscribe(([users, book]) => {
        // console.log(users[0].id, book?.id);
        //get the results form the two observables
        // if (
        //   users &&
        //   users.length > 0 &&
        //   users[0] &&
        //   users[0].id !== undefined &&
        //   book &&
        //   book.id !== undefined
        // ) {
        //   this.userStore.dispatch(
        //     removeFromList({
        //       list: book.status,
        //       bookId: book.id,
        //       userId: users[0].id,
        //     })
        //   ); //remove it from the list it is moving from
        // } else {
        //   console.error('Error fetching books or users.');
        // }
        // console.log(event, book?.status);
        const newBook = {
          ...book,
        };
        //get the results form the two observables
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
            this.userStore.dispatch(
              addToList({
                list: event,
                book: newBook as UsableBooks,
                user: users[0],
              }) //add the book with the updated data to the new list in the db
            );
          }
        }
      });
  }

  sendReviewData(event: ReviewData) {
    this.reviewData = event;
    this.setSelectedBook(this.reviewData?.status || 'unread', this.reviewData);
  }
}
