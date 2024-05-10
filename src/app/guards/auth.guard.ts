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
        //! is added because it is pretty much guaranteed that the user is logged in at this point
        email: user.email ?? '',
        username: user.displayName ?? '',
      });
    } else {
      authService.currentUserSig.set(null);
    }

    if (!user) {
      router.navigate(['/login']);
      return false;
    } else {
      router.navigate(['/home/profile']);
      authService.isUserSet$.next(true);
      return true;
    }
  });

  return true;
};
