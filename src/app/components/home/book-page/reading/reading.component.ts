import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DnfComponent } from '../dnf/dnf.component';

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [DnfComponent],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.scss',
})
export class ReadingComponent {
  @Input() dnf!: boolean;
  @Output() completeReviewEvent = new EventEmitter<string>();

  completeReview() {
    this.completeReviewEvent.emit('read');
  }
}
