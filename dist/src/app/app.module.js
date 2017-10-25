"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/http");
var ng2_split_pane_1 = require("ng2-split-pane/lib/ng2-split-pane");
var ngx_charts_1 = require("@swimlane/ngx-charts");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var app_routes_1 = require("./app.routes");
var app_component_1 = require("./app.component");
var github_service_1 = require("./github/shared/github.service");
var rente1_component_1 = require("./rente1/rente1.component");
var rente2_component_1 = require("./rente2/rente2.component");
var rente3_component_1 = require("./rente3/rente3.component");
var rentechart_component_1 = require("./rentechart/rentechart.component");
var home_component_1 = require("./home/home.component");
var repo_browser_component_1 = require("./github/repo-browser/repo-browser.component");
var repo_list_component_1 = require("./github/repo-list/repo-list.component");
var repo_detail_component_1 = require("./github/repo-detail/repo-detail.component");
var contact_component_1 = require("./contact/contact.component");
var hinweis_component_1 = require("./hinweis/hinweis.component");
var person_dao_1 = require("./data/person.dao");
var steuer_dao_1 = require("./data/steuer.dao");
var versicherung_dao_1 = require("./data/versicherung.dao");
var altersrente_dao_1 = require("./rente1/altersrente.dao");
var erwerbsminderungsrente_dao_1 = require("./rente2/erwerbsminderungsrente.dao");
var hinterbliebenenrente_dao_1 = require("./rente3/hinterbliebenenrente.dao");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                rente1_component_1.AltersrenteComponent,
                rente2_component_1.ErwerbsminderungsrenteComponent,
                rente3_component_1.HinterbliebenenrenteComponent,
                rentechart_component_1.AuswertungComponent,
                repo_browser_component_1.RepoBrowserComponent,
                repo_list_component_1.RepoListComponent,
                repo_detail_component_1.RepoDetailComponent,
                home_component_1.HomeComponent,
                contact_component_1.ContactComponent,
                hinweis_component_1.HinweisComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                ng2_split_pane_1.SplitPaneModule,
                ngx_charts_1.NgxChartsModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                router_1.RouterModule.forRoot(app_routes_1.rootRouterConfig, { useHash: true })
            ],
            providers: [
                github_service_1.GithubService,
                person_dao_1.PersonDao,
                steuer_dao_1.SteuerDao,
                versicherung_dao_1.VersicherungDao,
                altersrente_dao_1.AltersrenteDao,
                erwerbsminderungsrente_dao_1.ErwerbsminderungsRenteDao,
                hinterbliebenenrente_dao_1.HinterbliebenenRenteDao
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map