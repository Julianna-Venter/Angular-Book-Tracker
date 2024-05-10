import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroStarSolid } from '@ng-icons/heroicons/solid';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { BooksState } from '../../../../store/reducers/book.reducer';
import { selectSearchedBook } from '../../../../store/selectors/book.selectors';
import { StarsComponent } from './stars/stars.component';
import { TagsComponent } from './tags/tags.component';

@Component({
  selector: 'app-have-read',
  standalone: true,
  imports: [
    NgIconComponent,
    DatePipe,
    StarsComponent,
    TagsComponent,
    AsyncPipe,
  ],
  templateUrl: './have-read.component.html',
  styleUrl: './have-read.component.scss',
  viewProviders: [provideIcons({ heroStarSolid })],
})
export class HaveReadComponent implements OnInit {
  @Output() updateReviewEvent = new EventEmitter<string>();
  bookStore = inject(Store<BooksState>);
  searchedBook$ = this.bookStore.select(selectSearchedBook);
  ratingHalf = 0;
  ratingFull = 0;
  tags: number[] = [];

  updateReview() {
    localStorage.setItem('list', 'read');
    this.updateReviewEvent.emit('reading');
  }

  ngOnInit() {
    this.searchedBook$.pipe(take(2)).subscribe((thisBook) => {
      if (thisBook) {
        if (thisBook.rating % 2 !== 0) {
          this.ratingHalf = 1;
        }
        const dnf_reasons = thisBook.DNF_reason?.entries();
        this.ratingFull = Math.floor(thisBook.rating);
        this.tags.push(thisBook.character_plot);
        this.tags.push(thisBook.tense_lighthearted);
        this.tags.push(thisBook.dark_light);
        this.tags.push(thisBook.informative_fun);
        this.tags.push(thisBook.adventurous_grounded);
        this.tags.push(thisBook.reflective_action);
      }
    });
  }
}
