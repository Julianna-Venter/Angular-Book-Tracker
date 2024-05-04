import { Component, ViewChild, inject } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';

import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsDataService } from '../../../../services/charts-data.service';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  charts = inject(ChartsDataService);

  chartOptionsPC = this.charts.chartOptionsPC;
  chartOptionsTL = this.charts.chartOptionsTL;
  chartOptionsDL = this.charts.chartOptionsDL;
  chartOptionsIF = this.charts.chartOptionsIF;
  chartOptionsAG = this.charts.chartOptionsAG;
  chartOptionsRC = this.charts.chartOptionsRC;
}
