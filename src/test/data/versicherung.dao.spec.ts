import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { VersicherungDao } from './../../app/data/versicherung.dao';

describe("VersicherungDaoTest", () => {
    let undertest: VersicherungDao;

    beforeEach(async(() => {
        undertest = new VersicherungDao();
    }));

    it('#simple test', () => {
        expect(undertest.versicherungen(0,100)).toEqual(10.95);
        expect(undertest.versicherungen(0,1000)).toEqual(109.5);
        
        expect(undertest.versicherungen(10,100)).toEqual(2.7);
        expect(undertest.versicherungen(10,1000)).toEqual(-63);// Darf das negativ sein?
    });
});