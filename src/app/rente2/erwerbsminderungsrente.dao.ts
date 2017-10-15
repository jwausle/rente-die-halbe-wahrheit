import { PersonDao, Person } from './../data/person.dao';
import { SteuerDao } from './../data/steuer.dao';
import { Altersrente } from './../rente1/altersrente.dao';
import { Injectable, Inject } from '@angular/core';

const WERBUNG:number = 1000;
const VA:number = 0.14;
const KINDER:number = 1000;

/** 7.3%*/
const VERSICHERUNG_PROZENT:number = 7.3/100;
/** 8.4%*/
const KRANKENVERSICHERUNG_PROZENT:number = 8.4/100;
/** 2.55%*/
const PFLEGEVERSICHERUNG_PROZENT:number = 2.55/100;

//Frage: Bedeutung dieser Zahl?
const RENTENWERT:number = 27;
//Frage: Bedeutung dieser Zahl?
const DEK: number = 34857;

@Injectable()
export class ErwerbsminderungsRenteDao{
    steuer: SteuerDao;

    constructor(steuerDao:SteuerDao) {
        this.steuer = steuerDao;
    }
    /** Brutto einkommen des Ehegatten im Jahr 19200 */
    ehegattenEinkommenBruttoImJahr(person:Person){
        const monatsEinkommenOrNull = person.bruttoEinkommenEhePartner;
        console.log("Ehegatten einkommen (monat): " + monatsEinkommenOrNull + " (erwartet:19200)")
        if( monatsEinkommenOrNull == null) {
            return 0;
        }
        return monatsEinkommenOrNull * 12;
    }
    /** VA? 2688 */
    ehegattenVaImJahr(person:Person){
        return Math.round(this.ehegattenEinkommenBruttoImJahr(person) * VA * 1000)/1000;
    }
    /** Pro Jahr 1000 euro */
    kinderEinnahmenImJahr(person:Person){
        return person.kinder * KINDER;
    }     

    /** Netto einkommen des Ehegatten im Jahr 15512 */
    ehegattenEinkommenNettoImJahr(person:Person){
        return this.ehegattenEinkommenBruttoImJahr(person)
        - this.ehegattenVaImJahr(person)
        - this.kinderEinnahmenImJahr(person);
    }

    /** Stand der Renteninfo 35 */
    alterRenteninfo(person: Person): number {
        const geburtsjahr: number = person.geburtstag.getFullYear();
        return person.jahrRenteninfo - 1 - geburtsjahr;
    }

    /** Jahr renteneintritt 2045 */
    jahrRenteneintritt(person: Person, altersrente: Altersrente): number {        
        return person.geburtstag.getFullYear() + altersrente.renteneintritt;
    }

    /** Jahr renteneintritt 100 */
    besteuerungsAnteil(person: Person, altersrente: Altersrente): number {
        const jahr:number = 2045;//this.jahrRenteneintritt(person, altersrente);
        switch(jahr){
            case 2014: return	68;
            case 2015: return	70;
            case 2016: return	72;
            case 2017: return	74;
            case 2018: return	76;
            case 2019: return	78;
            case 2020: return	80;
            case 2021: return	81;
            case 2022: return	82;
            case 2023: return	83;
            case 2024: return	84;
            case 2025: return	85;
            case 2026: return	86;
            case 2027: return	87;
            case 2028: return	88;
            case 2029: return	89;
            case 2030: return	90;
            case 2031: return   91;
            case 2032: return   92;
            case 2033: return	93;
            case 2034: return	94;
            case 2035: return	95;
            case 2036: return	96;
            case 2037: return	97;
            case 2038: return	98;
            case 2039: return	99;
            default:   return  100;
        }
    }

    /**  0 */
    ehegattenEinkommensSteuer(person: Person): number {       
        const einkommen: number = this.ehegattenEinkommenNettoImJahr(person);
        const einkommen50prozent:number = einkommen/2;
        return this.steuer.einkommensSteuer(einkommen50prozent);
    }

    /**  0 */
    ehegattenEinkommensSteuerGrund(person: Person): number {
        const einkommensSteuer: number = this.ehegattenEinkommensSteuer(person);        
        const soli = this.steuer.soli(einkommensSteuer);
        return einkommensSteuer + soli;
    }

    /** 7200 */
    emEinkommenImJahr(person: Person, altersrente: Altersrente):  number {
        const prozent:number = this.besteuerungsAnteil(person,altersrente)/100
        const einkommen = person.renteVoll * 12 * prozent;
        console.log("EM einkommen im jahr: " + einkommen);
        return einkommen;
    }

    /** 0 */
    emEinkommensSteuer(person: Person, altersrente: Altersrente):  number {
        const einkommen = this.emEinkommenImJahr(person,altersrente);
        return this.steuer.einkommensSteuer(einkommen);
    }

    /** 0 */
    emEinkommensSteuerGrund(person: Person, altersrente: Altersrente):  number {
        const einkommenSteuer = this.emEinkommensSteuer(person,altersrente);
        const soli = this.steuer.soli(einkommenSteuer);
        const steuer = einkommenSteuer + soli;
        console.log("Einkommenssteuer em:" + steuer + " =ekst:" + einkommenSteuer + " + soli:" + soli + " (erwartet:0=0+0)")
        return steuer;
    }

