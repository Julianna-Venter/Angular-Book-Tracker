import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroChartPie,
  heroChevronDoubleLeft,
  heroHome,
  heroMagnifyingGlass,
  heroPlus,
} from '@ng-icons/heroicons/outline';
import { heroChartPieSolid, heroHomeSolid } from '@ng-icons/heroicons/solid';
import { Subscription, of, switchMap } from 'rxjs';
import { FirestoreUser } from '../../interfaces/booksInterfaces';
import { AuthService } from '../../services/auth.service';
import { UsersFirebaseService } from '../../services/users-firebase.service';
import { LogOutComponent } from './profile-stats/log-out/log-out.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIconComponent, RouterOutlet, LogOutComponent],
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
  currentUserData: FirestoreUser | null = null;

  constructor(private authService: AuthService) {}

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
          console.log('user from home: ', this.currentUserData);
          // Handle user data here
        }
      });
  }

  ngOnDestroy() {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }
}
