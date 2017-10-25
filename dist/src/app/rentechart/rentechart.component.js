"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var hinterbliebenenrente_dao_1 = require("./../rente3/hinterbliebenenrente.dao");
var erwerbsminderungsrente_dao_1 = require("./../rente2/erwerbsminderungsrente.dao");
var altersrente_dao_1 = require("./../rente1/altersrente.dao");
var core_1 = require("@angular/core");
var person_dao_1 = require("../data/person.dao");
var AuswertungComponent = /** @class */ (function () {
    function AuswertungComponent(personDao, //
        altersrenteDao, //
        erwerbsminderungsDao, //
        hinterbliebenenDao) {
        this.personDao = personDao;
        this.altersrenteDao = altersrenteDao;
        this.erwerbsminderungsDao = erwerbsminderungsDao;
        this.hinterbliebenenDao = hinterbliebenenDao;
        this.view = [700, 400];
        // options
        this.showXAxis = false;
        this.showYAxis = false;
        this.gradient = false;
        this.showLegend = false;
        this.showXAxisLabel = false;
        this.xAxisLabel = 'Country';
        this.showYAxisLabel = false;
        this.yAxisLabel = 'Population';
        this.colorScheme = {
            domain: ['#6699FF']
        };
        this.person = personDao.singleton();
        this.alterrente = altersrenteDao.singleton(this.person);
    }
    AuswertungComponent.prototype.ngOnInit = function () {
        this.name = this.person.name;
        var einkommen = this.person.nettoEinkommen;
        var krankengeld = einkommen * 80 / 100;
        var erwerbsminderung = this.erwerbsminderungsDao.volleErwerbsminderung(this.person, this.alterrente);
        var pflegefall = erwerbsminderung;
        var invaliditaet = erwerbsminderung;
        var wittwenrente = this.hinterbliebenenDao.wittwenRente();
        var rente = this.altersrenteDao.renteNetto(this.person);
        this.single = [
            { "name": "Einkommen", "value": einkommen },
            { "name": "Krankengeld", "value": krankengeld },
            { "name": "Erwerbsminderung", "value": erwerbsminderung },
            { "name": "Pflegefall", "value": pflegefall },
            { "name": "Invalidität", "value": invaliditaet },
            { "name": "Hinterbliebenenrente", "value": wittwenrente },
            { "name": "Langzeitrente", "value": rente }
        ];
    };
    AuswertungComponent = __decorate([
        core_1.Component({
            selector: 'rentechart',
            //styleUrls: ['./rentechart.component.css'],
            styles: [require('./rentechart.component.css')],
            //templateUrl: './rentechart.component.html'
            template: require('./rentechart.component.html')
        }),
        __metadata("design:paramtypes", [person_dao_1.PersonDao,
            altersrente_dao_1.AltersrenteDao,
            erwerbsminderungsrente_dao_1.ErwerbsminderungsRenteDao,
            hinterbliebenenrente_dao_1.HinterbliebenenRenteDao])
    ], AuswertungComponent);
    return AuswertungComponent;
}());
exports.AuswertungComponent = AuswertungComponent;
//# sourceMappingURL=rentechart.component.js.map