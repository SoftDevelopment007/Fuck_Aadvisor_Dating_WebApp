import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(public storage: Storage) {}

  async getItem(name) {
    return await this.storage.get(name);
  }

  setItem(name: string, value: string) {
    return this.storage.set(name, value);
  }

  clearItem() {
    this.storage.clear();
  }
}
