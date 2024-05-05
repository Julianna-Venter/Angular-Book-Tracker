import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroStarSolid } from '@ng-icons/heroicons/solid';
import { ChartsComponent } from './charts/charts.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsDataService } from '../../../services/charts-data.service';

@Component({
  selector: 'app-profile-stats',
  standalone: true,
  imports: [NgIconComponent, ChartsComponent, NgApexchartsModule],
  templateUrl: './profile-stats.component.html',
  styleUrl: './profile-stats.component.scss',
  viewProviders: [provideIcons({ heroStarSolid })],
})
export class ProfileStatsComponent {
  charts = inject(ChartsDataService);
  chartOptions = this.charts.polarChartOptions;
  barChartOptions = this.charts.barChartOptions;
}
