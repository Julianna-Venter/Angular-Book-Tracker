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
import { EMPTY, Observable, of, switchMap } from 'rxjs';
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
    this.getMatchedBook(user.email, list as keyof BookList, book.id).subscribe(
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
    userEmail: string,
    list: keyof BookList
  ): Observable<UsableBooks[]> {
    return this.getUser(userEmail).pipe(
      switchMap((users: FirestoreUser[]) => {
        if (users.length > 0) {
          return of(users[0].booklist[list] as UsableBooks[]);
        } else {
          return EMPTY;
        }
      })
    );
  }

  getMatchedBook(
    userEmail: string,
    list: keyof BookList,
    bookId: string
  ): Observable<UsableBooks> {
    return this.getBookList(userEmail, list).pipe(
      switchMap((books: UsableBooks[]) => {
        if (books) {
          return of(books.find((book) => book.id === bookId) as UsableBooks);
        } else {
          return EMPTY;
        }
      })
    );
  }

  async removeFromList(list: string, bookId: string, userId: string) {
    console.log('Removing from list:', list, bookId, userId);
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
      console.log('Book removed from list:', list);
    } catch (error) {
      console.error('Error removing book from list:', error);
    }
  }

  // try {
  //   // Append the book to the existing list
  //   await updateDoc(docRef, {
  //     [fieldPath]: arrayUnion(book),
  //   });
  // } catch (error) {
  //   console.error('Error adding book to list:', error);
  // }
  // const docRef = doc(this.firestore, 'users', userId);

  // const userSnapshot = await getDoc(docRef);
  // const userData = userSnapshot.data();

  // //no user found
  // if (!userData) {
  //   console.error('User not found');
  //   return;
  // }

  // //checking if there is a list by that name
  // const books = userData['booklist'][list];
  // if (!books) {
  //   console.error('Book list not found:', list);
  //   return;
  // }

  // console.log('Books:', books, 'in list:', list);

  // //filter out the book with the matching id
  // const updatedBooks = books.filter(
  //   (book: any) => book.id !== bookId
  // ) as UsableBooks[];

  // console.log('Updated books:', updatedBooks, 'in list:', list);

  // const fieldPath = `booklist.${list}`;

  // try {
  //   // Append the book to the existing list
  //   await updateDoc(docRef, {
  //     [fieldPath]: updatedBooks,
  //   });

  //   console.log('Book:', bookId, ' removed from list:', list);
  // } catch (error) {
  //   console.error('Error adding book to list:', error);
  // }
}
