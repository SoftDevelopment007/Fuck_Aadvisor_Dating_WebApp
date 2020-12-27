export class User {
  uid: string;
  type: string;
  lang: string;
  avatar_url: string;
  email: string;
  username: string;
  name: string;
  escortId: string;

  constructor() {
    this.type = 'user';
    this.lang = 'en';
  }
}
