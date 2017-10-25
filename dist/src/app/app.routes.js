"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rente1_component_1 = require("./rente1/rente1.component");
var rente2_component_1 = require("./rente2/rente2.component");
var rente3_component_1 = require("./rente3/rente3.component");
var rentechart_component_1 = require("./rentechart/rentechart.component");
var home_component_1 = require("./home/home.component");
var hinweis_component_1 = require("./hinweis/hinweis.component");
exports.rootRouterConfig = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'rente1', component: rente1_component_1.AltersrenteComponent },
    { path: 'rente2', component: rente2_component_1.ErwerbsminderungsrenteComponent },
    { path: 'rente3', component: rente3_component_1.HinterbliebenenrenteComponent },
    { path: 'rentechart', component: rentechart_component_1.AuswertungComponent },
    { path: 'hinweis', component: hinweis_component_1.HinweisComponent }
];
//# sourceMappingURL=app.routes.js.map