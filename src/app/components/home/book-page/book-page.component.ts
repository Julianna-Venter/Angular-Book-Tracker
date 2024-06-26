import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HaveReadComponent } from './have-read/have-read.component';
import { ReadingComponent } from './reading/reading.component';
import { TbrComponent } from './tbr/tbr.component';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReadingComponent,
    TbrComponent,
    HaveReadComponent,
  ],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.scss',
})
export class BookPageComponent {
  bookTitle =
    'https://books.google.com/books/content?id=-puZBgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api';

  selected = 'nothing';

  changeSelected(event: string) {
    this.selected = event;
  }

  //these console logs are placeholders for the actual data that will be sent to the backend database
  returnData(event: string) {
    console.log('returnedData', event);
  }
}
