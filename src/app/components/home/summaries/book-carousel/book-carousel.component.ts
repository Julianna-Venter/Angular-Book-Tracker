import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserDataState } from '../../../../store/reducers/user.reducer';
import {
  selectGetBookList,
  selectgetUserData,
} from '../../../../store/selectors/user.selectors';
import { map } from 'rxjs';

@Component({
  selector: 'app-book-carousel',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf, NgFor, KeyValuePipe],
  templateUrl: './book-carousel.component.html',
  styleUrl: './book-carousel.component.scss',
})
export class BookCarouselComponent implements OnInit {
  userStore = inject(Store<UserDataState>);
  users$ = this.userStore.select(selectgetUserData);
  bookList$ = this.userStore.select(selectGetBookList);

  constructor() {
    this.bookList$.subscribe((books) =>
      console.log('carousel: ', typeof books)
    );

    this.users$.subscribe((users) => {
      console.log('carousel: ', typeof users);
    });
  }

  ngOnInit() {
    this.bookList$ = this.bookList$.pipe(
      map((bookListObject: any) => Object.values(bookListObject))
    );
  }
}
