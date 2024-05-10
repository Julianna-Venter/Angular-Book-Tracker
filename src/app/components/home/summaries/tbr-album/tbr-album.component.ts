import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { UsableBooks } from '../../../../interfaces/booksInterfaces';
import { getBookListTBR } from '../../../../store/actions/user.actions';
import { UserDataState } from '../../../../store/reducers/user.reducer';
import {
  selectGetTBRList,
  selectgetUserData,
} from '../../../../store/selectors/user.selectors';

@Component({
  selector: 'app-tbr-album',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './tbr-album.component.html',
  styleUrl: './tbr-album.component.scss',
})
export class TbrAlbumComponent implements OnInit {
  userStore = inject(Store<UserDataState>);
  users$ = this.userStore.select(selectgetUserData);
  bookList$ = this.userStore.select(selectGetTBRList);
  listTitle: string = 'To Be Read';


  ngOnInit(): void {
    this.users$.pipe(take(2)).subscribe((users) => {
      if (users && users[0] !== undefined && users[0].email) {
        this.userStore.dispatch(
          getBookListTBR({ user: users[0], list: 'tbr' })
        );
      }
    });

    this.bookList$ = this.bookList$.pipe(
      map((bookListObject: UsableBooks[]) => Object.values(bookListObject))
    );
  }
}
