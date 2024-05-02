import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  title = 'Book List';

  constructor(private router: Router, private route: ActivatedRoute) {
    if (this.router.url === '/home/book-list/tbr') {
      this.title = 'To Be Read';
    } else if (this.router.url === '/home/book-list/dnf') {
      this.title = 'Did Not Finish';
    } else if (this.router.url === '/home/book-list/read') {
      this.title = 'Have Read';
    }
  }

  navChild() {
    this.router.navigate(['book', 'this-book'], { relativeTo: this.route });
  }
}
