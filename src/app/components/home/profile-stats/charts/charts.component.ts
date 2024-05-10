import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Store } from '@ngrx/store';
import { UserDataState } from '../../../../store/reducers/user.reducer';
import { selectGetUserStats } from '../../../../store/selectors/user.selectors';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [AsyncPipe, NgIconComponent],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
  viewProviders: [provideIcons({})],
})
export class ChartsComponent {
  userStore = inject(Store<UserDataState>);
  userStats$ = this.userStore.select(selectGetUserStats);
}
