import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroStarSolid } from '@ng-icons/heroicons/solid';
import { UsableBooks } from '../../../../interfaces/booksInterfaces';
import { StarsComponent } from './stars/stars.component';
import { TagsComponent } from './tags/tags.component';

@Component({
  selector: 'app-have-read',
  standalone: true,
  imports: [NgIconComponent, DatePipe, StarsComponent, TagsComponent],
  templateUrl: './have-read.component.html',
  styleUrl: './have-read.component.scss',
  viewProviders: [provideIcons({ heroStarSolid })],
})
export class HaveReadComponent {
  @Output() updateReviewEvent = new EventEmitter<string>();
  thisBook: UsableBooks | undefined;
  bookDataExists = false;
  ratingHalf = 0;
  ratingFull = 0;
  tags: number[] = [];

  updateReview() {
    this.thisBook!.DNF_reason = [];
    localStorage.setItem('currentBook', JSON.stringify(this.thisBook));
    this.updateReviewEvent.emit('reading');
  }

  constructor() {
    const bookString = localStorage.getItem('currentBook');
    if (bookString !== null) {
      this.thisBook = JSON.parse(bookString);
      this.bookDataExists = true;
    } else {
      this.bookDataExists = false;
    }

    if (this.thisBook) {
      if (this.thisBook.rating % 2 !== 0) {
        this.ratingHalf = 1;
      }
      this.ratingFull = Math.floor(this.thisBook.rating);
      this.tags.push(this.thisBook.character_plot);
      this.tags.push(this.thisBook.tense_lighthearted);
      this.tags.push(this.thisBook.dark_light);
      this.tags.push(this.thisBook.informative_fun);
      this.tags.push(this.thisBook.adventurous_grounded);
      this.tags.push(this.thisBook.reflective_action);
    }
  }
}
