export interface AuthUser {
  email: string;
  username: string;
}

export interface UserResponse {
  booklist: {
    current: Array<string>;
    dnf: Array<string>;
    read: Array<string>;
    tbr: Array<string>;
  };
  email: string;
  profilestats: {
    stats: Array<string>;
  };
  username: string;
}
