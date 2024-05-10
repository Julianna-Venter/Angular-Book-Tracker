import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-charts',
  standalone: true,
  imports: [],
  templateUrl: './bar-charts.component.html',
  styleUrl: './bar-charts.component.scss',
})
export class BarChartsComponent implements OnInit {
  @Input() pace: number[] = [];
  @Input() length: number[] = [];
  pacePercentages: string[] = [];
  lengthPercentages: string[] = [];

  ngOnInit(): void {
    this.pacePercentages = this.pace.map((value) => `${value}%`);
    this.lengthPercentages = this.length.map((value) => `${value}%`);
    console.log(this.pacePercentages, this.lengthPercentages);
  }
}
