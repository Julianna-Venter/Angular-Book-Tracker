import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from, map } from 'rxjs';
import { UsersFirebaseService } from './users-firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  usersFirebaseService = inject(UsersFirebaseService);
  router = inject(Router);

  register(
    email: string,
    username: string,
    password: string
  ): Observable<{ username: string; email: string }> {
    this.usersFirebaseService.addUser(username, email);
    return from(
      createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(
        (response) => {
          const username = response?.user?.displayName || '';
          const email = response?.user?.email || '';
          updateProfile(response.user, { displayName: username });
          return { username, email };
        }
      )
    );
  }

  login(
    email: string,
    password: string
  ): Observable<{ username: string; email: string }> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, email, password)
    ).pipe(
      map((userCredential: UserCredential) => {
        const username = userCredential?.user?.displayName || '';
        const email = userCredential?.user?.email || '';
        return { username, email };
      })
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.firebaseAuth));
  }
}
