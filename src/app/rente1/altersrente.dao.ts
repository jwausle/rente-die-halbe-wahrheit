import { PersonDao, Person } from './../data/person.dao';
import { VersicherungDao } from './../data/versicherung.dao';
import { Injectable, Inject } from '@angular/core';

export interface Altersrente {
    renteneintritt: number;
    renteneintrittMonat: number;
    kaufkraftverlust: number;
}

export enum Renteneintritt {
    VOR_63, VOR_67, MIT_67
}

const RENTEN_EINTRITT: number = 67;
const VORZEITIGER_RENTEN_EINTRITT: number = 64;
const MAX_VORZEITIGER_RENTEN_EINTRITT_MONATE: number = 48


@Injectable()
export class AltersrenteDao {
    private versicherungDao: VersicherungDao;

    constructor(private vDao:VersicherungDao){
        this.versicherungDao = vDao;
    }

    singleton(person:Person):Altersrente{
        return {
            renteneintritt: 64,
            renteneintrittMonat: 0,
            kaufkraftverlust: 0.84
        }
    }
    
    /** Berechne monate vor 67 Jahre. */
    monateVor67(altersrente:Altersrente): number {
        const monate: number = (RENTEN_EINTRITT - altersrente.renteneintritt) * 12 - altersrente.renteneintrittMonat;        
        return Math.min(monate, MAX_VORZEITIGER_RENTEN_EINTRITT_MONATE);
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

    /** Geburtstag + 67 */
    renteneintrittSoll(person: Person): Date {
        const renteneintritt = new Date(person.geburtstag);
        renteneintritt.setFullYear(person.geburtstag.getFullYear() + RENTEN_EINTRITT);
        return renteneintritt;
    }

    /** Geburtstag + 67 jahre + 1 Monat */
    renteneintrittSoll2(person: Person): Date {
        const renteneintritt = new Date(this.renteneintrittSoll(person));
        renteneintritt.setMonth(renteneintritt.getMonth() + 1);
        return renteneintritt;
    }

    /** Arbeitsmonate 544 */
    arbeitsMonate(person: Person, altersrente: Altersrente): number {
        const berufsbeginInMonaten = person.berufsBegin.getFullYear() * 12 + person.berufsBegin.getMonth();
        const geburtstagInMonaten = person.geburtstag.getFullYear()  * 12 + person.geburtstag.getMonth();                
        const months = berufsbeginInMonaten - geburtstagInMonaten;        
        return (altersrente.renteneintritt * 12 + altersrente.renteneintrittMonat) - months;
    }

    /** Arbeitsjahre 45,33 */
    arbeitsJahre(person: Person, altersrente: Altersrente): number {
        const jahre = Math.round(this.arbeitsMonate(person,altersrente)/12 * 100)/100 ;
        return jahre;
    }

    /** Vorzeitiger Renteneintritt in Monaten 36 */
    vorzeitigerRentenEintrittInMonaten(altersrente: Altersrente): number {        
        const istVorzeitigerRentenEintrittInMonaten = (RENTEN_EINTRITT - altersrente.renteneintritt) * 12 - altersrente.renteneintrittMonat;
        return Math.min(MAX_VORZEITIGER_RENTEN_EINTRITT_MONATE, istVorzeitigerRentenEintrittInMonaten);
    }

    /** Geburtsjahr constante from:1953 to:>1964 => 758 - >780 monate*/
    alterRentenEintrittInMonaten(person:Person):number {
        switch(person.geburtstag.getFullYear()){
            case 1953: return 758;
            case 1954: return 760;
            case 1955: return 762;
            case 1956: return 764;
            case 1957: return 766;
            case 1958: return 768;
            case 1959: return 770;
            case 1960: return 772;
            case 1961: return 774;
            case 1962: return 776;
            case 1963: return 778;
            default:   return 780
        }
    }
    /** Geburtsjahr constante 'geburtstagsJahrConstant' in rounded monaten.*/
    alterRentenEintritt(person:Person):number {
        return Math.round(this.alterRentenEintrittInMonaten(person)/12);
    }

    /** Rest of round 'geburtstagsMonatConstant' */
    geburtstagsMonatConstantRest(person:Person):number {
        return this.alterRentenEintrittInMonaten(person) - (this.alterRentenEintritt(person) * 12)
    }

    /** Ist person lange versichert */
    isLangVersichert(person:Person, altersrente: Altersrente):boolean {
        const left: boolean = 45 >= this.vorzeitigerRentenEintrittInMonaten(altersrente);
        const right: boolean = altersrente.renteneintritt * 12 + altersrente.renteneintrittMonat >= this.alterRentenEintrittInMonaten(person);
        return left && right;
    }
    /** Ist person vor 63 oder <35 Jahre */
    isVor63oderKleiner35(person:Person, altersrente: Altersrente):Renteneintritt {
        if (altersrente.renteneintritt < 63){        
            return Renteneintritt.VOR_63;
        }
        
        const left: boolean = this.arbeitsJahre(person,altersrente) < 35;
        const right: boolean = altersrente.renteneintritt < RENTEN_EINTRITT;        
        if (left && right){
            return Renteneintritt.VOR_67;
        }
        
        return Renteneintritt.MIT_67;
    }

    /** Potentielle renten kürzung in % 18.0 */
    rentenKuerzung(person:Person, altersrente: Altersrente):number {
        switch(this.isVor63oderKleiner35(person,altersrente)){
            case Renteneintritt.VOR_63: 
            case Renteneintritt.MIT_67:
                return 0;            
        }        
        const monate = this.vorzeitigerRentenEintrittInMonaten(altersrente);
        let langversichert = 0
        if(this.isLangVersichert(person, altersrente)) {
            langversichert = monate * 0.3;
        }
        return monate * person.renteKuerzungProzent + langversichert;
    } 

    /** Potentieller rentenzuschlag in % 0*/
    rentenZuschlag(person:Person, altersrente: Altersrente):number {
        switch(this.isVor63oderKleiner35(person,altersrente)){
            case Renteneintritt.VOR_63: 
            case Renteneintritt.MIT_67:
                return 0;            
        }
        const monate = this.vorzeitigerRentenEintrittInMonaten(altersrente);
        return monate * -0.5 * person.renteKuerzungProzent;
    }
    /** Besteuerungsanteil 100% */
    besteuerungsAnteil(person: Person, altersrente: Altersrente): number {
        const jahr = this.jahrRenteneintritt(person,altersrente);
        switch(jahr){
            case 2014: return 68;
            case 2015: return 70;
            case 2016: return 72;
            case 2017: return 74;
            case 2018: return 76;
            case 2019: return 78;
            case 2020: return 80;
            case 2021: return 81;
            case 2022: return 82;
            case 2023: return 83;
            case 2024: return 84;
            case 2025: return 85;
            case 2026: return 86;
            case 2027: return 87;
            case 2028: return 88;
            case 2029: return 89;
            case 2030: return 90;
            case 2031: return 91;
            case 2032: return 92;
            case 2033: return 93;
            case 2034: return 94;
            case 2035: return 95;
            case 2036: return 96;
            case 2037: return 97;
            case 2038: return 98;
            case 2039: return 99;
            default: return	100;
        }
    }

    /** 600,00 EUR */
    renteReal(person: Person, altersrente: Altersrente): number {
        switch(this.isVor63oderKleiner35(person,altersrente)){
            case Renteneintritt.VOR_63:
            case Renteneintritt.VOR_67: 
               return 0;
        }

        const zuschlag: number = this.rentenZuschlag(person,altersrente);
        const kuerzung: number = this.rentenKuerzung(person,altersrente);
        if(zuschlag > 0){
            return person.renteVoll + person.renteVoll * zuschlag;
        } else {
            return person.renteVoll - person.renteVoll * kuerzung;
        }
    }

    einkommen(person: Person, altersrente: Altersrente): number {
        const monatsRente : number = this.renteReal(person, altersrente);        
        const steuerAnteil: number = this.besteuerungsAnteil(person,altersrente)/100;
        return monatsRente * 12 * steuerAnteil;
    }

    einkommenSteuer(person: Person, altersrente: Altersrente): number {
        const einkommen: number = this.einkommen(person,altersrente);
        if(einkommen <= 8652){
            return 0;
        } else if (einkommen <= 13669) {
            return (993.62 * (einkommen - 8652 )/10000 + 1400) * (einkommen - 8652)/10000;
        } else if (einkommen <= 53665) {
            return (225.4*(einkommen-13669)/10000+2397)*(einkommen-13669)/10000+952.48;
        } else if (einkommen <= 254446) {
            return (einkommen*0.42-8394.14);
        } else {
            return einkommen*0.45-16027.52;
        }     
    }

    soli(person: Person, altersrente: Altersrente): number {
        return this.einkommenSteuer(person, altersrente) * 5.5/100;
    }

    einkommenSteuer2(person: Person, altersrente: Altersrente): number {
        return this.einkommenSteuer(person,altersrente) + this.soli(person,altersrente);
    }

    renteNetto(person:Person):number {
        const altersrente = this.singleton(person);
        const renteBrutto = this.renteReal(person,altersrente);
        const einkommensSteuer = this.einkommenSteuer(person,altersrente)/12;
        const versicherung = this.versicherungDao.versicherungen(person.krankenVersicherung,renteBrutto);
        const renteNetto = renteBrutto - einkommensSteuer - versicherung;
        return Math.round(renteNetto * 1000)/1000;
    }
}
