import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  arrayUnion,
  collection,
  collectionData,
  doc,
  getDoc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import {
  BookList,
  FirestoreUser,
  UsableBooks,
} from '../interfaces/booksInterfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersFirebaseService {
  firestore = inject(Firestore);

  async addUser(username: string, email: string) {
    await addDoc(collection(this.firestore, 'users'), {
      username,
      email,
      booklist: {
        reading: [],
        dnf: [],
        read: [],
        tbr: [],
      },
    });
  }

  getUser(userEmail: string): Observable<FirestoreUser[]> {
    const q = query(
      collection(this.firestore, 'users'),
      where('email', '==', userEmail)
    );

    return collectionData(q, { idField: 'id' }) as Observable<FirestoreUser[]>;
  }

  async addToList(list: string, book: UsableBooks, user: FirestoreUser) {
    this.getMatchedBook(user, list as keyof BookList, book.id).subscribe(
      async (matchedBook) => {
        if (!(matchedBook?.id === book.id)) {
          const docRef = doc(this.firestore, 'users', user.id);

          const fieldPath = `booklist.${list}`;

          try {
            await updateDoc(docRef, {
              [fieldPath]: arrayUnion(book),
            });
          } catch (error) {
            console.error('Error adding book to list:', error);
          }
        }
      }
    );
  }

  //REMEMBER TO CHANGE THIS
  getBookList(
    user: FirestoreUser,
    list: keyof BookList
  ): Observable<UsableBooks[]> {
    const q = query(
      collection(this.firestore, 'users'),
      where('email', '==', user.email)
    );

    const results = from(collectionData(q, { idField: 'id' })).pipe(
      map((users) => {
        return users[0]['booklist'][list];
      })
    );

    return results as Observable<UsableBooks[]>;
  }

  getMatchedBook(
    user: FirestoreUser,
    list: keyof BookList,
    bookId: string
  ): Observable<UsableBooks> {
    const q = query(
      collection(this.firestore, 'users'),
      where('email', '==', user.email)
    );

    const results = from(collectionData(q, { idField: 'id' })).pipe(
      map((users) => {
        const booklist = users[0]?.['booklist']?.[list] || [];

        if (Array.isArray(booklist)) {
          return booklist.find((book: UsableBooks) => book.id === bookId);
        } else if (typeof booklist === 'object' && booklist !== null) {
          const booksArray = Object.values(booklist) as UsableBooks[];
          const matchingBooks = booksArray.filter(
            (book: UsableBooks) => book.id === bookId
          );
          return matchingBooks.shift();
        } else {
          console.error('booklist[list] is not an array or object');
          return null;
        }
      })
    );

    return results as Observable<UsableBooks>;
  }

  async removeFromList(list: string, book: UsableBooks, user: FirestoreUser) {
    const userId = user.id || '';
    const bookId = book.id || '';
    const docRef = doc(this.firestore, 'users', userId);

    const userSnapshot = await getDoc(docRef);
    const userData = userSnapshot.data();
    if (!userData) {
      console.error('User not found');
      return;
    }

    const books = userData['booklist'][list];
    if (!books) {
      console.error('Book list not found:', list);
      return;
    }

    const updatedBooks = books.filter(
      (book: UsableBooks) => book.id !== bookId
    );

    try {
      await updateDoc(docRef, {
        [`booklist.${list}`]: updatedBooks,
      });
    } catch (error) {
      console.error('Error removing book from list:', error);
    }
  }
}
