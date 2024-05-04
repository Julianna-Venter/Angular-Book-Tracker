import { Component, OnDestroy, inject } from '@angular/core';
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
import { Subscription } from 'rxjs';
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
export class LogInComponent implements OnDestroy {
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
  loginSubscription$: Subscription | undefined;

  errorMessage: string | null = null;

  onSubmit() {
    // TODO: when this is implememted you need to have a spinner to indicate that the form is being submitted
    const rawForm = this.loginForm.getRawValue();
    this.store.dispatch(
      login({ email: rawForm.email ?? '', password: rawForm.password ?? '' })
    );

    this.loginSubscription$ = this.login$.subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log('error', error);
        this.errorMessage = error.errorMessage;
      },
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy(): void {
    if (this.loginSubscription$) {
      this.loginSubscription$.unsubscribe();
    }
  }
}
