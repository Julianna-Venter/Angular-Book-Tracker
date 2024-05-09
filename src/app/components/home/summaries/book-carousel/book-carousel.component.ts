import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserDataState } from '../../../../store/reducers/user.reducer';
import { selectGetBookList } from '../../../../store/selectors/user.selectors';

@Component({
  selector: 'app-book-carousel',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  imports: [RouterLink, AsyncPipe],
  templateUrl: './book-carousel.component.html',
  styleUrl: './book-carousel.component.scss',
})
export class BookCarouselComponent {
  userStore = inject(Store<UserDataState>);
  bookList$ = this.userStore.select(selectGetBookList);
}
export class BookCarouselComponent {
  userStore = inject(Store<UserDataState>);
  bookList$ = this.userStore.select(selectGetBookList);

  constructor() {
    this.bookList$.subscribe((books) =>
      console.log('carousel: ', typeof books)
    );
  }
}
