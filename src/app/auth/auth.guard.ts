import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.user$.pipe(take(1)).subscribe((user) => {
    if (user) {
      authService.currentUserSig.set({
        email: user.email!,
        username: user.displayName!,
      });
    } else {
      authService.currentUserSig.set(null);
    }

    console.log('app: ', authService.currentUserSig());

    if (!user) {
      console.log('Not logged in');
      console.log('Credentials: ', authService.currentUserSig());
      router.navigate(['/login']);
    } else {
      console.log('Logged in');
      router.navigate(['/home']);
    }
  });

  return true;
};
