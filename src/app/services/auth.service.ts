import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Observable, Subject, from, map } from 'rxjs';
import { AuthUser } from '../interfaces/authInterface';
import { UsersFirebaseService } from './users-firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<AuthUser | null | undefined>(undefined); //might not be needed
  isUserSet$ = new Subject<boolean>();
  usersFirebaseService = inject(UsersFirebaseService);

  register(
    email: string,
    username: string,
    password: string
  ): Observable<{ username: string }> {
    this.usersFirebaseService.addUser(username, email);
    return from(
      createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(
        (response) => {
          const username = response?.user?.displayName || '';
          updateProfile(response.user, { displayName: username });
          return { username };
        }
      )
    );
  }

  login(email: string, password: string): Observable<{ username: string }> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, email, password)
    ).pipe(
      map((userCredential: UserCredential) => {
        // Check if user is null or undefined or if displayName is null
        const username = userCredential?.user?.displayName || '';
        return { username };
      })
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.firebaseAuth));
  }
}
