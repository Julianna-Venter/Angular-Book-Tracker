import { AsyncPipe, JsonPipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroChartPie,
  heroChevronDoubleLeft,
  heroHome,
  heroMagnifyingGlass,
  heroPlus,
} from '@ng-icons/heroicons/outline';
import { heroChartPieSolid, heroHomeSolid } from '@ng-icons/heroicons/solid';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { FirestoreUser } from '../../interfaces/booksInterfaces';
import { AuthService } from '../../services/auth.service';
import { UsersFirebaseService } from '../../services/users-firebase.service';
import { getBooksAction, getUserData } from '../../store/actions';
import { BooksState } from '../../store/books-store/book.reducer';
import { selectBooks } from '../../store/books-store/book.selectors';
import {
  selectLogin,
  selectgetUserData,
} from '../../store/user-store/user.selectors';
import { LogOutComponent } from './profile-stats/log-out/log-out.component';

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
    }),
  ],
})
export class HomeComponent {
  homeIcon = 'heroHome';
  pieIcon = 'heroChartPie';

  currentUserSubscription: Subscription | undefined;
  usersFirebaseService = inject(UsersFirebaseService);
  router = inject(Router);
  currentUserData: FirestoreUser | null = null;
  home = false;
  stats = false;

  store = inject(Store<BooksState>);
  books$ = this.store.select(selectBooks);
  query = 'Harry Potter';
  login$ = this.store.select(selectLogin);
  userData$ = this.store.select(selectgetUserData);

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

    this.userData$.pipe(take(2)).subscribe((users) => {
      if (users && users.length > 0) {
        // Assign the first user to currentUserData
        this.currentUserData = users[0];
        // Log for testing
        console.log('User from home effect:', this.currentUserData);
      } else {
        // Handle case where users array is empty or undefined
        console.error('No user data received or user array is empty.');
      }
    });
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
}
