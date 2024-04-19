import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { FIRESTORE_API_KEY } from '../../environments/firestore-api-key';
import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: FIRESTORE_API_KEY.apiKey,
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
    ]),
  ],
};
