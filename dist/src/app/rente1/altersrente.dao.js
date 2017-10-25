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
var core_1 = require("@angular/core");
var Renteneintritt;
(function (Renteneintritt) {
    Renteneintritt[Renteneintritt["VOR_63"] = 0] = "VOR_63";
    Renteneintritt[Renteneintritt["VOR_67"] = 1] = "VOR_67";
    Renteneintritt[Renteneintritt["MIT_67"] = 2] = "MIT_67";
})(Renteneintritt = exports.Renteneintritt || (exports.Renteneintritt = {}));
var RENTEN_EINTRITT = 67;
var VORZEITIGER_RENTEN_EINTRITT = 64;
var MAX_VORZEITIGER_RENTEN_EINTRITT_MONATE = 48;
var AltersrenteDao = /** @class */ (function () {
    function AltersrenteDao(vDao) {
        this.vDao = vDao;
        this.versicherungDao = vDao;
    }
    AltersrenteDao.prototype.singleton = function (person) {
        return {
            renteneintritt: 64,
            renteneintrittMonat: 0,
            kaufkraftverlust: 0.84
        };
    };
    /** Berechne monate vor 67 Jahre. */
    AltersrenteDao.prototype.monateVor67 = function (altersrente) {
        var monate = (RENTEN_EINTRITT - altersrente.renteneintritt) * 12 - altersrente.renteneintrittMonat;
        return Math.min(monate, MAX_VORZEITIGER_RENTEN_EINTRITT_MONATE);
    };
    /** Stand der Renteninfo 35 */
    AltersrenteDao.prototype.alterRenteninfo = function (person) {
        var geburtsjahr = person.geburtstag.getFullYear();
        return person.jahrRenteninfo - 1 - geburtsjahr;
    };
    /** Jahr renteneintritt 2045 */
    AltersrenteDao.prototype.jahrRenteneintritt = function (person, altersrente) {
        return person.geburtstag.getFullYear() + altersrente.renteneintritt;
    };
    /** Geburtstag + 67 */
    AltersrenteDao.prototype.renteneintrittSoll = function (person) {
        var renteneintritt = new Date(person.geburtstag);
        renteneintritt.setFullYear(person.geburtstag.getFullYear() + RENTEN_EINTRITT);
        return renteneintritt;
    };
    /** Geburtstag + 67 jahre + 1 Monat */
    AltersrenteDao.prototype.renteneintrittSoll2 = function (person) {
        var renteneintritt = new Date(this.renteneintrittSoll(person));
        renteneintritt.setMonth(renteneintritt.getMonth() + 1);
        return renteneintritt;
    };
    /** Arbeitsmonate 544 */
    AltersrenteDao.prototype.arbeitsMonate = function (person, altersrente) {
        var berufsbeginInMonaten = person.berufsBegin.getFullYear() * 12 + person.berufsBegin.getMonth();
        var geburtstagInMonaten = person.geburtstag.getFullYear() * 12 + person.geburtstag.getMonth();
        var months = berufsbeginInMonaten - geburtstagInMonaten;
        return (altersrente.renteneintritt * 12 + altersrente.renteneintrittMonat) - months;
    };
    /** Arbeitsjahre 45,33 */
    AltersrenteDao.prototype.arbeitsJahre = function (person, altersrente) {
        var jahre = Math.round(this.arbeitsMonate(person, altersrente) / 12 * 100) / 100;
        return jahre;
    };
    /** Vorzeitiger Renteneintritt in Monaten 36 */
    AltersrenteDao.prototype.vorzeitigerRentenEintrittInMonaten = function (altersrente) {
        var istVorzeitigerRentenEintrittInMonaten = (RENTEN_EINTRITT - altersrente.renteneintritt) * 12 - altersrente.renteneintrittMonat;
        return Math.min(MAX_VORZEITIGER_RENTEN_EINTRITT_MONATE, istVorzeitigerRentenEintrittInMonaten);
    };
    /** Geburtsjahr constante from:1953 to:>1964 => 758 - >780 monate*/
    AltersrenteDao.prototype.alterRentenEintrittInMonaten = function (person) {
        switch (person.geburtstag.getFullYear()) {
            case 1953: return 758;
            case 1954: return 760;
            case 1955: return 762;
            case 1956: return 764;
            case 1957: return 766;
            case 1958: return 768;
            case 1959: return 770;
            case 1960: return 772;
            case 1961: return 774;
            case 1962: return 776;
            case 1963: return 778;
            default: return 780;
        }
    };
    /** Geburtsjahr constante 'geburtstagsJahrConstant' in rounded monaten.*/
    AltersrenteDao.prototype.alterRentenEintritt = function (person) {
        return Math.round(this.alterRentenEintrittInMonaten(person) / 12);
    };
    /** Rest of round 'geburtstagsMonatConstant' */
    AltersrenteDao.prototype.geburtstagsMonatConstantRest = function (person) {
        return this.alterRentenEintrittInMonaten(person) - (this.alterRentenEintritt(person) * 12);
    };
    /** Ist person lange versichert */
    AltersrenteDao.prototype.isLangVersichert = function (person, altersrente) {
        var left = 45 >= this.vorzeitigerRentenEintrittInMonaten(altersrente);
        var right = altersrente.renteneintritt * 12 + altersrente.renteneintrittMonat >= this.alterRentenEintrittInMonaten(person);
        return left && right;
    };
    /** Ist person vor 63 oder <35 Jahre */
    AltersrenteDao.prototype.isVor63oderKleiner35 = function (person, altersrente) {
        if (altersrente.renteneintritt < 63) {
            return Renteneintritt.VOR_63;
        }
        var left = this.arbeitsJahre(person, altersrente) < 35;
        var right = altersrente.renteneintritt < RENTEN_EINTRITT;
        if (left && right) {
            return Renteneintritt.VOR_67;
        }
        return Renteneintritt.MIT_67;
    };
    /** Potentielle renten kürzung in % 18.0 */
    AltersrenteDao.prototype.rentenKuerzung = function (person, altersrente) {
        switch (this.isVor63oderKleiner35(person, altersrente)) {
            case Renteneintritt.VOR_63:
            case Renteneintritt.MIT_67:
                return 0;
        }
        var monate = this.vorzeitigerRentenEintrittInMonaten(altersrente);
        var langversichert = 0;
        if (this.isLangVersichert(person, altersrente)) {
            langversichert = monate * 0.3;
        }
        return monate * person.renteKuerzungProzent + langversichert;
    };
    /** Potentieller rentenzuschlag in % 0*/
    AltersrenteDao.prototype.rentenZuschlag = function (person, altersrente) {
        switch (this.isVor63oderKleiner35(person, altersrente)) {
            case Renteneintritt.VOR_63:
            case Renteneintritt.MIT_67:
                return 0;
        }
        var monate = this.vorzeitigerRentenEintrittInMonaten(altersrente);
        return monate * -0.5 * person.renteKuerzungProzent;
    };
    /** Besteuerungsanteil 100% */
    AltersrenteDao.prototype.besteuerungsAnteil = function (person, altersrente) {
        var jahr = this.jahrRenteneintritt(person, altersrente);
        switch (jahr) {
            case 2014: return 68;
            case 2015: return 70;
            case 2016: return 72;
            case 2017: return 74;
            case 2018: return 76;
            case 2019: return 78;
            case 2020: return 80;
            case 2021: return 81;
            case 2022: return 82;
            case 2023: return 83;
            case 2024: return 84;
            case 2025: return 85;
            case 2026: return 86;
            case 2027: return 87;
            case 2028: return 88;
            case 2029: return 89;
            case 2030: return 90;
            case 2031: return 91;
            case 2032: return 92;
            case 2033: return 93;
            case 2034: return 94;
            case 2035: return 95;
            case 2036: return 96;
            case 2037: return 97;
            case 2038: return 98;
            case 2039: return 99;
            default: return 100;
        }
    };
    /** 600,00 EUR */
    AltersrenteDao.prototype.renteReal = function (person, altersrente) {
        switch (this.isVor63oderKleiner35(person, altersrente)) {
            case Renteneintritt.VOR_63:
            case Renteneintritt.VOR_67:
                return 0;
        }
        var zuschlag = this.rentenZuschlag(person, altersrente);
        var kuerzung = this.rentenKuerzung(person, altersrente);
        if (zuschlag > 0) {
            return person.renteVoll + person.renteVoll * zuschlag;
        }
        else {
            return person.renteVoll - person.renteVoll * kuerzung;
        }
    };
    AltersrenteDao.prototype.einkommen = function (person, altersrente) {
        var monatsRente = this.renteReal(person, altersrente);
        var steuerAnteil = this.besteuerungsAnteil(person, altersrente) / 100;
        return monatsRente * 12 * steuerAnteil;
    };
    AltersrenteDao.prototype.einkommenSteuer = function (person, altersrente) {
        var einkommen = this.einkommen(person, altersrente);
        if (einkommen <= 8652) {
            return 0;
        }
        else if (einkommen <= 13669) {
            return (993.62 * (einkommen - 8652) / 10000 + 1400) * (einkommen - 8652) / 10000;
        }
        else if (einkommen <= 53665) {
            return (225.4 * (einkommen - 13669) / 10000 + 2397) * (einkommen - 13669) / 10000 + 952.48;
        }
        else if (einkommen <= 254446) {
            return (einkommen * 0.42 - 8394.14);
        }
        else {
            return einkommen * 0.45 - 16027.52;
        }
    };
    AltersrenteDao.prototype.soli = function (person, altersrente) {
        return this.einkommenSteuer(person, altersrente) * 5.5 / 100;
    };
    AltersrenteDao.prototype.einkommenSteuer2 = function (person, altersrente) {
        return this.einkommenSteuer(person, altersrente) + this.soli(person, altersrente);
    };
    AltersrenteDao.prototype.renteNetto = function (person) {
        var altersrente = this.singleton(person);
        var renteBrutto = this.renteReal(person, altersrente);
        var einkommensSteuer = this.einkommenSteuer(person, altersrente) / 12;
        var versicherung = this.versicherungDao.versicherungen(person.krankenVersicherung, renteBrutto);
        var renteNetto = renteBrutto - einkommensSteuer - versicherung;
        return Math.round(renteNetto * 1000) / 1000;
    };
    AltersrenteDao = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [versicherung_dao_1.VersicherungDao])
    ], AltersrenteDao);
    return AltersrenteDao;
}());
exports.AltersrenteDao = AltersrenteDao;
//# sourceMappingURL=altersrente.dao.js.map