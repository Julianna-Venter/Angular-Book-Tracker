import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dnf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dnf.component.html',
  styleUrl: './dnf.component.scss',
})
export class DnfComponent {
  @Output() DNFEvent = new EventEmitter<string[]>();
  dnfreasons: string[] = [];

  toggleReason(reason: string) {
    const index = this.dnfreasons.indexOf(reason);
    if (index === -1) {
      this.dnfreasons.push(reason);
    } else {
      this.dnfreasons = this.dnfreasons.filter((item) => item !== reason);
    }
    this.DNFEvent.emit(this.dnfreasons);
  }
}
