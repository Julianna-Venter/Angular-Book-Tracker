import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { API_KEYS } from '../../environments/api-keys';
import { routes } from './app.routes';
import { BooksEffects } from './store/books-store/book.effects';
import {
  booksFeatureKey,
  booksReducer,
} from './store/books-store/book.reducer';
import {
  userDataFeatureKey,
  userDataReducer,
} from './store/user-store/user-data.reducer';
import { UsersEffects } from './store/user-store/user.effects';
import { userFeatureKey, userReducer } from './store/user-store/user.reducer';

const firebaseConfig = {
  apiKey: API_KEYS.firestore,
  authDomain: 'angular-book-tracker-686b9.firebaseapp.com',
  projectId: 'angular-book-tracker-686b9',
  storageBucket: 'angular-book-tracker-686b9.appspot.com',
  messagingSenderId: '706862192768',
  appId: '1:706862192768:web:cab46e521fb925ede86e65',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth()),
      FormsModule,
    ]),
    provideStore(),
    provideState({ name: userFeatureKey, reducer: userReducer }),
    provideState({ name: userDataFeatureKey, reducer: userDataReducer }),
    provideState({ name: booksFeatureKey, reducer: booksReducer }),
    provideEffects(BooksEffects, UsersEffects),
    provideAnimationsAsync(),
  ],
};
