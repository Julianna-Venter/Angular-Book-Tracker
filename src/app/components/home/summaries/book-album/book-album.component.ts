import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-album',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-album.component.html',
  styleUrl: './book-album.component.scss',
})
export class BookAlbumComponent {
  navigateTo(route: string) {
    console.log('Navigating to', route);
  }
}
