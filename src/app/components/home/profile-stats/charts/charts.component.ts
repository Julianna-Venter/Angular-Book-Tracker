import { Component, inject } from '@angular/core';
import { UserDataState } from '../../../../store/reducers/user.reducer';
import { Store } from '@ngrx/store';
import { selectGetUserStats } from '../../../../store/selectors/user.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent {
  userStore = inject(Store<UserDataState>);
  userStats$ = this.userStore.select(selectGetUserStats);
}
