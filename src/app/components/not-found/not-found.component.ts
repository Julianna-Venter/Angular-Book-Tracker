import { Component } from '@angular/core';
import { SpotlightSvgComponent } from './spotlight-svg/spotlight-svg.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [SpotlightSvgComponent, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
