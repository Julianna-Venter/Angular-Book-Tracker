import { Routes } from '@angular/router';
import { BookPageComponent } from './components/home/book-page/book-page.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileStatsComponent } from './components/home/profile-stats/profile-stats.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'book/:slug',
        component: BookPageComponent,
      },
      {
        path: 'profile',
        component: ProfileStatsComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LogInComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
