import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ReviewData,
  UsableBooks,
} from '../../../../interfaces/booksInterfaces';
import { DnfComponent } from '../dnf/dnf.component';

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [DnfComponent, ReactiveFormsModule],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.scss',
})
export class ReadingComponent {
  @Input() dnf!: boolean;
  @Output() completeReviewEvent = new EventEmitter<string>();
  @Input() reviewData!: ReviewData | undefined;
  @Output() reviewDataChange = new EventEmitter<ReviewData>();
  thisBook: UsableBooks | undefined;

  readingForm = new FormGroup({
    rating: new FormControl(0),
    ratingHalf: new FormControl(0),
    rating1: new FormControl(0),
    rating1Half: new FormControl(0),
    rating2: new FormControl(0),
    rating2Half: new FormControl(0),
    rating3: new FormControl(0),
    rating3Half: new FormControl(0),
    rating4: new FormControl(0),
    rating4Half: new FormControl(0),
    rating5: new FormControl(0),
    pace: new FormControl(0),
    PC: new FormControl(0),
    TL: new FormControl(0),
    DL: new FormControl(0),
    IF: new FormControl(0),
    RC: new FormControl(0),
    AG: new FormControl(0),
    comments: new FormControl(''),
  });

  dnfReasons: string[] = [];
  pace: string = '';

  constructor() {
    this.dnfReasons = [];
    const bookString = localStorage.getItem('currentBook');
    if (bookString !== null) {
      this.thisBook = JSON.parse(bookString);
    }
  }

  getDNFReasons(reasons: string[]) {
    this.dnfReasons = reasons;
  }

  completeReview() {
    localStorage.setItem('list', 'read');
    this.completeReviewEvent.emit('read');
    const rawForm = this.readingForm.getRawValue();

    const submitdate = new Date().toISOString();

    let rating = 0;

    if (rawForm.rating1Half !== 0) {
      rating = 0.5;
    } else if (rawForm.rating1 !== 0) {
      rating = 1;
    } else if (rawForm.rating1Half !== 0) {
      rating = 1.5;
    } else if (rawForm.rating2 !== 0) {
      rating = 2;
    } else if (rawForm.rating2Half !== 0) {
      rating = 2.5;
    } else if (rawForm.rating3 !== 0) {
      rating = 3;
    } else if (rawForm.rating3Half !== 0) {
      rating = 3.5;
    } else if (rawForm.rating4 !== 0) {
      rating = 4;
    } else if (rawForm.rating4Half !== 0) {
      rating = 4.5;
    } else if (rawForm.rating5 !== 0) {
      rating = 5;
    } else {
      rating = 0;
    }
    let statusTemp = 'read';
    if (this.dnfReasons.length > 0) {
      statusTemp = 'dnf';
    }

    this.reviewData = {
      pace: rawForm.pace || 0,
      rating: rating || 0,
      comments: rawForm.comments || '',
      status: statusTemp,
      character_plot: rawForm.PC || 0,
      tense_lighthearted: rawForm.TL || 0,
      dark_light: rawForm.DL || 0,
      informative_fun: rawForm.IF || 0,
      adventurous_grounded: rawForm.AG || 0,
      reflective_action: rawForm.RC || 0,
      DNF_reason: this.dnfReasons,
      lastUpdated: submitdate,
    };

    this.reviewDataChange.emit(this.reviewData);
  }
}
