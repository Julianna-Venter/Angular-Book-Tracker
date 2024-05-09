import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';
import { SpotlightComponent } from '../../shared-components/spotlight/spotlight.component';
import { BookAlbumComponent } from './book-album/book-album.component';
import { BookCarouselComponent } from './book-carousel/book-carousel.component';

@Component({
  selector: 'app-summaries',
  standalone: true,
  imports: [
    RouterLink,
    NgIconComponent,
    BookCarouselComponent,
    BookAlbumComponent,
    SpotlightComponent,
  ],
  templateUrl: './summaries.component.html',
  styleUrl: './summaries.component.scss',
  viewProviders: [provideIcons({ heroChevronDown })],
})
export class SummariesComponent {
  tbrVar: string = 'tbr';
  dnfVar: string = 'dnf';
  readVar: string = 'read';

  constructor() {
    console.log('SummariesComponent created');
  }
}
