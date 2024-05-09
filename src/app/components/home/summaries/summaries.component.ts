import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { UsableBooks } from '../../../interfaces/booksInterfaces';
import { getBookList } from '../../../store/actions/user.actions';
import { UserDataState } from '../../../store/reducers/user.reducer';
import {
  selectGetBookList,
  selectgetUserData,
} from '../../../store/selectors/user.selectors';
import { SpotlightComponent } from '../../shared-components/spotlight/spotlight.component';
import { BookCarouselComponent } from './book-carousel/book-carousel.component';
import { DnfAlbumComponent } from './dnf-album/dnf-album.component';
import { ReadAlbumComponent } from './read-album/read-album.component';
import { TbrAlbumComponent } from './tbr-album/tbr-album.component';

@Component({
  selector: 'app-summaries',
  standalone: true,
  imports: [
    RouterLink,
    NgIconComponent,
    BookCarouselComponent,
    TbrAlbumComponent,
    SpotlightComponent,
    DnfAlbumComponent,
    ReadAlbumComponent,
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

    this.bookList$ = this.bookList$.pipe(
      map((bookListObject: UsableBooks[]) => Object.values(bookListObject))
    );
  }
}
