import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tbr',
  standalone: true,
  imports: [],
  templateUrl: './tbr.component.html',
  styleUrl: './tbr.component.scss',
})
export class TbrComponent {
  @Output() startReviewEvent = new EventEmitter<string>();

  startReview() {
    this.startReviewEvent.emit('reading');
  }
}
