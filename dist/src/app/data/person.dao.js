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
var Region;
(function (Region) {
    Region["OST"] = "Ost";
    Region["WEST"] = "West";
})(Region = exports.Region || (exports.Region = {}));
var REGION_OST = Region.OST;
var REGION_WEST = Region.WEST;
var DEFAULT_REGION = Region.OST;
var SINGLETON = {
    name: 'Max Mustermann',
    geburtstag: new Date('1980-01-01T00:00:00'),
    berufsBegin: new Date('1998-09-01T00:00:00'),
    nettoEinkommen: 1500,
    jahrRenteninfo: 2016,
    renteVoll: 600,
    renteBislang: 250,
    rentePrognose: 800,
    renteMitAnpassung1: 1000,
    renteMitAnpassung2: 1500,
    //  krankenVersicherung: 200,
    renteKuerzungProzent: 0.2,
    verheiratet: true,
    kinder: 1,
    isEheVor2002: false,
    geburtstagEhePartner: new Date('1981-01-01T00:00:00'),
    bruttoEinkommenEhePartner: 1600,
    regionOstOrWest: DEFAULT_REGION
};
var PersonDao = /** @class */ (function () {
    function PersonDao() {
    }
    PersonDao.prototype.singleton = function () {
        return SINGLETON;
    };
    PersonDao = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], PersonDao);
    return PersonDao;
}());
exports.PersonDao = PersonDao;
//# sourceMappingURL=person.dao.js.map