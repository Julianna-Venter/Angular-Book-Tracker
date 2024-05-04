import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserResponse } from '../interfaces/authInterface';
import { FirestoreUser } from '../interfaces/booksInterfaces';
import { SetUserDataError } from '../store/actions';

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
      profilestats: {
        stats: [],
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

  //these two need to be implemented
  setUserData(user: UserResponse): Observable<SetUserDataError> {
    return new Observable((observer) => {
      observer.next({ message: 'Error' });
    });
  }

  deleteUserBookData(bookId: string): Observable<SetUserDataError> {
    return new Observable((observer) => {
      observer.next({ message: 'Error' });
    });
  }
}