    /** 3600 */
    em2EinkommenImJahr(person: Person, altersrente: Altersrente):  number {
        const prozent:number = this.besteuerungsAnteil(person,altersrente)/100
        return person.renteVoll/2 * 12 * prozent;
    }

    /** 0 */
    em2EinkommensSteuer(person: Person, altersrente: Altersrente):  number {
        const einkommen = this.em2EinkommenImJahr(person,altersrente);
        return this.steuer.einkommensSteuer(einkommen);
    }

    /** 0 */
    em2EinkommensSteuerGrund(person: Person, altersrente: Altersrente):  number {
        const einkommenSteuer = this.em2EinkommensSteuer(person,altersrente);
        const soli = this.steuer.soli(einkommenSteuer);
        return einkommenSteuer + soli;
    }

 
    /** 26400 (expected: 22.712,00)  */
    eheEinkommenImJahr(person: Person, altersrente: Altersrente):  number {
        const einkommenGatte = this.ehegattenEinkommenNettoImJahr(person);
        const einkommen = this.emEinkommenImJahr(person,altersrente);
        const einkommenEhe = einkommenGatte + einkommen;
        console.log("Ehe einkommen:" + einkommenEhe + " = kunde:"+ einkommen + " + gatte:" + einkommenGatte + " (erwartet: 22712=15512+7200")
        return einkommenEhe;
    }

    /** 1.016 */
    eheEinkommensSteuer(person: Person, altersrente: Altersrente):  number {
        const einkommen = this.eheEinkommenImJahr(person,altersrente);
        return this.steuer.einkommensSteuer(einkommen/2)*2;
    }

    /** 1071,88 = 1.016,00 + 55,88 */
    eheEinkommensSteuerGrund(person: Person, altersrente: Altersrente):  number {
        const einkommenSteuer = this.eheEinkommensSteuer(person,altersrente);
        const soli = this.steuer.soli(einkommenSteuer);
        return Math.round((einkommenSteuer + soli)*1000)/1000;
    }

    /** 19.112,00   */
    ehe2EinkommenImJahr(person: Person, altersrente: Altersrente):  number {
        return this.ehegattenEinkommenNettoImJahr(person) 
        + this.em2EinkommenImJahr(person,altersrente);
    }

    /** 0 */
    ehe2EinkommensSteuer(person: Person, altersrente: Altersrente):  number {
        const einkommen = this.ehe2EinkommenImJahr(person,altersrente);
        return this.steuer.einkommensSteuer(einkommen/2) * 2;
    }

    /** 384,02 = 364,00  + 20,02 */
    ehe2EinkommensSteuerGrund(person: Person, altersrente: Altersrente):  number {
        const einkommenSteuer = this.ehe2EinkommensSteuer(person,altersrente);
        const soli = this.steuer.soli(einkommenSteuer);
        return Math.round((einkommenSteuer + soli)*1000)/1000;
    }

    /** 1071,88 */
    volleErwerbsminderungBrutto(person: Person, altersrente: Altersrente):  number {
        if(person.verheiratet){
            return Math.round((this.eheEinkommensSteuerGrund(person,altersrente) - this.ehegattenEinkommensSteuerGrund(person))*1000)/1000;
        }
        return Math.round(this.emEinkommensSteuerGrund(person,altersrente)*1000)/1000;
    }

    /** -89,32 EUR */
    volleErwerbsminderungMonat(person: Person, altersrente: Altersrente):  number {
        return Math.round(this.volleErwerbsminderungBrutto(person,altersrente)/12 * 1000)/1000;
    }

    /** -65,70 EUR */
    volleVersicherungen(person:Person):number {
        if(person.krankenVersicherung > 0){
            return person.krankenVersicherung - (person.renteVoll * VERSICHERUNG_PROZENT);
        }
        return person.renteVoll * (KRANKENVERSICHERUNG_PROZENT + PFLEGEVERSICHERUNG_PROZENT);
    }

    /** 444,98 EUR */
    volleErwerbsminderung(person: Person, altersrente: Altersrente):  number {
        return person.renteVoll
        - this.volleErwerbsminderungMonat(person,altersrente)
        - this.volleVersicherungen(person);
    }

    /** 384,02*/
    halbeErwerbsminderungBrutto(person: Person, altersrente: Altersrente):  number {
        if(person.verheiratet){
            return this.ehe2EinkommensSteuerGrund(person,altersrente) - this.ehegattenEinkommensSteuerGrund(person);
        }
        return this.emEinkommensSteuerGrund(person,altersrente);
    }

    /** -32,00 EUR EUR */
    halbeErwerbsminderungMonat(person: Person, altersrente: Altersrente):  number {
        return Math.round(this.halbeErwerbsminderungBrutto(person,altersrente)/12 * 1000)/1000;
    }

    /** -32,85 EUR*/
    halbeVersicherungen(person:Person):number {
        if(person.krankenVersicherung > 0){
            return person.krankenVersicherung - (person.renteVoll/2 * VERSICHERUNG_PROZENT)
        }
        return person.renteVoll/2 * (KRANKENVERSICHERUNG_PROZENT + PFLEGEVERSICHERUNG_PROZENT);
    }
    
    /** 235,15 EUR */
    halbeErwerbsminderung(person: Person, altersrente: Altersrente):  number {
        return person.renteVoll/2
        - this.halbeErwerbsminderungMonat(person,altersrente)
        - this.halbeVersicherungen(person);
    }
}