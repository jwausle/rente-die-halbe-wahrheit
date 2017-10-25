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
var core_1 = require("@angular/core");
var altersrente_dao_1 = require("./altersrente.dao");
var person_dao_1 = require("../data/person.dao");
var versicherung_dao_1 = require("../data/versicherung.dao");
var AltersrenteComponent = /** @class */ (function () {
    function AltersrenteComponent(personDao, aDao, vDao) {
        this.personDao = personDao;
        this.aDao = aDao;
        this.vDao = vDao;
        this.person = personDao.singleton();
        this.altersrenteDao = aDao;
        this.versicherungDao = vDao;
        this.altersrente = this.altersrenteDao.singleton(this.person);
    }
    AltersrenteComponent.prototype.ngOnInit = function () {
        this.renteBrutto = this.formatEuro(this.altersrenteDao.renteReal(this.person, this.altersrente));
        this.einkommensSteuer = this.formatEuro(this.altersrenteDao.einkommenSteuer(this.person, this.altersrente) / 12);
        this.versicherung = this.formatEuro(this.versicherungDao.versicherungen(this.person.krankenVersicherung, this.renteBrutto));
        this.renteNetto = this.formatEuro(this.renteBrutto - this.einkommensSteuer - this.versicherung);
        var jahreBisZurRente = 28;
        this.kaufkraftverlust = this.zukunftswert(this.renteNetto, this.altersrente.kaufkraftverlust, 28);
    };
    AltersrenteComponent.prototype.ngOnChanges = function (changes) {
        console.log("change: " + changes);
    };
    AltersrenteComponent.prototype.setPersonName = function () {
        this.person.name = "Jan Winter";
    };
    AltersrenteComponent.prototype.zukunftswert = function (rente, zins, jahre) {
        var result = rente;
        for (var i = 0; i < jahre; i++) {
            result = result - (result * zins / 100);
        }
        return Math.round(result * 100) / 100;
    };
    AltersrenteComponent.prototype.changeKaufkraftverlust = function (newKaufkraftverlust) {
        var jahreBisZurRente = 28;
        this.kaufkraftverlust = this.zukunftswert(this.renteNetto, this.altersrente.kaufkraftverlust, 28);
    };
    AltersrenteComponent.prototype.formatEuro = function (euro) {
        return Math.round(euro * 100.0000000001) / 100;
    };
    AltersrenteComponent = __decorate([
        core_1.Component({
            selector: 'rente1',
            //styleUrls: ['./rente1.component.css'],
            styles: [require('./rente1.component.css')],
            //templateUrl: './rente1.component.html'
            template: require('./rente1.component.html')
        }),
        __metadata("design:paramtypes", [person_dao_1.PersonDao, altersrente_dao_1.AltersrenteDao, versicherung_dao_1.VersicherungDao])
    ], AltersrenteComponent);
    return AltersrenteComponent;
}());
exports.AltersrenteComponent = AltersrenteComponent;
//# sourceMappingURL=rente1.component.js.map