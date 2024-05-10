import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { getBookListREAD } from '../../../../store/actions/user.actions';
import { UserDataState } from '../../../../store/reducers/user.reducer';
import {
  selectGetREADList,
  selectgetUserData,
} from '../../../../store/selectors/user.selectors';
import { RouterLink } from '@angular/router';
import { UsableBooks } from '../../../../interfaces/booksInterfaces';

@Component({
  selector: 'app-read-album',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './read-album.component.html',
  styleUrl: './read-album.component.scss',
})
export class ReadAlbumComponent implements OnInit {
  userStore = inject(Store<UserDataState>);
  users$ = this.userStore.select(selectgetUserData);
  bookList$ = this.userStore.select(selectGetREADList);
  listTitle: string = 'Have Read';

  ngOnInit(): void {
    this.users$.pipe(take(2)).subscribe((users) => {
      if (users && users[0] !== undefined && users[0].email) {
        this.userStore.dispatch(
          getBookListREAD({ user: users[0], list: 'read' })
        );
      }
    });

    this.bookList$ = this.bookList$.pipe(
      map((bookListObject: UsableBooks[]) => Object.values(bookListObject))
    );
  }
}
