import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBookListTBR } from '../../../../store/actions/user.actions';
import { UserDataState } from '../../../../store/reducers/user.reducer';
import {
  selectGetTBRList,
  selectgetUserData,
} from '../../../../store/selectors/user.selectors';
import { AsyncPipe } from '@angular/common';
import { take } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tbr-album',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './tbr-album.component.html',
  styleUrl: './tbr-album.component.scss',
})
export class TbrAlbumComponent implements OnInit {
  listname = 'tbr';
  userStore = inject(Store<UserDataState>);
  users$ = this.userStore.select(selectgetUserData);
  bookList$ = this.userStore.select(selectGetTBRList);
  listTitle: string = 'To Be Read';

  navigateTo(route: string) {
    console.log('Navigating to', route);
  }

  constructor() {}

  ngOnInit(): void {
    this.users$.pipe(take(2)).subscribe((users) => {
      if (users && users[0] !== undefined && users[0].email) {
        this.userStore.dispatch(
          getBookListTBR({ user: users[0], list: 'tbr' })
        );
      }
    });
  }
}
