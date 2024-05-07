import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserResponse } from '../interfaces/authInterface';
import { FirestoreUser, UsableBooks } from '../interfaces/booksInterfaces';
import { SetUserDataError } from '../store/actions';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersFirebaseService {
  firestore = inject(Firestore);
  usersCollection = collection(this.firestore, 'users');

  async addUser(username: string, email: string) {
    const docRef = await addDoc(collection(this.firestore, 'users'), {
      username,
      email,
      booklist: {
        current: [],
        dnf: [],
        read: [],
        tbr: [],
      },
      // profilestats: {
      //   stats: [],
      // },
    });
  }

  getUser(userEmail: string): Observable<FirestoreUser[]> {
    const q = query(
      collection(this.firestore, 'users'),
      where('email', '==', userEmail)
    );

    return collectionData(q, { idField: 'id' }) as Observable<FirestoreUser[]>;
  }

  addToList(list: string, book: UsableBooks) {}

  removeFromList(list: string, book: UsableBooks) {}

  getList(list: string) {}
}
