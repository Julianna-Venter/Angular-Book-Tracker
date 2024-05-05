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
import { FirestoreUser } from '../../interfaces/booksInterfaces';
import { AuthService } from '../../services/auth.service';
import { getBooksAction, getUserData } from '../../store/actions';
import { BooksState } from '../../store/books-store/book.reducer';
import { selectBooks } from '../../store/books-store/book.selectors';
import {
  selectLogin,
  selectgetUserData,
} from '../../store/user-store/user.selectors';
import { BackgroundComponent } from '../shared-components/background/background.component';
import { LogOutComponent } from './profile-stats/log-out/log-out.component';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  search = true;

  router = inject(Router);
  currentUserData: FirestoreUser | null = null;
  home = false;
  stats = false;

  store = inject(Store<BooksState>);
  books$ = this.store.select(selectBooks);
  query = 'Harry Potter';
  login$ = this.store.select(selectLogin);
  userData$ = this.store.select(selectgetUserData);

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;

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
    this.userData$.pipe(take(2)).subscribe((users) => {
      if (
        users &&
        users.length > 0 &&
        localStorage.getItem('currentUser') === null
      ) {
        // get the first matched user, since email and password pairs are unique the array will only have one user anyway
        this.currentUserData = users[0];
        // Log for testing, will be removed later
        console.log('User from home effect:', this.currentUserData);
        localStorage.setItem(
          'currentUser',
          JSON.stringify(this.currentUserData)
        );
      }
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
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
}
