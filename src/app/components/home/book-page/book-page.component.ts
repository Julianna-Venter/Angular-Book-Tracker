import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { combineLatest, take } from 'rxjs';
import { ReviewData, UsableBooks } from '../../../interfaces/booksInterfaces';
import { UsersFirebaseService } from '../../../services/users-firebase.service';
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
export class BookPageComponent {
  firebaseService = inject(UsersFirebaseService);
  reviewData: ReviewData | undefined;
  bookStore = inject(Store<BooksState>);
  userStore = inject(Store<UserDataState>);
  userData$ = this.userStore.select(selectgetUserData);
  searchedBook$ = this.bookStore.select(selectSearchedBook);
  selected = 'unread';

  constructor() {
    console.log('BookPageComponent created');
  }

  changeSelected(event: string) {
    this.selected = event;
  }

  setSelectedBook(event: string, reviewData?: ReviewData) {
    combineLatest([this.userData$, this.searchedBook$])
      .pipe(take(1))
      .subscribe(([users, book]) => {
        // console.log(users[0], book?.status);
        //get the results form the two observables
        if (users && book) {
          console.log(event, book.status);
          this.userStore.dispatch(
            removeFromList({
              list: book.status,
              bookId: book.id,
              userId: users[0].id,
            })
          ); //remove it from the list it is moving from
        }

        // console.log(event, book?.status);
        const newBook = {
          ...book,
        };
        //get the results form the two observables
        if (users && book) {
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
