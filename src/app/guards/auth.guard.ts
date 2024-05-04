import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService();
  const router = new Router();

  return authService.user$.pipe(
    take(1),
    map((user) => {
      if (!user) {
        router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    })
  );
};
