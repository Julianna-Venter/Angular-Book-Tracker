import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroStarSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-have-read',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './have-read.component.html',
  styleUrl: './have-read.component.scss',
  viewProviders: [provideIcons({ heroStarSolid })],
})
export class HaveReadComponent {}
