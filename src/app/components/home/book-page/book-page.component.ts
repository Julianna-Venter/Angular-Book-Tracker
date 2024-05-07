import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { UserResponse } from '../../../interfaces/authInterface';
import { ReviewData, UsableBooks } from '../../../interfaces/booksInterfaces';
import { BooksState } from '../../../store/books-store/book.reducer';
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
  userData: UserResponse = JSON.parse(
    localStorage.getItem('currentUser') || '{}'
  );
  store = inject(Store<BooksState>);

  changeSelected(event: string) {
    this.selected = event;
  }

  setSelectedBook(event: string) {
    if (!this.thisBook) {
      return;
    }
    this.removeBook();
    this.addBook(event);
    this.thisBook.status = event;
    this.updateLocal();

    console.log(this.userData);
  }

  updateLocal() {
    localStorage.setItem('currentBook', JSON.stringify(this.thisBook));
    localStorage.setItem('currentUser', JSON.stringify(this.userData));
    console.log(this.userData);
    // this.store.dispatch(setUserData({ user: this.userData }));
  }

  updateBookinUser() {
    const listname = this.thisBook?.status;

    this.removeBook();
    this.addBook(listname!);
    this.updateLocal();
  }

  addBook(event: string) {
    if (!this.thisBook) {
      return;
    }

    switch (event) {
      case 'read':
        if (!this.userData.booklist.read.includes(this.thisBook)) {
          this.userData.booklist.read.push(this.thisBook);
        }
        break;
      case 'tbr':
        if (!this.userData.booklist.tbr.includes(this.thisBook)) {
          this.userData.booklist.tbr.push(this.thisBook);
        }
        break;
      case 'reading':
        if (!this.userData.booklist.current.includes(this.thisBook)) {
          this.userData.booklist.current.push(this.thisBook);
        }
        break;
      case 'dnf':
        if (!this.userData.booklist.dnf.includes(this.thisBook)) {
          this.userData.booklist.dnf.push(this.thisBook);
        }
        break;
    }
  }

  removeBook() {
    if (this.thisBook !== undefined) {
      const bookToRemove = this.thisBook;

      const readIndex = this.userData.booklist.read.indexOf(bookToRemove);
      if (readIndex !== -1) {
        this.userData.booklist.read.splice(readIndex, 1);
      }

      const tbrIndex = this.userData.booklist.tbr.indexOf(bookToRemove);
      if (tbrIndex !== -1) {
        this.userData.booklist.tbr.splice(tbrIndex, 1);
      }

      const currentIndex = this.userData.booklist.current.indexOf(bookToRemove);
      if (currentIndex !== -1) {
        this.userData.booklist.current.splice(currentIndex, 1);
      }

      const dnfIndex = this.userData.booklist.dnf.indexOf(bookToRemove);
      if (dnfIndex !== -1) {
        this.userData.booklist.dnf.splice(dnfIndex, 1);
      }
    }
  }

  constructor() {
    const bookString = localStorage.getItem('currentBook');
    if (bookString !== null) {
      this.thisBook = JSON.parse(bookString);
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
      this.thisBook.owned = this.reviewData.owned;
      if (this.reviewData.DNF_reason !== undefined) {
        this.thisBook.DNF_reason = this.reviewData.DNF_reason;
      }
    }

    this.updateBookinUser();
  }
}
