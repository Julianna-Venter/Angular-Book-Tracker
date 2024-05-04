import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  @Output() returnDataEvent = new EventEmitter();

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

  getDNFReasons(reasons: string[]) {
    this.dnfReasons = reasons;
  }

  completeReview() {
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

    //will refine these data points later

    const returnData = {
      rawForm,
      rating,
      submitdate,
      dnfReasons: this.dnfReasons,
    };

    this.returnDataEvent.emit(returnData);
  }
}
