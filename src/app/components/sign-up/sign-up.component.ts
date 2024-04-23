import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroCheckBadge,
  heroLockClosed,
  heroUser,
} from '@ng-icons/heroicons/outline';
import { AuthService } from '../../services/auth.service';
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
  viewProviders: [provideIcons({ heroUser, heroLockClosed, heroCheckBadge })],
})
export class SignUpComponent {
  authService = inject(AuthService);
  router = inject(Router);

  signupForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
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
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage = error.code;
        },
      });
  }

  //API for the searching:
  //https://openlibrary.org/search.json?q=harry+potter
  //API for the cover image, using the cover key
  //https://covers.openlibrary.org/b/olid/OL21058613M.jpg
}
