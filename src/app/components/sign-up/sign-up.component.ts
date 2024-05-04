import { Component, OnDestroy, inject } from '@angular/core';
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
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UsersFirebaseService } from '../../services/users-firebase.service';
import { confirmationValidator } from '../../shared/compare-validator.directive';
import { signUp } from '../../store/actions';
import { UserState } from '../../store/user-store/user.reducer';
import { selectSignUp } from '../../store/user-store/user.selectors';
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
export class SignUpComponent implements OnDestroy {
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
      confirmPassword: ['', [Validators.required, confirmationValidator]],
    });
  }

  errorMessage: string | null = null;
  usersFirebaseService = inject(UsersFirebaseService);
  store = inject(Store<UserState>);
  signup$ = this.store.select(selectSignUp);
  signupSubscription$: Subscription | undefined;

  onSubmit(): void {
    if (this.signupForm.valid) {
      // TODO: when this is implememted you need to have a spinner to indicate that the form is being submitted
      console.warn(this.signupForm.value);
      const rawForm = this.signupForm.getRawValue();

      this.store.dispatch(
        signUp({
          email: rawForm.email ?? '',
          username: rawForm.username ?? '',
          password: rawForm.password ?? '',
        })
      );

      this.signupSubscription$ = this.signup$.subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.log('error', error);
          this.errorMessage = error.errorMessage;
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

  ngOnDestroy(): void {
    if (this.signupSubscription$) {
      this.signupSubscription$.unsubscribe();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordConfirm() {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }
}
