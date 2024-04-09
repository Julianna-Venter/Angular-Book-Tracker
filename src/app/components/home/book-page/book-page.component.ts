import { Component } from '@angular/core';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.scss',
})
export class BookPageComponent {
  bookTitle =
    'https://d3ui957tjb5bqd.cloudfront.net/uploads/2018/08/23061054/Classic-Book-Covers-Redesigned-4.png';
}
