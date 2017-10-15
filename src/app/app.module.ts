import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { SplitPaneModule } from 'ng2-split-pane/lib/ng2-split-pane';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { GithubService } from './github/shared/github.service';
import { AltersrenteComponent } from './rente1/rente1.component';
import { ErwerbsminderungsrenteComponent } from './rente2/rente2.component';
import { HinterbliebenenrenteComponent } from './rente3/rente3.component';
import { AuswertungComponent } from './rentechart/rentechart.component';
import { HomeComponent } from './home/home.component';
import { RepoBrowserComponent } from './github/repo-browser/repo-browser.component';
import { RepoListComponent } from './github/repo-list/repo-list.component';
import { RepoDetailComponent } from './github/repo-detail/repo-detail.component';
import { ContactComponent } from './contact/contact.component';
import { HinweisComponent } from './hinweis/hinweis.component';

import { PersonDao } from './data/person.dao';
import { SteuerDao } from './data/steuer.dao';
import { VersicherungDao } from './data/versicherung.dao';
import { AltersrenteDao } from './rente1/altersrente.dao';
import { ErwerbsminderungsRenteDao } from './rente2/erwerbsminderungsrente.dao';
import { HinterbliebenenRenteDao } from './rente3/hinterbliebenenrente.dao';

@NgModule({
  declarations: [
    AppComponent,
    AltersrenteComponent,
    ErwerbsminderungsrenteComponent,
    HinterbliebenenrenteComponent,
    AuswertungComponent,
    RepoBrowserComponent,
    RepoListComponent,
    RepoDetailComponent,
    HomeComponent,
    ContactComponent,
    HinweisComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SplitPaneModule,
    NgxChartsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [
    GithubService,
    PersonDao,
    SteuerDao,
    VersicherungDao,
    AltersrenteDao,
    ErwerbsminderungsRenteDao,
    HinterbliebenenRenteDao
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
