import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { getBookList } from '../../../../store/actions/user.actions';
import { UserDataState } from '../../../../store/reducers/user.reducer';
import {
  selectGetBookList,
  selectgetUserData,
} from '../../../../store/selectors/user.selectors';

@Component({
  selector: 'app-book-album',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './book-album.component.html',
  styleUrl: './book-album.component.scss',
})
export class BookAlbumComponent implements OnInit {
  @Input() listname = '';
  userStore = inject(Store<UserDataState>);
  users$ = this.userStore.select(selectgetUserData);
  bookList$ = this.userStore.select(selectGetBookList);
  listTitle: string = '';

  navigateTo(route: string) {
    console.log('Navigating to', route);
  }

  constructor() {}

  ngOnInit(): void {
    console.log('BookAlbumComponent created:', this.listname);

    if (this.listname === 'tbr') {
      this.listTitle = 'To Be Read';
    } else if (this.listname === 'dnf') {
      this.listTitle = 'Did Not Finish';
    } else if (this.listname === 'read') {
      this.listTitle = 'Have Read';
    }

    this.users$.subscribe((users) => {
      if (users && users[0] !== undefined && users[0].email) {
        this.userStore.dispatch(getBookList({ user: users[0], list: 'tbr' }));
      }
    });
  }
}
