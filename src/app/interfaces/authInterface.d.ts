import { UsableBooks } from './booksInterfaces';

export interface AuthUser {
  email: string;
  username: string;
}

export interface UserResponse {
  booklist: {
    reading: UsableBooks[];
    dnf: UsableBooks[];
    read: UsableBooks[];
    tbr: UsableBooks[];
  };
  email: string;
  profilestats: {
    stats: Array<string>;
  };
  username: string;
  id: string;
}

export interface StatsResponse {
  id: string;
  readBooks: number;
  reviewsMade: number;
  pagesTotal: number;
  ratings: number[];
  averageRating: number;
  character: number;
  plot: number;
  tense: number;
  lighthearted: number;
  pace: number[];
  length: number[];
  dark: number;
  light: number;
  dnf: number;
  informative: number;
  fun: number;
  adventurous: number;
  grounded: number;
  reflective: number;
  action: number;
}
