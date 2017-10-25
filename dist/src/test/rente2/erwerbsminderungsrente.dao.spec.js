"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var versicherung_dao_1 = require("./../../app/data/versicherung.dao");
var person_dao_1 = require("./../../app/data/person.dao");
var erwerbsminderungsrente_dao_1 = require("./../../app/rente2/erwerbsminderungsrente.dao");
var steuer_dao_1 = require("./../../app/data/steuer.dao");
var altersrente_dao_1 = require("./../../app/rente1/altersrente.dao");
var testing_1 = require("@angular/core/testing");
describe("ErwerbsminderungsRenteDaoTest", function () {
    var undertest;
    var person;
    var altersrente;
    beforeEach(testing_1.async(function () {
        undertest = new erwerbsminderungsrente_dao_1.ErwerbsminderungsRenteDao(new steuer_dao_1.SteuerDao());
        person = new person_dao_1.PersonDao().singleton();
        altersrente = new altersrente_dao_1.AltersrenteDao(new versicherung_dao_1.VersicherungDao()).singleton(person);
    }));
    it('#simple test', function () {
        expect(undertest.alterRenteninfo(person)).toEqual(35);
        expect(undertest.besteuerungsAnteil(person, altersrente)).toEqual(100);
        expect(undertest.ehe2EinkommenImJahr(person, altersrente)).toEqual(19112);
        expect(undertest.ehe2EinkommensSteuer(person, altersrente)).toEqual(364.722);
        expect(undertest.ehe2EinkommensSteuerGrund(person, altersrente)).toEqual(384.782);
        expect(undertest.eheEinkommenImJahr(person, altersrente)).toEqual(22712);
        expect(undertest.eheEinkommensSteuer(person, altersrente)).toEqual(1016.218);
        expect(undertest.eheEinkommensSteuerGrund(person, altersrente)).toEqual(1072.11);
        expect(undertest.ehegattenEinkommenBruttoImJahr(person)).toEqual(19200);
        expect(undertest.ehegattenEinkommenNettoImJahr(person)).toEqual(15512);
        expect(undertest.ehegattenEinkommensSteuer(person)).toEqual(0);
        expect(undertest.ehegattenEinkommensSteuerGrund(person)).toEqual(0);
        expect(undertest.ehegattenVaImJahr(person)).toEqual(2688);
        expect(undertest.em2EinkommenImJahr(person, altersrente)).toEqual(3600);
        expect(undertest.em2EinkommensSteuer(person, altersrente)).toEqual(0);
        expect(undertest.em2EinkommensSteuerGrund(person, altersrente)).toEqual(0);
        expect(undertest.emEinkommenImJahr(person, altersrente)).toEqual(7200);
        expect(undertest.emEinkommensSteuer(person, altersrente)).toEqual(0);
        expect(undertest.emEinkommensSteuerGrund(person, altersrente)).toEqual(0);
        expect(undertest.halbeErwerbsminderungBrutto(person, altersrente)).toEqual(384.782);
        expect(undertest.halbeErwerbsminderungMonat(person, altersrente)).toEqual(32.065);
        expect(undertest.halbeVersicherungen(person)).toEqual(32.85);
        expect(undertest.halbeErwerbsminderung(person, altersrente)).toEqual(235.085);
        expect(undertest.kinderEinnahmenImJahr(person)).toEqual(1000);
        expect(undertest.volleErwerbsminderungBrutto(person, altersrente)).toEqual(1072.11); //?1071.88
        expect(undertest.volleErwerbsminderungMonat(person, altersrente)).toEqual(89.342);
        expect(undertest.volleVersicherungen(person)).toEqual(65.70);
        expect(undertest.volleErwerbsminderung(person, altersrente)).toEqual(444.958);
    });
});
//# sourceMappingURL=erwerbsminderungsrente.dao.spec.js.map