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
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { login } from '../../store/actions';
import { UserState } from '../../store/user-store/user.reducer';
import {
  selectLogin,
  selectgetUserData,
} from '../../store/user-store/user.selectors';
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

  store = inject(Store<UserState>);
  login$ = this.store.select(selectLogin);
  userData$ = this.store.select(selectgetUserData);

  errorMessage: string | null = null;

  constructor() {}

  onSubmit() {
    // TODO: when this is implememted you need to have a spinner to indicate that the form is being submitted
    const rawForm = this.loginForm.getRawValue();
    this.store.dispatch(
      login({ email: rawForm.email ?? '', password: rawForm.password ?? '' })
    );

    this.login$.subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log('error', error);
        this.errorMessage = error.errorMessage;
      },
    });
  }

  // this.authService
  //   .login(rawForm.email ?? '', rawForm.password ?? '')
  //   .subscribe({
  //     next: () => {
  //       this.router.navigate(['/home']);
  //     },
  //     error: (error) => {
  //       this.errorMessage =
  //         "This email and password combination doesn't exist. Please try again.";
  //     },
  //   });

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}

// onSubmit(username: string, password: string) {
//   store.dispatch(login({ username: username, password: password }));
// }
