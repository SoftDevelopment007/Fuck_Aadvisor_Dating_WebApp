export class Country {
  code: string;
  name: string;
  color: string;

  constructor(code = '', name = '', color = 'primary') {
    this.code = code;
    this.name = name;
    this.color = color;
  }
}
