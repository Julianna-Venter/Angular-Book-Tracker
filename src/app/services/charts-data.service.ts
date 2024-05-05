import { Injectable } from '@angular/core';
import {
  BarChartOptions,
  PolarChartOptions,
} from '../interfaces/chartsInterface';

@Injectable({
  providedIn: 'root',
})
export class ChartsDataService {
  public barChartOptions: Partial<BarChartOptions>;
  public polarChartOptions: Partial<PolarChartOptions>;

  constructor() {
    this.polarChartOptions = {
      series: [3, 6, 13, 8, 12],
      chart: {
        width: 250,
        height: 250,
        type: 'polarArea',
      },
      labels: ['1✦', '2✦', '3✦', '4✦', '5✦'],
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

    this.barChartOptions = {
      series: [
        {
          name: 'Short',
          data: [13, 45],
        },
        {
          name: 'Medium',
          data: [23, 65],
        },
        {
          name: 'Long',
          data: [23, 65],
        },
      ],
      chart: {
        type: 'bar',
        height: 250,
        stacked: true,
        stackType: '100%',
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      title: {
        text: 'Numeric Data',
      },
      xaxis: {
        categories: ['Pace', 'Length'],
        labels: {
          formatter: function (val: string) {
            return val;
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val: string) {
            return val;
          },
        },
      },
      fill: {
        opacity: 1,
        colors: ['#5c661f', '#6c7724', '#7b882a', '#8b992f', '#9AAA34'],
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 40,
      },
    };
  }
}
