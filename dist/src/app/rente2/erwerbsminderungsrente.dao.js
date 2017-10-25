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
var steuer_dao_1 = require("./../data/steuer.dao");
var core_1 = require("@angular/core");
var WERBUNG = 1000;
var VA = 0.14;
var KINDER = 1000;
/** 7.3%*/
var VERSICHERUNG_PROZENT = 7.3 / 100;
/** 8.4%*/
var KRANKENVERSICHERUNG_PROZENT = 8.4 / 100;
/** 2.55%*/
var PFLEGEVERSICHERUNG_PROZENT = 2.55 / 100;
//Frage: Bedeutung dieser Zahl?
var RENTENWERT = 27;
//Frage: Bedeutung dieser Zahl?
var DEK = 34857;
var ErwerbsminderungsRenteDao = /** @class */ (function () {
    function ErwerbsminderungsRenteDao(steuerDao) {
        this.steuer = steuerDao;
    }
    /** Brutto einkommen des Ehegatten im Jahr 19200 */
    ErwerbsminderungsRenteDao.prototype.ehegattenEinkommenBruttoImJahr = function (person) {
        var monatsEinkommenOrNull = person.bruttoEinkommenEhePartner;
        console.log("Ehegatten einkommen (monat): " + monatsEinkommenOrNull + " (erwartet:19200)");
        if (monatsEinkommenOrNull == null) {
            return 0;
        }
        return monatsEinkommenOrNull * 12;
    };
    /** VA? 2688 */
    ErwerbsminderungsRenteDao.prototype.ehegattenVaImJahr = function (person) {
        return Math.round(this.ehegattenEinkommenBruttoImJahr(person) * VA * 1000) / 1000;
    };
    /** Pro Jahr 1000 euro */
    ErwerbsminderungsRenteDao.prototype.kinderEinnahmenImJahr = function (person) {
        return person.kinder * KINDER;
    };
    /** Netto einkommen des Ehegatten im Jahr 15512 */
    ErwerbsminderungsRenteDao.prototype.ehegattenEinkommenNettoImJahr = function (person) {
        return this.ehegattenEinkommenBruttoImJahr(person)
            - this.ehegattenVaImJahr(person)
            - this.kinderEinnahmenImJahr(person);
    };
    /** Stand der Renteninfo 35 */
    ErwerbsminderungsRenteDao.prototype.alterRenteninfo = function (person) {
        var geburtsjahr = person.geburtstag.getFullYear();
        return person.jahrRenteninfo - 1 - geburtsjahr;
    };
    /** Jahr renteneintritt 2045 */
    ErwerbsminderungsRenteDao.prototype.jahrRenteneintritt = function (person, altersrente) {
        return person.geburtstag.getFullYear() + altersrente.renteneintritt;
    };
    /** Jahr renteneintritt 100 */
    ErwerbsminderungsRenteDao.prototype.besteuerungsAnteil = function (person, altersrente) {
        var jahr = 2045; //this.jahrRenteneintritt(person, altersrente);
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
    /**  0 */
    ErwerbsminderungsRenteDao.prototype.ehegattenEinkommensSteuer = function (person) {
        var einkommen = this.ehegattenEinkommenNettoImJahr(person);
        var einkommen50prozent = einkommen / 2;
        return this.steuer.einkommensSteuer(einkommen50prozent);
    };
    /**  0 */
    ErwerbsminderungsRenteDao.prototype.ehegattenEinkommensSteuerGrund = function (person) {
        var einkommensSteuer = this.ehegattenEinkommensSteuer(person);
        var soli = this.steuer.soli(einkommensSteuer);
        return einkommensSteuer + soli;
    };
    /** 7200 */
    ErwerbsminderungsRenteDao.prototype.emEinkommenImJahr = function (person, altersrente) {
        var prozent = this.besteuerungsAnteil(person, altersrente) / 100;
        var einkommen = person.renteVoll * 12 * prozent;
        console.log("EM einkommen im jahr: " + einkommen);
        return einkommen;
    };
    /** 0 */
    ErwerbsminderungsRenteDao.prototype.emEinkommensSteuer = function (person, altersrente) {
        var einkommen = this.emEinkommenImJahr(person, altersrente);
        return this.steuer.einkommensSteuer(einkommen);
    };
    /** 0 */
    ErwerbsminderungsRenteDao.prototype.emEinkommensSteuerGrund = function (person, altersrente) {
        var einkommenSteuer = this.emEinkommensSteuer(person, altersrente);
        var soli = this.steuer.soli(einkommenSteuer);
        var steuer = einkommenSteuer + soli;
        console.log("Einkommenssteuer em:" + steuer + " =ekst:" + einkommenSteuer + " + soli:" + soli + " (erwartet:0=0+0)");
        return steuer;
    };
    /** 3600 */
    ErwerbsminderungsRenteDao.prototype.em2EinkommenImJahr = function (person, altersrente) {
        var prozent = this.besteuerungsAnteil(person, altersrente) / 100;
        return person.renteVoll / 2 * 12 * prozent;
    };
    /** 0 */
    ErwerbsminderungsRenteDao.prototype.em2EinkommensSteuer = function (person, altersrente) {
        var einkommen = this.em2EinkommenImJahr(person, altersrente);
        return this.steuer.einkommensSteuer(einkommen);
    };
    /** 0 */
    ErwerbsminderungsRenteDao.prototype.em2EinkommensSteuerGrund = function (person, altersrente) {
        var einkommenSteuer = this.em2EinkommensSteuer(person, altersrente);
        var soli = this.steuer.soli(einkommenSteuer);
        return einkommenSteuer + soli;
    };
    /** 26400 (expected: 22.712,00)  */
    ErwerbsminderungsRenteDao.prototype.eheEinkommenImJahr = function (person, altersrente) {
        var einkommenGatte = this.ehegattenEinkommenNettoImJahr(person);
        var einkommen = this.emEinkommenImJahr(person, altersrente);
        var einkommenEhe = einkommenGatte + einkommen;
        console.log("Ehe einkommen:" + einkommenEhe + " = kunde:" + einkommen + " + gatte:" + einkommenGatte + " (erwartet: 22712=15512+7200");
        return einkommenEhe;
    };
    /** 1.016 */
    ErwerbsminderungsRenteDao.prototype.eheEinkommensSteuer = function (person, altersrente) {
        var einkommen = this.eheEinkommenImJahr(person, altersrente);
        return this.steuer.einkommensSteuer(einkommen / 2) * 2;
    };
    /** 1071,88 = 1.016,00 + 55,88 */
    ErwerbsminderungsRenteDao.prototype.eheEinkommensSteuerGrund = function (person, altersrente) {
        var einkommenSteuer = this.eheEinkommensSteuer(person, altersrente);
        var soli = this.steuer.soli(einkommenSteuer);
        return Math.round((einkommenSteuer + soli) * 1000) / 1000;
    };
    /** 19.112,00   */
    ErwerbsminderungsRenteDao.prototype.ehe2EinkommenImJahr = function (person, altersrente) {
        return this.ehegattenEinkommenNettoImJahr(person)
            + this.em2EinkommenImJahr(person, altersrente);
    };
    /** 0 */
    ErwerbsminderungsRenteDao.prototype.ehe2EinkommensSteuer = function (person, altersrente) {
        var einkommen = this.ehe2EinkommenImJahr(person, altersrente);
        return this.steuer.einkommensSteuer(einkommen / 2) * 2;
    };
    /** 384,02 = 364,00  + 20,02 */
    ErwerbsminderungsRenteDao.prototype.ehe2EinkommensSteuerGrund = function (person, altersrente) {
        var einkommenSteuer = this.ehe2EinkommensSteuer(person, altersrente);
        var soli = this.steuer.soli(einkommenSteuer);
        return Math.round((einkommenSteuer + soli) * 1000) / 1000;
    };
    /** 1071,88 */
    ErwerbsminderungsRenteDao.prototype.volleErwerbsminderungBrutto = function (person, altersrente) {
        if (person.verheiratet) {
            return Math.round((this.eheEinkommensSteuerGrund(person, altersrente) - this.ehegattenEinkommensSteuerGrund(person)) * 1000) / 1000;
        }
        return Math.round(this.emEinkommensSteuerGrund(person, altersrente) * 1000) / 1000;
    };
    /** -89,32 EUR */
    ErwerbsminderungsRenteDao.prototype.volleErwerbsminderungMonat = function (person, altersrente) {
        return Math.round(this.volleErwerbsminderungBrutto(person, altersrente) / 12 * 1000) / 1000;
    };
    /** -65,70 EUR */
    ErwerbsminderungsRenteDao.prototype.volleVersicherungen = function (person) {
        if (person.krankenVersicherung > 0) {
            return person.krankenVersicherung - (person.renteVoll * VERSICHERUNG_PROZENT);
        }
        return person.renteVoll * (KRANKENVERSICHERUNG_PROZENT + PFLEGEVERSICHERUNG_PROZENT);
    };
    /** 444,98 EUR */
    ErwerbsminderungsRenteDao.prototype.volleErwerbsminderung = function (person, altersrente) {
        return person.renteVoll
            - this.volleErwerbsminderungMonat(person, altersrente)
            - this.volleVersicherungen(person);
    };
    /** 384,02*/
    ErwerbsminderungsRenteDao.prototype.halbeErwerbsminderungBrutto = function (person, altersrente) {
        if (person.verheiratet) {
            return this.ehe2EinkommensSteuerGrund(person, altersrente) - this.ehegattenEinkommensSteuerGrund(person);
        }
        return this.emEinkommensSteuerGrund(person, altersrente);
    };
    /** -32,00 EUR EUR */
    ErwerbsminderungsRenteDao.prototype.halbeErwerbsminderungMonat = function (person, altersrente) {
        return Math.round(this.halbeErwerbsminderungBrutto(person, altersrente) / 12 * 1000) / 1000;
    };
    /** -32,85 EUR*/
    ErwerbsminderungsRenteDao.prototype.halbeVersicherungen = function (person) {
        if (person.krankenVersicherung > 0) {
            return person.krankenVersicherung - (person.renteVoll / 2 * VERSICHERUNG_PROZENT);
        }
        return person.renteVoll / 2 * (KRANKENVERSICHERUNG_PROZENT + PFLEGEVERSICHERUNG_PROZENT);
    };
    /** 235,15 EUR */
    ErwerbsminderungsRenteDao.prototype.halbeErwerbsminderung = function (person, altersrente) {
        return person.renteVoll / 2
            - this.halbeErwerbsminderungMonat(person, altersrente)
            - this.halbeVersicherungen(person);
    };
    ErwerbsminderungsRenteDao = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [steuer_dao_1.SteuerDao])
    ], ErwerbsminderungsRenteDao);
    return ErwerbsminderungsRenteDao;
}());
exports.ErwerbsminderungsRenteDao = ErwerbsminderungsRenteDao;
//# sourceMappingURL=erwerbsminderungsrente.dao.js.map