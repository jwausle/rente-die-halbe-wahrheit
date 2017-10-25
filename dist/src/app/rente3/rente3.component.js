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
var hinterbliebenenrente_dao_1 = require("./hinterbliebenenrente.dao");
var core_1 = require("@angular/core");
var person_dao_1 = require("../data/person.dao");
var HinterbliebenenrenteComponent = /** @class */ (function () {
    function HinterbliebenenrenteComponent(personDao, dao) {
        this.personDao = personDao;
        this.dao = dao;
        this.person = personDao.singleton();
    }
    HinterbliebenenrenteComponent.prototype.ngOnInit = function () {
        this.wittwenRenteBrutto = this.dao.wittwenRenteBrutto();
        this.lohn = this.person.bruttoEinkommenEhePartner;
        this.pauschal40 = this.dao.pauschal40prozent();
        this.lohnAnrechenbar = this.lohn - this.pauschal40;
        this.freibetrag = this.dao.freibetrag();
        this.lohnRest = this.dao.restNachAbzugFreibetrag();
        this.lohnRest40 = this.dao.rest40prozent();
        this.wittwenRenteGekuerzt = this.dao.wittwenRenteGekuerzt();
        this.wittwenRente = this.dao.wittwenRente();
        this.halbwaisenRente = this.dao.halbwaisenRente();
    };
    HinterbliebenenrenteComponent = __decorate([
        core_1.Component({
            selector: 'rente3',
            //styleUrls: ['./rente3.component.css'],
            styles: [require('./rente3.component.css')],
            //templateUrl: './rente3.component.html'
            template: require('./rente3.component.html')
        }),
        __metadata("design:paramtypes", [person_dao_1.PersonDao, hinterbliebenenrente_dao_1.HinterbliebenenRenteDao])
    ], HinterbliebenenrenteComponent);
    return HinterbliebenenrenteComponent;
}());
exports.HinterbliebenenrenteComponent = HinterbliebenenrenteComponent;
//# sourceMappingURL=rente3.component.js.map