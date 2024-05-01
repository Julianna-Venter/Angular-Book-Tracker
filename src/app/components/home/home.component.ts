import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
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
import { Subscription, of, switchMap } from 'rxjs';
import { FirestoreUser } from '../../interfaces/booksInterfaces';
import { AuthService } from '../../services/auth.service';
import { UsersFirebaseService } from '../../services/users-firebase.service';
import { getBooksAction } from '../../store/actions';
import { BooksState } from '../../store/reducer';
import { selectBooks } from '../../store/selectors';
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
export class HomeComponent implements OnInit, OnDestroy {
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

  constructor(private authService: AuthService) {
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

    // console.log('books$');
    // this.books$.subscribe(console.log);
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

  ngOnInit() {
    this.currentUserSubscription = this.authService.isUserSet$
      .pipe(
        switchMap((userSet) => {
          if (userSet) {
            const searchName = this.authService.currentUserSig()?.email;
            return this.usersFirebaseService.getUser(searchName ?? '');
          } else {
            // Return an observable that emits nothing if userSet is false
            return of(null);
          }
        })
      )
      .subscribe((user) => {
        if (user) {
          this.currentUserData = user[0];
          //will remove this later, this is just for testing
          // console.log('user from home: ', this.currentUserData);
        }
      });
  }

  ngOnDestroy() {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }
}
