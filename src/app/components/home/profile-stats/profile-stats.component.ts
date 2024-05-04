import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroStarSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-profile-stats',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './profile-stats.component.html',
  styleUrl: './profile-stats.component.scss',
  viewProviders: [provideIcons({ heroStarSolid })],
})
export class ProfileStatsComponent {}
