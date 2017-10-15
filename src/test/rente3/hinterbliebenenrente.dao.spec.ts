import { SteuerDao } from './../../app/data/steuer.dao';
import { AltersrenteComponent } from './../../app/rente1/rente1.component';
import { VersicherungDao } from './../../app/data/versicherung.dao';
import { AltersrenteDao } from './../../app/rente1/altersrente.dao';
import { PersonDao, Person, Region } from '../../app/data/person.dao';
import { HinterbliebenenRenteDao,RentenAnspruch } from './../../app/rente3/hinterbliebenenrente.dao';

import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";


describe("HinterbliebenenRenteDaoTest", () => {
    let undertest: HinterbliebenenRenteDao;    

    beforeEach(async(() => {
        const pdao = new PersonDao();
        const vdao = new VersicherungDao();
        const adao = new AltersrenteDao(vdao);

        undertest = new HinterbliebenenRenteDao(pdao, adao,vdao);
    }));

    it('#test initial values of the person singleton.', () => {
        expect(undertest.altesOderNeuesRecht()).toEqual(false);
        expect(undertest.grosseOderKleineWittwenRente()).toEqual(true); 
        expect(undertest.anspruchInProzent()).toEqual(RentenAnspruch.PROZENT_55);
        expect(undertest.kinderZuschlag()).toEqual(26.99);
        expect(undertest.wittwenRenteBrutto()).toEqual(356.99);
        expect(undertest.freibetrag()).toEqual(783.816);
        expect(undertest.pauschal40prozent()).toEqual(640);
        expect(undertest.restNachAbzugFreibetrag()).toEqual(176.184);
        expect(undertest.rest40prozent()).toEqual(70.474);
        expect(undertest.wittwenRenteGekuerzt()).toEqual(286.516);
        expect(undertest.wittwenRente()).toEqual(255.142);
    });

    it('#test renten anspruch in % enum', () => {
        expect(60/100).toEqual(RentenAnspruch.PROZENT_60);
        expect(55/100).toEqual(RentenAnspruch.PROZENT_55);
        expect(25/100).toEqual(RentenAnspruch.PROZENT_25);
    });

    it('#test kinder zuschlag in euro pro monat', () => {
        expect(undertest.kinderZuschlag(0)).toEqual(0);
        expect(undertest.kinderZuschlag(1)).toEqual(26.99);
        expect(undertest.kinderZuschlag(2)).toEqual(40.48);
        expect(undertest.kinderZuschlag(3)).toEqual(53.98);
        expect(undertest.kinderZuschlag(4)).toEqual(67.47);
        expect(undertest.kinderZuschlag(5)).toEqual(80.96);
        expect(undertest.kinderZuschlag(6)).toEqual(94.46);
    });

    it('#test freibetrag ost west', () => {
        expect(undertest.freibetrag(Region.OST)).toEqual(783.816);
        expect(undertest.freibetrag(Region.WEST)).toEqual(819.192);
    });
});
