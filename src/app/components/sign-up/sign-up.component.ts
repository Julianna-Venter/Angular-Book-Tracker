import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroCheckBadge,
  heroEye,
  heroEyeSlash,
  heroLockClosed,
  heroUser,
} from '@ng-icons/heroicons/outline';
import { take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UsersFirebaseService } from '../../services/users-firebase.service';
import { confirmationValidator } from '../../shared/compare-validator.directive';
import { BackgroundComponent } from '../shared-components/background/background.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BackgroundComponent,
    NgIconComponent,
    RouterLink,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  viewProviders: [
    provideIcons({
      heroUser,
      heroLockClosed,
      heroCheckBadge,
      heroEye,
      heroEyeSlash,
    }),
  ],
})
export class SignUpComponent {
  authService = inject(AuthService);
  router = inject(Router);

  showPassword: boolean = true;
  showPasswordConfirm: boolean = true;
  passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  signupForm: FormGroup<{
    username: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {
    this.signupForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(24),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.passwordRegex),
        ],
      ],
      confirmPassword: ['', [Validators.required, confirmationValidator]], // Use the imported custom validator
    });
  }

  errorMessage: string | null = null;
  usersFirebaseService = inject(UsersFirebaseService);

  onSubmit(): void {
    if (this.signupForm.valid) {
      const rawForm = this.signupForm.getRawValue();

      this.authService
        .register(
          rawForm.email ?? '',
          rawForm.username ?? '',
          rawForm.password ?? ''
        )
        .pipe(take(2))
        .subscribe({
          next: () => {
            this.usersFirebaseService.addUser(rawForm.username, rawForm.email);
            this.router.navigate(['/home']);
          },
          error: (error) => {
            this.errorMessage = error.code;
          },
        });
    } else {
      Object.entries(this.signupForm.controls).forEach(([key, control]) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  togglePasswordConfirm() {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }

  //API for the searching:
  //https://openlibrary.org/search.json?q=harry+potter
  //API for the cover image, using the cover key
  //https://covers.openlibrary.org/b/olid/OL21058613M.jpg
}
