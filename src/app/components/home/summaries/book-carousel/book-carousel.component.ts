import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { UsableBooks } from '../../../../interfaces/booksInterfaces';
import { UserDataState } from '../../../../store/reducers/user.reducer';
import {
  selectGetBookList,
} from '../../../../store/selectors/user.selectors';

@Component({
  selector: 'app-book-carousel',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf, NgFor, KeyValuePipe],
  templateUrl: './book-carousel.component.html',
  styleUrl: './book-carousel.component.scss',
})
export class BookCarouselComponent implements OnInit {
  userStore = inject(Store<UserDataState>);
  bookList$ = this.userStore.select(selectGetBookList);

  ngOnInit() {
    this.bookList$ = this.bookList$.pipe(
      map((bookListObject: UsableBooks[]) => Object.values(bookListObject))
    );
  }
}
