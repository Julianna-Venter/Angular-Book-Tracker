import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-carousel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-carousel.component.html',
  styleUrl: './book-carousel.component.scss',
})
export class BookCarouselComponent {}
