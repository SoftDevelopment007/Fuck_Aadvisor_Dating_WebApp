import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  noTabPages = [];

  constructor(private router: Router, private platform: Platform, private ds: DataService) {
    this.noTabPages = ['escort', 'contact'];
    this.platform.ready().then(() => {
      this.navEvents();
    });
  }

  public hideTabs() {
    const tabBar = document.getElementById('fuckTabBar');
    if (tabBar && tabBar.style.display !== 'none') {
      tabBar.style.display = 'none';
    }
  }

  public showTabs() {
    const tabBar = document.getElementById('fuckTabBar');
    if (tabBar && tabBar.style.display !== 'flex') {
      tabBar.style.display = 'flex';
    }
  }

  private navEvents() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.showHideTabs(e);
    });
  }

  private showHideTabs(e: any) {
    const urlArray = e.url.split('/');
    if (urlArray.length > 1 && urlArray[1] === 'admin') {
      this.ds.admin.status = true;
    } else {
      this.ds.admin.status = false;
    }
    if (urlArray.length >= 3) {
      let shouldHide = true;
      if (urlArray.length === 3 && urlArray[1] === 'tabs' && this.noTabPages.indexOf(urlArray[2]) < 0) {
        shouldHide = false;
      }
      try {
        setTimeout(() => (shouldHide ? this.hideTabs() : this.showTabs()), 300);
      } catch (err) {}
    }
  }
}
