export interface FirestoreUser {
  id: string;
  username: string;
  email: string;
  booklist: {
    current: [];
    dnf: [];
    read: [];
    tbr: [];
  };
  profilestats: {
    stats: [];
  };
}
