import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { take } from 'rxjs/operators';
import { UsersFirebaseService } from '../services/users-firebase.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const usersFirebaseService = inject(UsersFirebaseService);

  authService.user$.pipe(take(1)).subscribe((user) => {
    if (user) {
      authService.currentUserSig.set({
        email: user.email!,
        username: user.displayName!,
      });
    } else {
      authService.currentUserSig.set(null);
    }

    if (!user) {
      router.navigate(['/login']);
      return false;
    } else {
      router.navigate(['/home']);
      authService.isUserSet$.next(true);
      return true;
    }
  });

  return true;
};
