import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { PersonDao, Person } from '../../app/data/person.dao';

describe("PersonTest", () => {
    let undertest: Person;    

    beforeEach(async(() => {
        undertest = new PersonDao().singleton();
    }));

    it('#test initial values of the person singleton.', () => {
        expect(undertest.name).toEqual('Max Mustermann');
        expect(undertest.geburtstag).toEqual(new Date('1980-01-01T00:00:00'));
        expect(undertest.berufsBegin).toEqual(new Date('1998-09-01T00:00:00'));
        expect(undertest.nettoEinkommen).toEqual(1500);
        expect(undertest.jahrRenteninfo).toEqual(2016);
        expect(undertest.renteVoll).toEqual(600);
        expect(undertest.renteBislang).toEqual(250);
        expect(undertest.rentePrognose).toEqual(800);
        expect(undertest.renteMitAnpassung1).toEqual(1000);
        expect(undertest.renteMitAnpassung2).toEqual(1500);
        expect(undertest.renteKuerzungProzent).toEqual(0.2);
        expect(undertest.verheiratet).toEqual(true);
        expect(undertest.kinder).toEqual(1);
        expect(undertest.isEheVor2002).toEqual(false);
        expect(undertest.geburtstagEhePartner).toEqual(new Date('1981-01-01T00:00:00'));
        expect(undertest.bruttoEinkommenEhePartner).toEqual(1600);
        expect(undertest.regionOstOrWest).toEqual("Ost");
    });
    
    it('#test initial null values of person singleton.', () => {
        expect(undertest.krankenVersicherung).toEqual(undefined);
    });

    it('#test geburtstags + calculations', () => {
        const geburtstag = new Date(undertest.geburtstag);
        expect(geburtstag).toEqual(new Date('1980-01-01T00:00:00'));

        geburtstag.setFullYear(geburtstag.getFullYear() + 67);
        expect(geburtstag).toEqual(new Date('2047-01-01T00:00:00'));

        geburtstag.setMonth(geburtstag.getMonth() + 1);
        expect(geburtstag).toEqual(new Date('2047-02-01T00:00:00'));
    });
});
