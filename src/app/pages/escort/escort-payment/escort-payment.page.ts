import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { EscortService } from 'src/app/services/escort.service';

@Component({
  selector: 'app-escort-payment',
  templateUrl: './escort-payment.page.html',
  styleUrls: ['./escort-payment.page.scss']
})
export class EscortPaymentPage implements OnInit {
  activePayment: any = 'cash';

  constructor(
    private router: Router,
    private app: AppService,
    private auth: AuthService,
    public ds: DataService,
    private es: EscortService
  ) {}

  async ngOnInit() {
    this.activePayment = 'cash';
    this.ds.escort.topListing = this.ds.upgrades.listing.status;
  }

  updatePayment(type: string) {
    this.activePayment = type;
  }

  complete() {
    let phone = this.ds.escort.cash.phone;
    let reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone && phone.length == 12 && phone.match(reg)) {
      if (this.ds.writerService.status) this.ds.escort.desc = this.ds.writerService.desc;
      if (this.ds.escort.edit) {
        this.es.addEscortEditData(this.ds.escort, this.ds.upgrades);
      } else {
        this.ds.escort.index = this.app.generateEscortId();
        console.log(this.ds.escort);
        this.es.addEscort(this.ds.escort);
        this.es.addEscortUpgrades(this.ds.escort.index, this.ds.upgrades);
        this.auth.updateEscortId(this.ds.escort.index);
      }
      this.router.navigate(['tabs/escort/complete']);
    } else {
      let message = 'Please input valid phone number';
      this.app.showInvalidMsg(message);
    }
  }
}
