import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { SteuerDao } from './../../app/data/steuer.dao';

describe("VersicherungDaoTest", () => {
    let undertest: SteuerDao;

    beforeEach(async(() => {
        undertest = new SteuerDao();
    }));

    it('#simple steuer values', () => {
        expect(undertest.einkommensSteuer(1000)).toEqual(0);
        expect(undertest.einkommensSteuer(10000)).toEqual(256.844);
        expect(undertest.einkommensSteuer(13000)).toEqual(860.806);
        expect(undertest.einkommensSteuer(14000)).toEqual(1098.926);
        expect(undertest.einkommensSteuer(53000)).toEqual(14021);
        expect(undertest.einkommensSteuer(54000)).toEqual(14441);
        expect(undertest.einkommensSteuer(100000)).toEqual(33761);
        expect(undertest.einkommensSteuer(1000000)).toEqual(434239);
    });

    it('# es(20408/2)*2 = 584', () => {
        expect(undertest.einkommensSteuer(20408/2)).toEqual(292.355);
        expect(undertest.einkommensSteuer(20408/2) * 2).toEqual(584.71);
        expect(undertest.einkommensSteuer(20408)).toEqual(2744.416);        
    });
});