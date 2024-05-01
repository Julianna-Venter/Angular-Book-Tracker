import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';
import { Subscription } from 'rxjs';
import { BookArrays } from '../../../interfaces/booksInterfaces';
import { BooksApiService } from '../../../services/books-api.service';
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
  ],
  templateUrl: './summaries.component.html',
  styleUrl: './summaries.component.scss',
  viewProviders: [provideIcons({ heroChevronDown })],
})
export class SummariesComponent implements OnInit, OnDestroy {
  booksSubscription: Subscription | undefined;

  constructor(private BooksApiService: BooksApiService) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    const query = 'Harry Potter';
    this.booksSubscription = this.BooksApiService.getBooks(query).subscribe({
      next: (data: BookArrays[]) => {
        console.log('Normal request:', data); // Log the data returned by the service
      },
      error: (error) => {
        console.error(error); // Log any errors
      },
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.booksSubscription) {
      this.booksSubscription.unsubscribe();
    }
  }
}
