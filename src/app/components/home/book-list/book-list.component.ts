import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  router = inject(Router);

  title = 'Book List';

  constructor() {
    if (this.router.url === '/home/book-list/tbr') {
      this.title = 'To Be Read';
    } else if (this.router.url === '/home/book-list/dnf') {
      this.title = 'Did Not Finish';
    } else if (this.router.url === '/home/book-list/read') {
      this.title = 'Have Read';
    }
  }
}
