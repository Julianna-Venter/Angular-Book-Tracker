import { Component, OnInit, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroStarSolid } from '@ng-icons/heroicons/solid';
import { ChartsComponent } from './charts/charts.component';

import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { NgApexchartsModule } from 'ng-apexcharts';
import { take } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { getUserData, getUserStats } from '../../../store/actions/user.actions';
import { UserDataState } from '../../../store/reducers/user.reducer';
import {
  selectGetUserStats,
  selectgetUserData,
} from '../../../store/selectors/user.selectors';

@Component({
  selector: 'app-profile-stats',
  standalone: true,
  imports: [NgIconComponent, ChartsComponent, NgApexchartsModule, AsyncPipe],
  templateUrl: './profile-stats.component.html',
  styleUrl: './profile-stats.component.scss',
  viewProviders: [provideIcons({ heroStarSolid })],
})
export class ProfileStatsComponent implements OnInit {
  userStore = inject(Store<UserDataState>);
  user$ = this.userStore.select(selectgetUserData);
  userStats$ = this.userStore.select(selectGetUserStats);
  username = '';
  pacePercentages: string[] = [];
  lengthPercentages: string[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.userStore.dispatch(getUserData({ email: user.email ?? '' }));
      }
    });

    this.user$.subscribe((user) => {
      if (user && user[0] !== undefined) {
        this.userStore.dispatch(getUserStats({ user: user[0] }));
        this.username = user[0].username;
      }
    });

    this.userStats$.pipe(take(2)).subscribe((stats) => {
      if (stats) {
        const paceArray = [
          stats.fastPaced,
          stats.moderatePaced,
          stats.slowPaced,
        ];
        const lengthArray = [
          stats.longBooks,
          stats.mediumBooks,
          stats.shortBooks,
        ];
        this.pacePercentages = paceArray.map((value) => `${value}%`);
        this.lengthPercentages = lengthArray.map((value) => `${value}%`);
      }
    });
  }
}
