import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent implements OnInit {
  //PC, TL, DL, IF, AG, RA
  @Input() tags!: number[];
  PC: { title: string; percentage: number } = { title: '', percentage: 0 };
  TL: { title: string; percentage: number } = { title: '', percentage: 0 };
  DL: { title: string; percentage: number } = { title: '', percentage: 0 };
  IF: { title: string; percentage: number } = { title: '', percentage: 0 };
  AG: { title: string; percentage: number } = { title: '', percentage: 0 };
  RA: { title: string; percentage: number } = { title: '', percentage: 0 };

  ngOnInit() {
    if (this.tags[0] >= 50) {
      this.PC.title = 'Plot';
      this.PC.percentage = this.tags[0];
    } else {
      this.PC.title = 'Character';
      this.PC.percentage = 100 - this.tags[0];
    }

    if (this.tags[1] >= 50) {
      this.TL.title = 'Tense';
      this.TL.percentage = this.tags[1];
    } else {
      this.TL.title = 'Lighthearted';
      this.TL.percentage = 100 - this.tags[1];
    }

    if (this.tags[2] >= 50) {
      this.DL.title = 'Dark';
      this.DL.percentage = this.tags[2];
    } else {
      this.DL.title = 'Light';
      this.DL.percentage = 100 - this.tags[2];
    }

    if (this.tags[3] >= 50) {
      this.IF.title = 'Informative';
      this.IF.percentage = this.tags[3];
    } else {
      this.IF.title = 'Fun';
      this.IF.percentage = 100 - this.tags[3];
    }

    if (this.tags[4] >= 50) {
      this.AG.title = 'Adventurous';
      this.AG.percentage = this.tags[4];
    } else {
      this.AG.title = 'Grounded';
      this.AG.percentage = 100 - this.tags[4];
    }

    if (this.tags[5] >= 50) {
      this.RA.title = 'Reflective';
      this.RA.percentage = this.tags[5];
    } else {
      this.RA.title = 'Action';
      this.RA.percentage = 100 - this.tags[5];
    }
  }
}
