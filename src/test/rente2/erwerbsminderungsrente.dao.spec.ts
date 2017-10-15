import { VersicherungDao } from './../../app/data/versicherung.dao';
import { PersonDao, Person } from './../../app/data/person.dao';
import { ErwerbsminderungsRenteDao } from './../../app/rente2/erwerbsminderungsrente.dao';
import { SteuerDao } from './../../app/data/steuer.dao';
import { AltersrenteDao, Altersrente } from './../../app/rente1/altersrente.dao';

import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

describe("ErwerbsminderungsRenteDaoTest", () => {
    let undertest:ErwerbsminderungsRenteDao;
    let person:Person;
    let altersrente:Altersrente;

    beforeEach(async(() => {
        undertest = new ErwerbsminderungsRenteDao(new SteuerDao());
        person = new PersonDao().singleton();
        altersrente = new AltersrenteDao(new VersicherungDao()).singleton(person);
    }));
   
    it('#simple test', () => {
       expect(undertest.alterRenteninfo(person)).toEqual(35);
       expect(undertest.besteuerungsAnteil(person,altersrente)).toEqual(100);
       
       expect(undertest.ehe2EinkommenImJahr(person,altersrente)).toEqual(19112);
       expect(undertest.ehe2EinkommensSteuer(person,altersrente)).toEqual(364.722);
       expect(undertest.ehe2EinkommensSteuerGrund(person,altersrente)).toEqual(384.782);
       
       expect(undertest.eheEinkommenImJahr(person,altersrente)).toEqual(22712);
       expect(undertest.eheEinkommensSteuer(person,altersrente)).toEqual(1016.218);
       expect(undertest.eheEinkommensSteuerGrund(person,altersrente)).toEqual(1072.11);
       
       expect(undertest.ehegattenEinkommenBruttoImJahr(person)).toEqual(19200);
       expect(undertest.ehegattenEinkommenNettoImJahr(person)).toEqual(15512);
       expect(undertest.ehegattenEinkommensSteuer(person)).toEqual(0);
       expect(undertest.ehegattenEinkommensSteuerGrund(person)).toEqual(0);
       expect(undertest.ehegattenVaImJahr(person)).toEqual(2688);
       
       expect(undertest.em2EinkommenImJahr(person,altersrente)).toEqual(3600);
       expect(undertest.em2EinkommensSteuer(person, altersrente)).toEqual(0);
       expect(undertest.em2EinkommensSteuerGrund(person,altersrente)).toEqual(0);
       
       expect(undertest.emEinkommenImJahr(person,altersrente)).toEqual(7200);
       expect(undertest.emEinkommensSteuer(person,altersrente)).toEqual(0);
       expect(undertest.emEinkommensSteuerGrund(person,altersrente)).toEqual(0);
       
       expect(undertest.halbeErwerbsminderungBrutto(person,altersrente)).toEqual(384.782);
       expect(undertest.halbeErwerbsminderungMonat(person,altersrente)).toEqual(32.065)
       expect(undertest.halbeVersicherungen(person)).toEqual(32.85);
       expect(undertest.halbeErwerbsminderung(person,altersrente)).toEqual(235.085);

       expect(undertest.kinderEinnahmenImJahr(person)).toEqual(1000);

       expect(undertest.volleErwerbsminderungBrutto(person,altersrente)).toEqual(1072.11);//?1071.88
       expect(undertest.volleErwerbsminderungMonat(person,altersrente)).toEqual(89.342);
       expect(undertest.volleVersicherungen(person)).toEqual(65.70);
       expect(undertest.volleErwerbsminderung(person,altersrente)).toEqual(444.958);
    });
});
