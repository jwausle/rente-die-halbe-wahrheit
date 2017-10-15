import { Routes } from '@angular/router';

import { AltersrenteComponent } from './rente1/rente1.component';
import { ErwerbsminderungsrenteComponent } from './rente2/rente2.component';
import { HinterbliebenenrenteComponent } from './rente3/rente3.component';
import { AuswertungComponent } from './rentechart/rentechart.component';
import { HomeComponent } from './home/home.component';
import { HinweisComponent } from './hinweis/hinweis.component';
import { RepoBrowserComponent } from './github/repo-browser/repo-browser.component';
import { RepoListComponent } from './github/repo-list/repo-list.component';
import { RepoDetailComponent } from './github/repo-detail/repo-detail.component';
import { ContactComponent } from './contact/contact.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'rente1', component: AltersrenteComponent },
  { path: 'rente2', component: ErwerbsminderungsrenteComponent },
  { path: 'rente3', component: HinterbliebenenrenteComponent },
  { path: 'rentechart', component: AuswertungComponent },
  { path: 'hinweis', component: HinweisComponent }
];

