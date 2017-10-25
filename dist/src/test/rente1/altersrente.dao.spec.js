"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var person_dao_1 = require("./../../app/data/person.dao");
var versicherung_dao_1 = require("./../../app/data/versicherung.dao");
var altersrente_dao_1 = require("./../../app/rente1/altersrente.dao");
var testing_1 = require("@angular/core/testing");
describe("AltersrenteDaoTest", function () {
    var undertest;
    var altersrente;
    var person;
    beforeEach(testing_1.async(function () {
        undertest = new altersrente_dao_1.AltersrenteDao(new versicherung_dao_1.VersicherungDao());
        person = new person_dao_1.PersonDao().singleton();
        altersrente = undertest.singleton(person);
    }));
    it('#test intial Altersrente singleton values', function () {
        expect(altersrente.kaufkraftverlust).toEqual(0.84);
        expect(altersrente.renteneintritt).toEqual(64);
        expect(altersrente.renteneintrittMonat).toEqual(0);
    });
    it('#test values of person and alterrente singletons', function () {
        expect(undertest.alterRenteninfo(person)).toEqual(35);
        expect(undertest.alterRentenEintritt(person)).toEqual(65); // ? Weil: altersrente.renteneintritt=64
        expect(undertest.alterRentenEintrittInMonaten(person)).toEqual(780);
        expect(undertest.arbeitsJahre(person, altersrente)).toEqual(45.33);
        expect(undertest.arbeitsMonate(person, altersrente)).toEqual(544);
        expect(undertest.besteuerungsAnteil(person, altersrente)).toEqual(100);
        expect(undertest.einkommen(person, altersrente)).toEqual(7200);
        expect(undertest.einkommenSteuer(person, altersrente)).toEqual(0);
        expect(undertest.einkommenSteuer2(person, altersrente)).toEqual(0);
        expect(undertest.geburtstagsMonatConstantRest(person)).toEqual(0);
        expect(undertest.isLangVersichert(person, altersrente)).toEqual(false);
        expect(undertest.isVor63oderKleiner35(person, altersrente)).toEqual(altersrente_dao_1.Renteneintritt.MIT_67);
        expect(undertest.jahrRenteneintritt(person, altersrente)).toEqual(2044);
        expect(undertest.monateVor67(altersrente)).toEqual(36); //?
        expect(undertest.renteneintrittSoll(person)).toEqual(new Date('2047-01-01T00:00:00'));
        expect(undertest.renteneintrittSoll2(person)).toEqual(new Date('2047-02-01T00:00:00'));
        expect(undertest.rentenKuerzung(person, altersrente)).toEqual(0);
        expect(undertest.rentenZuschlag(person, altersrente)).toEqual(0);
        expect(undertest.renteReal(person, altersrente)).toEqual(600);
        expect(undertest.soli(person, altersrente)).toEqual(0);
        expect(undertest.vorzeitigerRentenEintrittInMonaten(altersrente)).toEqual(36);
    });
});
//# sourceMappingURL=altersrente.dao.spec.js.map