import { Injectable } from '@angular/core';
import { PolarChartOptions } from '../interfaces/chartsInterface';

@Injectable({
  providedIn: 'root',
})
export class ChartsDataService {
  public polarChartOptions: Partial<PolarChartOptions>;
  chartOptions: any;

  constructor() {
    this.polarChartOptions = {
      series: [], // Needs to be initialized
      chart: {
        width: 250,
        height: 250,
        type: 'polarArea',
      },
      labels: ['1✦', '2✦', '3✦', '4✦', '5✦'],
      responsive: [], // Needs to be initialized
      stroke: {
        width: 1,
        colors: undefined,
      },
      yaxis: {
        show: false,
      },
      legend: {
        position: 'bottom',
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0,
          },
        },
      },
      theme: {
        monochrome: {
          enabled: true,
          shadeTo: 'light',
          shadeIntensity: 0.6,
        },
      },
      fill: {
        opacity: 1,
        colors: ['#8c8c8b', '#3e3333', '#704146', '#aa343c', '#A00711'],
      },
      dataLabels: {
        enabled: false,
        style: {
          colors: ['#8c8c8b', '#3e3333', '#704146', '#aa343c', '#A00711'],
        },
      },
    };
  }
}
