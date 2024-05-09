import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { getBookList } from '../../../store/actions/user.actions';
import { UserDataState } from '../../../store/reducers/user.reducer';
import {
  selectGetBookList,
  selectgetUserData,
} from '../../../store/selectors/user.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  // bookStore = inject(Store<BooksState>);
  userStore = inject(Store<UserDataState>);
  users$ = this.userStore.select(selectgetUserData);
  bookList$ = this.userStore.select(selectGetBookList);
  title = 'Book List';
  listname = 'book-list';

  constructor(private router: Router, private route: ActivatedRoute) {
    if (this.router.url === '/home/book-list/tbr') {
      this.title = 'To Be Read';
      this.listname = 'tbr';
    } else if (this.router.url === '/home/book-list/dnf') {
      this.title = 'Did Not Finish';
      this.listname = 'dnf';
    } else if (this.router.url === '/home/book-list/read') {
      this.title = 'Have Read';
      this.listname = 'read';
    }

    this.users$.subscribe((users) => {
      if (users && users[0].email) {
        this.userStore.dispatch(
          getBookList({ user: users[0], list: this.listname })
        );
      }
    });
  }

  navChild(book: string) {
    this.router.navigate(['book', book], { relativeTo: this.route });
  }
}
