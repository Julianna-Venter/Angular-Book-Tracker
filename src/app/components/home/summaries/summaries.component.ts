import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';
import { BookCarouselComponent } from './book-carousel/book-carousel.component';
import { BookAlbumComponent } from './book-album/book-album.component';

@Component({
  selector: 'app-summaries',
  standalone: true,
  imports: [
    RouterLink,
    NgIconComponent,
    BookCarouselComponent,
    BookAlbumComponent,
  ],
  templateUrl: './summaries.component.html',
  styleUrl: './summaries.component.scss',
  viewProviders: [provideIcons({ heroChevronDown })],
})
export class SummariesComponent {}
