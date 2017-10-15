import { Injectable, Inject } from '@angular/core';

export interface Person {
    name: string;
    geburtstag: Date;
    berufsBegin: Date;
    nettoEinkommen: number;
    jahrRenteninfo: number;
    /** 600 */
    renteVoll: number;
    /** 250 */
    renteBislang: number;
    /** 800 */
    rentePrognose: number;
    /** 1000 mit 1% */
    renteMitAnpassung1: number;
    /** 1500 mit 2% */
    renteMitAnpassung2: number;
    krankenVersicherung?: number;
    renteKuerzungProzent: number;
    verheiratet: boolean;
    kinder: number;
    isEheVor2002: boolean;
    geburtstagEhePartner?: Date;
    bruttoEinkommenEhePartner?: number;
    regionOstOrWest: Region;
}

export enum Region{
    OST = "Ost",
    WEST = "West"
}

const REGION_OST:Region=Region.OST;
const REGION_WEST:Region=Region.WEST;
const DEFAULT_REGION:Region=Region.OST;


const SINGLETON : Person = { 
    name: 'Max Mustermann', 
    geburtstag: new Date('1980-01-01T00:00:00'),
    berufsBegin: new Date('1998-09-01T00:00:00'),
    nettoEinkommen: 1500,
    jahrRenteninfo: 2016,
    renteVoll: 600,
    renteBislang: 250,
    rentePrognose: 800,
    renteMitAnpassung1: 1000,
    renteMitAnpassung2: 1500,
    //  krankenVersicherung: 200,
    renteKuerzungProzent: 0.2,
    verheiratet: true,
    kinder: 1,
    isEheVor2002: false,
    geburtstagEhePartner: new Date('1981-01-01T00:00:00'),
    bruttoEinkommenEhePartner: 1600,
    regionOstOrWest: DEFAULT_REGION
};

@Injectable()
export class PersonDao {
    constructor() {}

    singleton(): Person {
        return SINGLETON;   
    }
}