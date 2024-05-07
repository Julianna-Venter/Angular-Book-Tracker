import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  standalone: true,
  imports: [],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.scss',
})
export class StarsComponent implements OnInit {
  @Input() fullStars!: number;
  @Input() halfStars!: number;
  countArray: number[] = [];

  constructor() {}

  ngOnInit() {
    this.countArray = Array.from({ length: this.fullStars }, (_, i) => i);
  }
}
