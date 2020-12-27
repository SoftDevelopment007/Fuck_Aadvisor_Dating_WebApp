import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'girls',
        loadChildren: () => import('../girls/girls.module').then(m => m.GirlsPageModule)
      },
      {
        path: 'guides',
        loadChildren: () => import('../guides/guides.module').then(m => m.GuidesPageModule)
      },
      {
        path: 'saved',
        loadChildren: () => import('../saved/saved.module').then(m => m.SavedPageModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectToLogin }
      },
      {
        path: 'manage',
        loadChildren: () => import('../manage/manage.module').then(m => m.ManagePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectToLogin }
      },
      {
        path: 'escort',
        loadChildren: () => import('../escort/escort-become.module').then(m => m.EscortBecomePageModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectToLogin }
      },
      {
        path: 'contact',
        loadChildren: () => import('../contact/contact.module').then(m => m.ContactPageModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectToLogin }
      },
      {
        path: 'search/:type',
        loadChildren: () => import('../search/search.module').then(m => m.SearchPageModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectToLogin }
      },
      {
        path: 'search-result/:type',
        loadChildren: () => import('../search/search-result/search-result.module').then(m => m.SearchResultPageModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectToLogin }
      },
      {
        path: 'translation-setting',
        loadChildren: () =>
          import('../translation-setting/translation-setting.module').then(m => m.TranslationSettingPageModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectToLogin }
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
