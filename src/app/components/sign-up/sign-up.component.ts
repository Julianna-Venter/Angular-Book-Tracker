import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroCheckBadge,
  heroLockClosed,
  heroUser,
} from '@ng-icons/heroicons/outline';
import { BackgroundComponent } from '../shared-components/background/background.component';
import { RouterLink } from '@angular/router';
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
  signupForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.signupForm.value);
  }

  //API for the searching:
  //https://openlibrary.org/search.json?q=harry+potter
  //API for the cover image, using the cover key
  //https://covers.openlibrary.org/b/olid/OL21058613M.jpg
}
