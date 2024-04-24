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
  heroCheckBadge,
  heroEye,
  heroEyeSlash,
  heroLockClosed,
  heroUser,
} from '@ng-icons/heroicons/outline';
import { AuthService } from '../../services/auth.service';
import { confirmPasswordValidator } from '../../shared/compare-validator.directive';
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

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = true;
  showPasswordConfirm: boolean = true;

  signupForm = new FormGroup({
    username: new FormControl(this.username, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(24),
    ]),
    email: new FormControl(this.email, [Validators.required, Validators.email]),
    password: new FormControl(this.password, [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl(this.confirmPassword, [
      Validators.required,
      confirmPasswordValidator('password', 'confirmPassword'),
    ]),
  });

  errorMessage: string | null = null;

  onSubmit() {
    // TODO: when this is implememted you need to have a spinner to indicate that the form is being submitted
    console.warn(this.signupForm.value);
    const rawForm = this.signupForm.getRawValue();

    this.authService
      .register(
        rawForm.email ?? '',
        rawForm.username ?? '',
        rawForm.password ?? ''
      )
      .subscribe({
        next: () => {
          console.log('User created');
          // this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage = error.code;
        },
      });
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
