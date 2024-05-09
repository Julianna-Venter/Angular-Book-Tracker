import { Component, OnInit, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroStarSolid } from '@ng-icons/heroicons/solid';
import { ChartsComponent } from './charts/charts.component';

import { Store } from '@ngrx/store';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsDataService } from '../../../services/charts-data.service';
import { getUserStats } from '../../../store/actions/user.actions';
import { UserDataState } from '../../../store/reducers/user.reducer';
import {
  selectGetUserStats,
  selectgetUserData,
} from '../../../store/selectors/user.selectors';
import { AsyncPipe } from '@angular/common';

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
  charts = inject(ChartsDataService);
  chartOptions = this.charts.polarChartOptions;
  barChartOptions = this.charts.barChartOptions;

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user && user[0] !== undefined) {
        this.userStore.dispatch(getUserStats({ user: user[0] }));
      }
    });
  }
}
