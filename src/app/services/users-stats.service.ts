import { Injectable } from '@angular/core';
import { UserResponse } from '../interfaces/authInterface';

@Injectable({
  providedIn: 'root',
})
export class UsersStatsService {
  constructor() {}

  calculateUserStats(usaerData: UserResponse) {}

  pace() {
    let slow: number = 0;
    let moderate: number = 0;
    let fast: number = 0;
  }

  length() {
    let long: number = 0;
    let medium: number = 0;
    let short: number = 0;
  }

  ratingArray() {}

  moodStats() {}
}
