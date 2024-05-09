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
  // usersCollection = collection(this.firestore, 'users');

  async addUser(username: string, email: string) {
    const docRef = await addDoc(collection(this.firestore, 'users'), {
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
            // Append the book to the existing list
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
    console.log('Getting matched book:', user.email, list, bookId);
    const q = query(
      collection(this.firestore, 'users'),
      where('email', '==', user.email)
    );

    const results = from(collectionData(q, { idField: 'id' })).pipe(
      map((users) => {
        return users[0]['booklist'][list].find(
          (book: UsableBooks) => book.id === bookId
        );
      })
    );

    return results as Observable<UsableBooks>;
  }

  async removeFromList(list: string, bookId: string, userId: string) {
    // console.log('Removing from list:', list, bookId, userId);
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

    const updatedBooks = books.filter((book: any) => book.id !== bookId);

    try {
      // Update the list without the book with the matching id
      await updateDoc(docRef, {
        [`booklist.${list}`]: updatedBooks,
      });
      // console.log('Book removed from list:', list);
    } catch (error) {
      console.error('Error removing book from list:', error);
    }
  }
}
