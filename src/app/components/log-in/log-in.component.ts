import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroEye,
  heroEyeSlash,
  heroLockClosed,
  heroUser,
} from '@ng-icons/heroicons/outline';
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
  viewProviders: [
    provideIcons({ heroUser, heroLockClosed, heroEye, heroEyeSlash }),
  ],
})
export class LogInComponent {
  authService = inject(AuthService);
  router = inject(Router);
  showPassword: boolean = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage: string | null = null;

  onSubmit() {
    // TODO: when this is implememted you need to have a spinner to indicate that the form is being submitted
    const rawForm = this.loginForm.getRawValue();

    this.authService
      .login(rawForm.email ?? '', rawForm.password ?? '')
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage =
            "This email and password combination doesn't exist. Please try again.";
        },
      });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
