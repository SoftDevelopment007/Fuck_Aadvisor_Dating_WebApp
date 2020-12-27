import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
  route: ActivatedRouteSnapshot;
  type: string;
  searchWord: any;
  recentSearches: any[];
  topSearches: any[];
  userId: string;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: StorageService,
    private ds: DataService
  ) {
    this.route = this.activatedRoute.snapshot;
  }

  ngOnInit() {
    this.storage.getItem('user').then(res => {
      if (res) {
        const user = JSON.parse(res);
        this.userId = user.uid;
        this.ds.getUserSearches(this.userId).subscribe(searches => {
          this.recentSearches = searches;
        });
        this.ds.getTopSearches().subscribe(res => {
          this.topSearches = res;
        });
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  back() {
    const href = '/tabs/' + (this.ds.routes.search || 'home');
    this.router.navigate([href]);
  }

  goSearchResult(search: string) {
    if (!search || !this.userId) return;
    this.ds.addUserSearch(this.userId, search);
    const type = this.route.params['type'];
    this.router.navigate(['/tabs/search-result/' + type, { q: search }]);
  }

  clearRecentSearches() {
    const searches = [...this.recentSearches];
    if (this.userId) {
      this.ds.clearRecentSearches(this.userId, searches);
      this.recentSearches = [];
    }
  }
}
