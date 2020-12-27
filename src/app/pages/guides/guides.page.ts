import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { EscortService } from '../../services/escort.service';
import { GuideService } from '../../services/guide.service';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.page.html',
  styleUrls: ['./guides.page.scss']
})
export class GuidesPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  mode: string = 'top';
  p = [1, 1, 1, 1];
  pn: number = 5;
  guides: any[];
  topGuides: any[];
  localGuides: any[];
  regGuides: any[];
  worldGuides: any[];

  constructor(private router: Router, private auth: AuthService, private es: EscortService, private gs: GuideService) {
    this.pn = 5;
  }

  ngOnInit() {
    this.mode = 'top';
  }

  ionViewWillEnter() {
    this.loadGuides();
  }

  async loadGuides() {
    this.guides = [];
    let allGuides = await this.gs.getGuides();
    await this.gs.getSavedGuides();
    allGuides.forEach(guide => {
      if (guide && guide.escort) {
        let escort = this.es.escorts.filter(e => e.index == guide.escort);
        guide.escortInfo = escort[0] || {};
      }
      this.guides.push(guide);
    });

    this.topGuides = this.guides.filter(g => g.top && g.country == 'Auckland');
    this.topGuides = this.sortByDate(this.topGuides, 'updated_at');

    this.localGuides = this.guides.filter(g => g.country == 'Auckland');
    this.localGuides = this.sortByDate(this.localGuides, 'created_at');

    let top_guides = this.guides.filter((g: any) => g.top);
    this.worldGuides = this.sortByDate(top_guides, 'created_at');
    this.regGuides = this.worldGuides.filter(g => g.country == 'Auckland' || g.country == 'Sydney');
  }

  private sortByDate(data: any, field: string) {
    return data.sort((a, b) => +new Date(b[field]) - +new Date(a[field]));
  }

  postGuide(ev: any) {
    if (this.auth.authUser) {
      const mail = 'team@fuckadvisor.com';
      const subject = 'Post%20a%20Guide';
      let body = '[Title]%0D%0A[Shop Name]%0D%0A[Location]%0D%0A';
      body += '[Number of Escorts]%0D%0A%0D%0A';
      body += '[Escort Name]%0D%0A[Age]%0D%0A';
      body += '[Looks]%20#/5%0D%0A[Body]%20#/5%0D%0A[Services]%20#/5%0D%0A%0D%0A';
      body += '[Cost]%0D%0A[Review]%0D%0A%0D%0A[Link]';
      window.open(`mailto:${mail}?subject=${subject}&body=${body}`, '_system');
    } else {
      this.router.navigate(['login']);
    }
  }

  pageChange(ev: any, index: number) {
    this.p[index] = ev;
    this.content.scrollToTop(300);
  }
}
