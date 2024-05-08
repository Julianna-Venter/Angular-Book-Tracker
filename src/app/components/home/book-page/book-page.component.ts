import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { ReviewData, UsableBooks } from '../../../interfaces/booksInterfaces';
import { UsersFirebaseService } from '../../../services/users-firebase.service';
import { BooksState } from '../../../store/reducers/book.reducer';
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
  ],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.scss',
})
export class BookPageComponent {
  thisBook: UsableBooks | undefined;
  selected = 'unread';
  reviewData: ReviewData | undefined;
  store = inject(Store<BooksState>);
  userData$ = this.store.select(selectgetUserData);
  firebaseService = inject(UsersFirebaseService);

  changeSelected(event: string) {
    this.selected = event;
  }

  setSelectedBook(event: string) {
    if (!this.thisBook) {
      return;
    }

    this.thisBook.status = event;
    this.updateLocal();

    // if (event === 'unread') {
    //   this.firebaseService.removeFromList(
    //     'read',
    //     this.thisBook.id,
    //     'QMG6aEOytQCc23i8c83P'
    //   );
    // }
  }

  updateLocal() {
    localStorage.setItem('currentBook', JSON.stringify(this.thisBook));
    // console.log(this.userData);
    // this.store.dispatch(setUserData({ user: this.userData }));
  }

  updateBookinUser() {
    const listname = this.thisBook?.status;

    this.updateLocal();
  }

  constructor() {
    const bookString = localStorage.getItem('currentBook');
    if (bookString !== null) {
      this.thisBook = JSON.parse(bookString);
      if (this.thisBook) {
        this.firebaseService.removeFromList(
          'read',
          this.thisBook.id,
          'QMG6aEOytQCc23i8c83P'
        );
      }
    } else {
      console.log('No book found in localStorage.');
    }
    this.selected = this.thisBook?.status || 'unread';
    // console.log(typeof this.userData.booklist.read);
  }

  sendReviewData(event: ReviewData | undefined) {
    this.reviewData = event;

    if (this.reviewData && this.thisBook) {
      this.thisBook.rating = this.reviewData.rating;
      this.thisBook.pace = this.reviewData.pace;
      this.thisBook.status = this.reviewData.status;
      this.thisBook.character_plot = this.reviewData.character_plot;
      this.thisBook.tense_lighthearted = this.reviewData.tense_lighthearted;
      this.thisBook.dark_light = this.reviewData.dark_light;
      this.thisBook.informative_fun = this.reviewData.informative_fun;
      this.thisBook.adventurous_grounded = this.reviewData.adventurous_grounded;
      this.thisBook.reflective_action = this.reviewData.reflective_action;
      this.thisBook.comments = this.reviewData.comments;
      this.thisBook.lastUpdated = this.reviewData.lastUpdated;
      if (this.reviewData.DNF_reason !== undefined) {
        this.thisBook.DNF_reason = this.reviewData.DNF_reason;
      }
    }

    console.log(this.thisBook);

    this.updateBookinUser();
    this.userData$.pipe(take(2)).subscribe((users) => {
      if (users && this.thisBook) {
        // get the first matched user, since email and password pairs are unique the array will only have one user anyway
        // this.currentUserData = users[0];
        this.firebaseService.addToList(this.selected, this.thisBook, users[0]);
      }
    });

    // if (this.thisBook) {
    //   this.firebaseService
    //     .getBook('testing@hash.com', 'read', this.thisBook)
    //     .pipe(take(2))
    //     .subscribe((book) => {
    //       console.log('here you go read:', book);
    //     });
    //   this.firebaseService
    //     .getBook('testing@hash.com', 'reading', this.thisBook)
    //     .pipe(take(2))
    //     .subscribe((book) => {
    //       console.log('here you go reading:', book);
    //     });
    //   this.firebaseService
    //     .getBook('testing@hash.com', 'tbr', this.thisBook)
    //     .pipe(take(2))
    //     .subscribe((book) => {
    //       console.log('here you go tbr:', book);
    //     });
    //   this.firebaseService
    //     .getBook('testing@hash.com', 'dnf', this.thisBook)
    //     .pipe(take(2))
    //     .subscribe((book) => {
    //       console.log('here you go dnf:', book);
    //     });
    // }
  }
}
