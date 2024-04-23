import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  routesLocal = routes.map((route) => route.path);

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSig.set({
          //! is used to assert that the value is not null or undefined, because it is certain that they are set
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    });
  }
}
