import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { getBookList } from '../../../store/actions/user.actions';
import { UserDataState } from '../../../store/reducers/user.reducer';
import {
  selectGetBookList,
  selectgetUserData,
} from '../../../store/selectors/user.selectors';
import { SpotlightComponent } from '../../shared-components/spotlight/spotlight.component';
import { BookAlbumComponent } from './book-album/book-album.component';
import { BookCarouselComponent } from './book-carousel/book-carousel.component';

@Component({
  selector: 'app-summaries',
  standalone: true,
  imports: [
    RouterLink,
    NgIconComponent,
    BookCarouselComponent,
    BookAlbumComponent,
    SpotlightComponent,
    AsyncPipe,
  ],
  templateUrl: './summaries.component.html',
  styleUrl: './summaries.component.scss',
  viewProviders: [provideIcons({ heroChevronDown })],
})
export class SummariesComponent implements OnInit {
  userStore = inject(Store<UserDataState>);
  users$ = this.userStore.select(selectgetUserData);
  bookList$ = this.userStore.select(selectGetBookList);

  ngOnInit(): void {
    this.users$.pipe(take(2)).subscribe((users) => {
      if (users && users[0] !== undefined && users[0].email) {
        this.userStore.dispatch(
          getBookList({ user: users[0], list: 'reading' })
        );
      }
    });
  }
}
