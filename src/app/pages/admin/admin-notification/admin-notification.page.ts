import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.page.html',
  styleUrls: ['./admin-notification.page.scss']
})
export class AdminNotificationPage implements OnInit {
  message: any;

  constructor(private auth: AuthService, private ds: DataService) {}

  ngOnInit() {
    if (!this.auth.faUserId) {
      this.auth.getFuckUsers();
    }
  }

  sendMessage(type: string) {
    console.log(type, this.message);
    if (!this.auth.faUserId || !this.message) return;
    this.ds.sendAdminMessage(this.message, type);
    this.message = '';
  }
}
