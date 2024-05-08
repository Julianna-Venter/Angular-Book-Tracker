import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_KEYS } from '../../../environments/api-keys';
import { UsableBooks, Volume } from '../interfaces/booksInterfaces';
//https://www.googleapis.com/books/v1/volumes?q=search+terms
//https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
//Notes: spaces don't matter, it gets converted in url anyway

@Injectable({
  providedIn: 'root',
})
export class BooksApiService {
  baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
  apiKey = '&key=' + API_KEYS.google;

  constructor(private http: HttpClient) {}

  getBooks(query: string) {
    return this.http
      .get<Volume>(this.baseUrl + query)
      .pipe(map((response) => response.items));
  }

  setSearchedBooks(books: UsableBooks): Observable<UsableBooks> {
    return new Observable((observer) => {
      observer.next(books);
    });
  }
}
