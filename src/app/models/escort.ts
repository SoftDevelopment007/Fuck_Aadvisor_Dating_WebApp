export class Escort {
  created_at: string;
  updated_at: string;
  lname: string;
  name: string;
  age: number;
  index: number;
  phone: string;
  certification: string;
  image: Array<string>;
  video: string;
  pro: any;
  writer: any;
  ethnic: string;
  category: Array<string>;
  location: string;
  address: string;
  area: string;
  suburbs: string;
  desc: string;
  services: Array<any>;
  schedules: Array<Schedule>;
  items: Array<any>;
  cash: Cash;
  status: string;
  type: string;
  gold: boolean;
  topListing: boolean;
  rate: Rate;
  lat: any;
  long: any;
  contactStatus: boolean;
  online: boolean;
  usage: number;
  edit: boolean;

  constructor() {
    this.age = 18;
    this.index = -1;
    this.image = [];
    this.ethnic = 'Asian(NZ)';
    this.pro = '';
    this.certification = '';
    this.writer = '';
    this.area = '';
    this.category = [];
    this.services = [
      { status: true, name: '', price: '' },
      { status: false, name: '', price: '' },
      { status: false, name: '', price: '' },
      { status: false, name: '', price: '' },
      { status: false, name: '', price: '' }
    ];
    this.schedules = [
      { name: 'Sunday', from: '', to: '' },
      { name: 'Monday', from: '', to: '' },
      { name: 'Tuesday', from: '', to: '' },
      { name: 'Wednesday', from: '', to: '' },
      { name: 'Thursday', from: '', to: '' },
      { name: 'Friday', from: '', to: '' },
      { name: 'Saturday', from: '', to: '' }
    ];
    this.items = [];
    this.cash = {
      name: '',
      phone: ''
    };
    this.status = 'pending';
    this.type = 'newest';
    this.gold = true;
    this.topListing = false;
    this.rate = {
      room: '',
      cleaning: '',
      gst: 0
    };
    this.contactStatus = false;
    this.online = true;
    this.usage = 0;
    this.edit = false;
  }
}

export interface Schedule {
  name: string;
  from: string;
  to: string;
}

export interface Cash {
  name: string;
  phone: string;
}

export interface Rate {
  room: string;
  cleaning: string;
  gst: number;
}
