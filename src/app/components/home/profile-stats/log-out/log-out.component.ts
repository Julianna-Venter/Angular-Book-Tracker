import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  standalone: true,
  imports: [],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.scss',
})
export class LogOutComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logOut() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/log-in']);
    });
  }
}
