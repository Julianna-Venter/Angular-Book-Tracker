import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroChartPie,
  heroChevronDoubleLeft,
  heroHome,
  heroMagnifyingGlass,
  heroPlus,
} from '@ng-icons/heroicons/outline';
import { heroChartPieSolid, heroHomeSolid } from '@ng-icons/heroicons/solid';
import { UsersFirebaseService } from '../../services/users-firebase.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIconComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  viewProviders: [
    provideIcons({
      heroHomeSolid,
      heroHome,
      heroPlus,
      heroChartPieSolid,
      heroChartPie,
      heroMagnifyingGlass,
      heroChevronDoubleLeft,
    }),
  ],
})
export class HomeComponent implements OnInit {
  homeIcon = 'heroHome';
  pieIcon = 'heroChartPie';

  usersFirebaseService = inject(UsersFirebaseService);

  user: any;

  ngOnInit(): void {
    console.log('HomeComponent initialized');

    // this.usersFirebaseService
    //   .getUsers()
    //   .pipe(
    //     switchMap((users) => {
    //       this.user = users[0];
    //       console.log(this.user);
    //       return this.usersFirebaseService.getBookList(this.user.id);
    //     })
    //   )
    //   .subscribe((bookList) => {
    //     console.log(bookList);
    //   });

    this.usersFirebaseService
      .getCompleteUserData('jules-testing')
      .subscribe((user) => {
        console.log(user);
      });
  }
}
