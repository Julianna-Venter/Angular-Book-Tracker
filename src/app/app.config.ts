import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { API_KEYS } from '../../environments/api-keys';
import { routes } from './app.routes';
import { booksReducer, featureKey } from './store/reducer';
import { provideEffects } from '@ngrx/effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

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
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth()),
    ]),
    provideStore(),
    provideState({ name: featureKey, reducer: booksReducer }),
    provideEffects(), provideAnimationsAsync('noop'),
  ],
};
