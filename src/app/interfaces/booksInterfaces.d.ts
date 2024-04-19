export interface CompleteUserData {
  user: User;
  bookList: BookList[];
  profileStats: ProfileStats[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface BookList {
  id: string;
}

export interface ProfileStats {
  id: string;
  pages: number[];
}
