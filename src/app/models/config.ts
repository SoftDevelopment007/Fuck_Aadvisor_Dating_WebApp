export interface Config {
  areas: Array<any>;
  categories: Array<any>;
  country: string;
  countryList: Array<any>;
  ethnicities: Array<any>;
  documents: Array<any>;
  suburbs: string;
  upgrades: Upgrades;
  banners: Array<string>;
  blocked_words: string;
}

export interface Upgrades {
  category: any;
  ethnicity: any;
  gold: any;
  listing: any;
  location: any;
}
