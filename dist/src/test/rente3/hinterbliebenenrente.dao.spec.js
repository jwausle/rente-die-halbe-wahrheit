"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var versicherung_dao_1 = require("./../../app/data/versicherung.dao");
var altersrente_dao_1 = require("./../../app/rente1/altersrente.dao");
var person_dao_1 = require("../../app/data/person.dao");
var hinterbliebenenrente_dao_1 = require("./../../app/rente3/hinterbliebenenrente.dao");
var testing_1 = require("@angular/core/testing");
describe("HinterbliebenenRenteDaoTest", function () {
    var undertest;
    beforeEach(testing_1.async(function () {
        var pdao = new person_dao_1.PersonDao();
        var vdao = new versicherung_dao_1.VersicherungDao();
        var adao = new altersrente_dao_1.AltersrenteDao(vdao);
        undertest = new hinterbliebenenrente_dao_1.HinterbliebenenRenteDao(pdao, adao, vdao);
    }));
    it('#test initial values of the person singleton.', function () {
        expect(undertest.altesOderNeuesRecht()).toEqual(false);
        expect(undertest.grosseOderKleineWittwenRente()).toEqual(true);
        expect(undertest.anspruchInProzent()).toEqual(hinterbliebenenrente_dao_1.RentenAnspruch.PROZENT_55);
        expect(undertest.kinderZuschlag()).toEqual(26.99);
        expect(undertest.wittwenRenteBrutto()).toEqual(356.99);
        expect(undertest.freibetrag()).toEqual(783.816);
        expect(undertest.pauschal40prozent()).toEqual(640);
        expect(undertest.restNachAbzugFreibetrag()).toEqual(176.184);
        expect(undertest.rest40prozent()).toEqual(70.474);
        expect(undertest.wittwenRenteGekuerzt()).toEqual(286.516);
        expect(undertest.wittwenRente()).toEqual(255.142);
    });
    it('#test renten anspruch in % enum', function () {
        expect(60 / 100).toEqual(hinterbliebenenrente_dao_1.RentenAnspruch.PROZENT_60);
        expect(55 / 100).toEqual(hinterbliebenenrente_dao_1.RentenAnspruch.PROZENT_55);
        expect(25 / 100).toEqual(hinterbliebenenrente_dao_1.RentenAnspruch.PROZENT_25);
    });
    it('#test kinder zuschlag in euro pro monat', function () {
        expect(undertest.kinderZuschlag(0)).toEqual(0);
        expect(undertest.kinderZuschlag(1)).toEqual(26.99);
        expect(undertest.kinderZuschlag(2)).toEqual(40.48);
        expect(undertest.kinderZuschlag(3)).toEqual(53.98);
        expect(undertest.kinderZuschlag(4)).toEqual(67.47);
        expect(undertest.kinderZuschlag(5)).toEqual(80.96);
        expect(undertest.kinderZuschlag(6)).toEqual(94.46);
    });
    it('#test freibetrag ost west', function () {
        expect(undertest.freibetrag(person_dao_1.Region.OST)).toEqual(783.816);
        expect(undertest.freibetrag(person_dao_1.Region.WEST)).toEqual(819.192);
    });
});
//# sourceMappingURL=hinterbliebenenrente.dao.spec.js.map