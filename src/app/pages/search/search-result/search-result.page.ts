import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { EscortService } from 'src/app/services/escort.service';
import { GuideService } from 'src/app/services/guide.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.page.html',
  styleUrls: ['./search-result.page.scss']
})
export class SearchResultPage implements OnInit {
  route: ActivatedRouteSnapshot;
  searchWord: any;
  type: string;
  girls: any[];
  guides: any[];

  constructor(
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private es: EscortService,
    private gs: GuideService
  ) {
    this.route = this.activatedRoute.snapshot;
    this.searchWord = this.route.params['q'];
    this.type = this.route.params['type'];
  }

  async ngOnInit() {
    if (this.es.escorts.length == 0) {
      await this.es.getEscorts();
    }
    const q = this.searchWord.toLowerCase();
    this.girls = this.es.escorts.filter(e => {
      return (
        (e.name && e.name.toLowerCase().indexOf(q) > -1) || (e.location && e.location.toLowerCase().indexOf(q) > -1)
      );
    });
    const allGuides = await this.gs.getGuides();
    this.guides = allGuides.filter(g => {
      return (
        (g.title && g.title.toLowerCase().indexOf(q)) > -1 ||
        (g.desc && g.desc.toLowerCase().indexOf(q) > -1) ||
        (g.writer && g.writer.toLowerCase().indexOf(q) > -1)
      );
    });
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.cdr.detectChanges();
  }

  back() {
    const type = this.route.params['type'];
    this.router.navigate(['/tabs/search/' + type]);
  }
}
