import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dnf',
  standalone: true,
  imports: [],
  templateUrl: './dnf.component.html',
  styleUrl: './dnf.component.scss',
})
export class DnfComponent {
  @Output() DNFEvent = new EventEmitter<string[]>();
  dnfreasons: string[] = [];

  addReason(reason: string) {
    if (!this.dnfreasons.includes(reason)) {
      this.dnfreasons.push(reason);
      this.DNFEvent.emit(this.dnfreasons);
    }
  }
}
