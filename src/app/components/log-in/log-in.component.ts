import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroLockClosed, heroUser } from '@ng-icons/heroicons/outline';
import { AuthService } from '../../services/auth.service';
import { BackgroundComponent } from '../shared-components/background/background.component';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BackgroundComponent,
    NgIconComponent,
    RouterLink,
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  viewProviders: [provideIcons({ heroUser, heroLockClosed })],
})
export class LogInComponent {
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  errorMessage: string | null = null;

  onSubmit() {
    // TODO: when this is implememted you need to have a spinner to indicate that the form is being submitted
    console.log(this.loginForm.value);
    const rawForm = this.loginForm.getRawValue();

    this.authService
      .login(rawForm.email ?? '', rawForm.password ?? '')
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage = error.code;
        },
      });
  }
}
