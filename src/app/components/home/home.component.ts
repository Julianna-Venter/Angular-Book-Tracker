import { AsyncPipe, JsonPipe, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroChartPie,
  heroChevronDoubleLeft,
  heroHome,
  heroMagnifyingGlass,
  heroPlus,
  heroXCircle,
} from '@ng-icons/heroicons/outline';
import {
  heroChartPieSolid,
  heroEllipsisVerticalSolid,
  heroHomeSolid,
} from '@ng-icons/heroicons/solid';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { FirestoreUser, UsableBooks } from '../../interfaces/booksInterfaces';
import { AuthService } from '../../services/auth.service';
import { getBooksAction } from '../../store/actions/book.actions';
import { getUserData } from '../../store/actions/user.actions';
import { BooksState } from '../../store/reducers/book.reducer';
import { selectBooks } from '../../store/selectors/book.selectors';
import { selectgetUserData } from '../../store/selectors/user.selectors';
import { BackgroundComponent } from '../shared-components/background/background.component';
import { LogOutComponent } from './profile-stats/log-out/log-out.component';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface Book {
  id: string;
  title: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIconComponent,
    RouterOutlet,
    LogOutComponent,
    AsyncPipe,
    JsonPipe,
    RouterLink,
    BackgroundComponent,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  viewProviders: [
    provideIcons({
      heroHomeSolid,
      heroHome,
      heroPlus,
      heroChartPieSolid,
      heroChartPie,
      heroMagnifyingGlass,
      heroChevronDoubleLeft,
      heroEllipsisVerticalSolid,
      heroXCircle,
    }),
  ],
})
export class HomeComponent implements OnInit {
  homeIcon = 'heroHome';
  pieIcon = 'heroChartPie';
  search = false;

  router = inject(Router);
  currentUserData: FirestoreUser | null = null;
  home = false;
  stats = false;

  store = inject(Store<BooksState>);
  books$ = this.store.select(selectBooks);
  query = 'Harry Potter';
  userData$ = this.store.select(selectgetUserData);

  options: string[] = [];
  filteredOptions: Observable<Book[]> | undefined;
  searchCorrelation: Book[] = [];
  searchedBooks: UsableBooks[] = [];

  searchForm = new FormGroup({
    searchTerm: new FormControl<Book>({ id: '', title: '' }),
  });

  constructor(private authService: AuthService, private location: Location) {
    if (this.router.url === '/home') {
      this.home = true;
      this.stats = false;
    } else if (this.router.url === '/home/profile') {
      this.home = false;
      this.stats = true;
    } else {
      this.home = false;
      this.stats = false;
    }

    this.store.dispatch(getBooksAction({ query: this.query }));

    authService.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.store.dispatch(getUserData({ email: user.email ?? '' }));
      }
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser') === null) {
      this.userData$.subscribe((users) => {
        if (users && users.length > 0) {
          // get the first matched user, since email and password pairs are unique the array will only have one user anyway
          this.currentUserData = users[0];
          // Log for testing, will be removed later
          console.log('User from home:', this.currentUserData);
          localStorage.setItem(
            'currentUser',
            JSON.stringify(this.currentUserData)
          );
        }
      });
    } else {
      console.log(localStorage.getItem('currentUser'));
    }

    console.log('User from home outside:', this.currentUserData);

    this.filteredOptions =
      this.searchForm.controls.searchTerm.valueChanges.pipe(
        startWith(''),
        map((value) => {
          if (typeof value === 'string') {
            return value;
          } else {
            return value?.title;
          }
        }),
        map((value) => this._filter(value || ''))
      );
  }

  private _filter(value: string): Book[] {
    if (typeof value !== 'string') {
      return [];
    }

    const filterValue = value.toLowerCase();

    if (filterValue !== '' && !this.options.includes(filterValue)) {
      this.store.dispatch(getBooksAction({ query: filterValue }));
      this.books$
        .pipe(debounceTime(150), distinctUntilChanged())
        .subscribe((books) => {
          this.options = books.map((book) => book.title);
          this.searchCorrelation = books.map((book) => {
            return { id: book.id, title: book.title };
          });
          this.searchedBooks = books;
        });
    }

    return this.searchCorrelation.filter((book) =>
      book.title.toLowerCase().includes(filterValue)
    );
  }

  changeActive(click: string) {
    if (click === 'home') {
      this.home = true;
      this.stats = false;
    } else if (click === 'stats') {
      this.home = false;
      this.stats = true;
    }
  }

  back(): void {
    this.location.back();
  }

  toggleSearch() {
    this.search = !this.search;
  }

  searchBooks() {
    const rawForm = this.searchForm.getRawValue();

    if (this.options.includes(rawForm.searchTerm?.title ?? '')) {
      console.log('searching...', rawForm.searchTerm);
      this.books$.pipe(take(1)).subscribe((books) => {
        const book = books.find(
          (book) => book.title === rawForm.searchTerm?.title
        );
        localStorage.setItem('currentBook', JSON.stringify(book));
        this.search = false;
        this.router.navigate(['home/book/' + book?.title]);
      });
    }
  }

  displayBookTitle(book: Book): string {
    return book ? book.title : '';
  }
}
