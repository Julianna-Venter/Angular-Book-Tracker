import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { getBookListDNF } from '../../../../store/actions/user.actions';
import { UserDataState } from '../../../../store/reducers/user.reducer';
import {
  selectGetDNFList,
  selectgetUserData,
} from '../../../../store/selectors/user.selectors';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-dnf-album',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './dnf-album.component.html',
  styleUrl: './dnf-album.component.scss',
})
export class DnfAlbumComponent implements OnInit {
  listname = 'dnf';
  userStore = inject(Store<UserDataState>);
  users$ = this.userStore.select(selectgetUserData);
  bookList$ = this.userStore.select(selectGetDNFList);
  listTitle: string = 'Did Not Finish';

  navigateTo(route: string) {
    console.log('Navigating to', route);
  }

  constructor() {}

  ngOnInit(): void {
    this.users$.pipe(take(2)).subscribe((users) => {
      if (users && users[0] !== undefined && users[0].email) {
        this.userStore.dispatch(
          getBookListDNF({ user: users[0], list: 'dnf' })
        );
      }
    });
  }
}
