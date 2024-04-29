import { Component } from '@angular/core';
import { DnfComponent } from '../dnf/dnf.component';

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [DnfComponent],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.scss',
})
export class ReadingComponent {}
