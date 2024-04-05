import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroChartPie,
  heroHome,
  heroMagnifyingGlass,
  heroPlus,
} from '@ng-icons/heroicons/outline';
import { heroChartPieSolid, heroHomeSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIconComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  viewProviders: [
    provideIcons({
      heroHomeSolid,
      heroHome,
      heroPlus,
      heroChartPieSolid,
      heroChartPie,
      heroMagnifyingGlass,
    }),
  ],
})
export class HomeComponent {
  homeIcon = 'heroHome';
  pieIcon = 'heroChartPie';
}
