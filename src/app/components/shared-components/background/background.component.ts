import { Component } from '@angular/core';
import { SpotlightComponent } from '../spotlight/spotlight.component';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [SpotlightComponent],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss',
})
export class BackgroundComponent {}
