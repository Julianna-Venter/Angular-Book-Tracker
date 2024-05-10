import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowRightOnRectangleSolid } from '@ng-icons/heroicons/solid';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-log-out',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.scss',
  viewProviders: [provideIcons({ heroArrowRightOnRectangleSolid })],
})
export class LogOutComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logOut() {
    localStorage.clear;
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
