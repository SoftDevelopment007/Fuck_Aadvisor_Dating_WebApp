import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-escort-complete',
  templateUrl: './escort-complete.page.html',
  styleUrls: ['./escort-complete.page.scss']
})
export class EscortCompletePage implements OnInit {
  showPhone = false;

  constructor(private router: Router, public ds: DataService) {
    if (this.ds.escort && !this.ds.escort.name) {
      this.router.navigate(['tabs/home']);
    }
  }

  ngOnInit() {
    this.showPhone = false;
  }

  togglePhone() {
    this.showPhone = !this.showPhone;
  }
}
