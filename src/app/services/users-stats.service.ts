import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FirestoreUser } from '../interfaces/booksInterfaces';
import { UserCalcStats } from '../interfaces/chartsInterface';

@Injectable({
  providedIn: 'root',
})
export class UsersStatsService {
  calculateStats(user: FirestoreUser): Observable<UserCalcStats> {
    let calcStats: UserCalcStats = {
      booksread: 0,
      howManyReviews: 0,
      averageRating: 0,
      totalPages: 0,
      OneStarReviews: 0,
      TwoStarReviews: 0,
      ThreeStarReviews: 0,
      FourStarReviews: 0,
      FiveStarReviews: 0,
      slowPaced: 0,
      fastPaced: 0,
      moderatePaced: 0,
      longBooks: 0,
      shortBooks: 0,
      mediumBooks: 0,
      character: 0,
      plot: 0,
      tense: 0,
      lighthearted: 0,
      dark: 0,
      light: 0,
      informative: 0,
      fun: 0,
      adventurous: 0,
      grounded: 0,
      reflective: 0,
      action: 0,
      DNF: 0,
    };

    let totalRating = 0;
    let totalBooks = 0;

    if (user.booklist) {
      const readArray = Object.values(user.booklist.read);
      const readingArray = Object.values(user.booklist.reading);
      const dnfArray = Object.values(user.booklist.dnf);
      const tbrArray = Object.values(user.booklist.tbr);

      const allBooks = [
        ...readArray,
        ...readingArray,
        ...dnfArray,
        ...tbrArray,
      ];

      //books read and reviews made
      calcStats.booksread += allBooks.length;
      calcStats.howManyReviews += user.booklist.read.length;

      //total pages
      totalBooks += allBooks.length;
      calcStats.totalPages += allBooks.reduce(
        (acc, book) => acc + book.pageCount,
        0
      );

      //total ratings
      totalRating += allBooks.reduce((acc, book) => acc + book.rating, 0);

      //individual ratings
      calcStats.OneStarReviews += allBooks.filter(
        (book) => book.rating === 1 || book.rating === 0 || book.rating === 1.5
      ).length;
      calcStats.TwoStarReviews += allBooks.filter(
        (book) => book.rating === 2 || book.rating === 2.5
      ).length;
      calcStats.ThreeStarReviews += allBooks.filter(
        (book) => book.rating === 3 || book.rating === 3.5
      ).length;
      calcStats.FourStarReviews += allBooks.filter(
        (book) => book.rating === 4 || book.rating === 4.5
      ).length;
      calcStats.FiveStarReviews += allBooks.filter(
        (book) => book.rating === 5
      ).length;

      //Pace
      calcStats.slowPaced += allBooks.filter((book) => book.pace <= 33).length;
      calcStats.fastPaced += allBooks.filter((book) => book.pace > 66).length;
      calcStats.moderatePaced += allBooks.filter(
        (book) => book.pace > 33 && book.pace <= 66
      ).length;

      //Length
      calcStats.longBooks += allBooks.filter(
        (book) => book.pageCount > 500
      ).length;
      calcStats.shortBooks += allBooks.filter(
        (book) => book.pageCount <= 300
      ).length;
      calcStats.mediumBooks += allBooks.filter(
        (book) => book.pageCount > 300 && book.pageCount <= 500
      ).length;

      // Character_plot
      calcStats.character =
        (allBooks.filter((book) => book.character_plot <= 50).length /
          totalBooks) *
        100;
      calcStats.plot =
        (allBooks.filter((book) => book.character_plot > 50).length /
          totalBooks) *
        100;

      // Tense_lighthearted
      calcStats.tense =
        (allBooks.filter((book) => book.tense_lighthearted <= 50).length /
          totalBooks) *
        100;
      calcStats.lighthearted =
        (allBooks.filter((book) => book.tense_lighthearted > 50).length /
          totalBooks) *
        100;

      // Dark_light
      calcStats.dark =
        (allBooks.filter((book) => book.dark_light <= 50).length / totalBooks) *
        100;
      calcStats.light =
        (allBooks.filter((book) => book.dark_light > 50).length / totalBooks) *
        100;

      // Informative_fun
      calcStats.informative =
        (allBooks.filter((book) => book.informative_fun <= 50).length /
          totalBooks) *
        100;
      calcStats.fun =
        (allBooks.filter((book) => book.informative_fun > 50).length /
          totalBooks) *
        100;

      // Adventurous_grounded
      calcStats.adventurous =
        (allBooks.filter((book) => book.adventurous_grounded <= 50).length /
          totalBooks) *
        100;
      calcStats.grounded =
        (allBooks.filter((book) => book.adventurous_grounded > 50).length /
          totalBooks) *
        100;

      // Reflective_action
      calcStats.reflective =
        (allBooks.filter((book) => book.reflective_action <= 50).length /
          totalBooks) *
        100;
      calcStats.action =
        (allBooks.filter((book) => book.reflective_action > 50).length /
          totalBooks) *
        100;

      //DNF
      calcStats.DNF += user.booklist.dnf.length;
    }

    //average rating
    if (totalBooks !== 0) {
      calcStats.averageRating = Math.ceil(totalRating / totalBooks);
    } else {
      calcStats.averageRating = 0;
    }

    return of(calcStats);
  }
}

// export interface UserCalcStats {
//   booksread: number; done
//   howManyReviews: number; done
//   averageRating: number; done
//   totalPages: number; done
//   OneStarReviews: number;done
//   TwoStarReviews: number;done
//   ThreeStarReviews: number;done
//   FourStarReviews: number;done
//   FiveStarReviews: number;done
//   slowPaced: number;
//   fastPaced: number;
//   moderatePaced: number;
//   longBooks: number;
//   shortBooks: number;
//   mediumBooks: number;
//   character: number;
//   plot: number;
//   tense: number;
//   lighthearted: number;
//   dark: number;
//   light: number;
//   informative: number;
//   fun: number;
//   adventurous: number;
//   grounded: number;
//   reflective: number;
//   action: number;
//   DNF: number;
// }
