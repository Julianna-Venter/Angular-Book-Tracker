import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, map, switchMap } from 'rxjs';
import { BookList, ProfileStats, User } from '../interfaces/booksInterfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersFirebaseService {
  firestore = inject(Firestore);
  usersCollection = collection(this.firestore, 'users');

  addUser(username: string, email: string) {
    setDoc(doc(this.firestore, 'users', email), {
      username,
      email,
      booklist: {
        current: [],
        dnf: [],
        read: [],
        tbr: [],
      },
      profilestats: {
        stats: [],
      },
    });
  }

  getUsers(): Observable<User[]> {
    return collectionData(this.usersCollection, {
      idField: 'id',
    }) as Observable<User[]>;
  }

  getBookList(userId: string): Observable<BookList[]> {
    const booklistCollection = collection(
      this.firestore,
      `users/${userId}/booklist`
    );
    return collectionData(booklistCollection, {
      idField: 'id',
    }) as Observable<BookList[]>;
  }

  getProfileStats(userId: string): Observable<ProfileStats[]> {
    const statsCollection = collection(
      this.firestore,
      `users/${userId}/profilestats`
    );
    return collectionData(statsCollection, {
      idField: 'id',
    }) as Observable<ProfileStats[]>;
  }

  // getCompleteUserData(
  //   userId: string
  // ): Observable<{ CompleteUserData: CompleteUserData }> {
  //   return this.getUsers().pipe(
  //     switchMap((users) => {
  //       const user = users.find((user) => user.id === userId) as User;
  //       return forkJoin({
  //         bookList: this.getBookList(user.id),
  //         profileStats: this.getProfileStats(user.id),
  //       }).pipe(
  //         map(({ bookList, profileStats }) => ({
  //           CompleteUserData: {
  //             user,
  //             bookList,
  //             profileStats,
  //           },
  //         })),
  //         catchError((error) => {
  //           console.error('Error getting complete user data:', error);
  //           return [];
  //         })
  //       );
  //     })
  //   );
  // }

  getCompleteUserData(
    userId: string
  ): Observable<{ user: User; bookList: BookList[] }> {
    return this.getUsers().pipe(
      switchMap((users) => {
        const user = users.find((user) => user.id === userId) as User;
        return this.getBookList(user.id).pipe(
          map((bookList) => ({ user, bookList }))
        );
      })
    );
  }
}
