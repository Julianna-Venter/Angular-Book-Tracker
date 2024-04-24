import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { BookListComponent } from './components/home/book-list/book-list.component';
import { BookPageComponent } from './components/home/book-page/book-page.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileStatsComponent } from './components/home/profile-stats/profile-stats.component';
import { SummariesComponent } from './components/home/summaries/summaries.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        component: SummariesComponent,
      },
      {
        path: 'book-list/:id',
        component: BookListComponent,
      },
      {
        path: 'book-list/:id/book/:id',
        component: BookPageComponent,
      },
      {
        path: 'book/:id',
        component: BookPageComponent,
      },
      {
        path: 'profile',
        component: ProfileStatsComponent,
      },
      {
        path: '',
        redirectTo: 'summaries',
        pathMatch: 'full',
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
