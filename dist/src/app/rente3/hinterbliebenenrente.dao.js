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
var versicherung_dao_1 = require("./../data/versicherung.dao");
var altersrente_dao_1 = require("./../rente1/altersrente.dao");
var person_dao_1 = require("./../data/person.dao");
var core_1 = require("@angular/core");
// F9  := person.verheirated
// F11 := person.isEheVor2002
// F13 := person.geburtstagEhePartner
// F21 := person.bruttoEinkommenEhePartner
// F23 := person.kinder
// F25 := person.regionOstOderWest
var NEUJAHR_1962 = new Date('1962-01-02T00:00:00');
var RentenAnspruch;
(function (RentenAnspruch) {
    RentenAnspruch[RentenAnspruch["PROZENT_60"] = 0.6] = "PROZENT_60";
    RentenAnspruch[RentenAnspruch["PROZENT_55"] = 0.55] = "PROZENT_55";
    RentenAnspruch[RentenAnspruch["PROZENT_25"] = 0.25] = "PROZENT_25";
})(RentenAnspruch = exports.RentenAnspruch || (exports.RentenAnspruch = {}));
var PROZENT_40 = 40 / 100;
var HinterbliebenenRenteDao = /** @class */ (function () {
    function HinterbliebenenRenteDao(personDao, altersrenteDao, versicherungDao) {
        this.personDao = personDao;
        this.altersrenteDao = altersrenteDao;
        this.versicherungDao = versicherungDao;
        this.person = personDao.singleton();
    }
    HinterbliebenenRenteDao.prototype.altesOderNeuesRecht = function () {
        var isKundeVor1962geboren = this.person.geburtstag < NEUJAHR_1962;
        var isGatteVor1962geboren = this.person.geburtstagEhePartner < NEUJAHR_1962;
        var isEinEhepartnerVor1962geboren = isKundeVor1962geboren || isGatteVor1962geboren;
        var isEheVor2002 = this.person.isEheVor2002;
        if (isEinEhepartnerVor1962geboren && isEheVor2002) {
            return true;
        }
        return false;
    };
    HinterbliebenenRenteDao.prototype.grosseOderKleineWittwenRente = function () {
        var grenze = new Date();
        grenze.setFullYear(-45);
        grenze.setMonth(-2);
        var isGatteVor45JahrenGeboren = this.person.geburtstagEhePartner < grenze;
        var gibtEsKinder = this.person.kinder > 0;
        return gibtEsKinder || isGatteVor45JahrenGeboren;
    };
    HinterbliebenenRenteDao.prototype.anspruchInProzent = function () {
        var grXorKlRente = this.grosseOderKleineWittwenRente();
        var altesXorNeuesRecht = this.altesOderNeuesRecht();
        if (grXorKlRente && altesXorNeuesRecht) {
            return RentenAnspruch.PROZENT_60;
        }
        else if (grXorKlRente && !altesXorNeuesRecht) {
            return RentenAnspruch.PROZENT_55;
        }
        else {
            return RentenAnspruch.PROZENT_25;
        }
    };
    /**
     *
     * @param {number} [kinder] if unset use 'person.kinder'
     * @returns {number} euro betrag pro monat
     * @memberof HinterbliebenenRenteDao
     */
    HinterbliebenenRenteDao.prototype.kinderZuschlag = function (kinder) {
        if (kinder == undefined) {
            kinder = this.person.kinder;
        }
        switch (kinder) {
            case 0: return 0;
            case 1: return 26.99;
            case 2: return 40.48;
            case 3: return 53.98;
            case 4: return 67.47;
            case 5: return 80.96;
            default: return 94.46;
        }
    };
    HinterbliebenenRenteDao.prototype.wittwenRenteBrutto = function () {
        var renteGatte = this.altersrenteDao.renteReal(this.person, this.altersrenteDao.singleton(this.person));
        var anspruchInProzent = this.anspruchInProzent().valueOf();
        var kinderZuschlag = this.kinderZuschlag();
        return renteGatte * anspruchInProzent + kinderZuschlag;
    };
    HinterbliebenenRenteDao.prototype.wittwenRenteGekuerzt = function () {
        return Math.max(0, this.wittwenRenteBrutto() - this.rest40prozent());
    };
    HinterbliebenenRenteDao.prototype.wittwenRente = function () {
        var rente = this.wittwenRenteGekuerzt();
        return Math.round((rente - this.versicherungDao.versicherungen(0, rente)) * 1000) / 1000;
    };
    HinterbliebenenRenteDao.prototype.freibetrag = function (region) {
        if (region == null) {
            region = this.person.regionOstOrWest;
        }
        switch (region) {
            case person_dao_1.Region.OST: return 783.816;
            case person_dao_1.Region.WEST: return 819.192;
            default: throw new Error("Unknown region: " + region);
        }
    };
    HinterbliebenenRenteDao.prototype.pauschal40prozent = function () {
        return this.person.bruttoEinkommenEhePartner * PROZENT_40;
    };
    HinterbliebenenRenteDao.prototype.restNachAbzugFreibetrag = function () {
        return Math.round(Math.max(0, this.person.bruttoEinkommenEhePartner - this.pauschal40prozent() - this.freibetrag()) * 1000) / 1000;
    };
    HinterbliebenenRenteDao.prototype.rest40prozent = function () {
        return Math.round(this.restNachAbzugFreibetrag() * PROZENT_40 * 1000) / 1000;
    };
    HinterbliebenenRenteDao.prototype.halbwaisenRente = function () {
        return 117;
    };
    HinterbliebenenRenteDao = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [person_dao_1.PersonDao, altersrente_dao_1.AltersrenteDao, versicherung_dao_1.VersicherungDao])
    ], HinterbliebenenRenteDao);
    return HinterbliebenenRenteDao;
}());
exports.HinterbliebenenRenteDao = HinterbliebenenRenteDao;
//# sourceMappingURL=hinterbliebenenrente.dao.js.map