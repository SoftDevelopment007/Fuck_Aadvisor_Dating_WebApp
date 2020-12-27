export class EscortUpgrades {
  gold: EscortUpgrade;
  listing: EscortUpgrade;
  location: EscortUpgrade;
  ethnicity: EscortUpgrade;
  category: Array<EscortUpgrade>;

  constructor() {
    this.gold = new EscortUpgrade(true, 2, 1, 12);
    this.listing = new EscortUpgrade();
    this.location = new EscortUpgrade();
    this.ethnicity = new EscortUpgrade();
    this.category = new Array(new EscortUpgrade());
  }
}

export class EscortUpgrade {
  status: boolean;
  index: number;
  value: number;
  months: number;

  constructor(status = false, index = 1, value = 1, months = 1) {
    this.status = status;
    this.index = index;
    this.value = value;
    this.months = months;
  }
}
