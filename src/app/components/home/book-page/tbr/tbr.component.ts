import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tbr',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tbr.component.html',
  styleUrl: './tbr.component.scss',
})
export class TbrComponent {
  @Output() startReviewEvent = new EventEmitter<string>();
  @Output() returnDataEvent = new EventEmitter();

  tbrForm = new FormGroup({
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
  });

  startReview() {
    this.startReviewEvent.emit('reading');
    const rawForm = this.tbrForm.getRawValue();

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

    const returnData = {
      pace: 0,
      rating: rating || 0,
      comments: '',
      status: 'reading',
      character_plot: 0,
      tense_lighthearted: 0,
      dark_light: 0,
      informative_fun: 0,
      adventurous_grounded: 0,
      reflective_action: 0,
      DNF_reason: [],
      lastUpdated: submitdate,
    };

    this.returnDataEvent.emit(returnData);
  }
}
