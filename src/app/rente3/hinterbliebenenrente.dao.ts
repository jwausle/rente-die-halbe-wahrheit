import { VersicherungDao } from './../data/versicherung.dao';
import { SteuerDao } from './../data/steuer.dao';
import { AltersrenteDao } from './../rente1/altersrente.dao';

import { PersonDao, Person, Region } from './../data/person.dao';
import { Injectable, Inject } from '@angular/core';

// F9  := person.verheirated
// F11 := person.isEheVor2002
// F13 := person.geburtstagEhePartner
// F21 := person.bruttoEinkommenEhePartner
// F23 := person.kinder
// F25 := person.regionOstOderWest
const NEUJAHR_1962:Date = new Date('1962-01-02T00:00:00')

export enum RentenAnspruch{
    PROZENT_60 = 60/100,
    PROZENT_55 = 55/100,
    PROZENT_25 = 25/100
}

const PROZENT_40:number = 40/100; 

@Injectable()
export class HinterbliebenenRenteDao {
    private person: Person;
    
    constructor(private personDao:PersonDao, private altersrenteDao:AltersrenteDao, private versicherungDao:VersicherungDao){
        this.person = personDao.singleton();
    }

    altesOderNeuesRecht():boolean {
        const isKundeVor1962geboren = this.person.geburtstag < NEUJAHR_1962;
        const isGatteVor1962geboren = this.person.geburtstagEhePartner < NEUJAHR_1962;
        const isEinEhepartnerVor1962geboren = isKundeVor1962geboren || isGatteVor1962geboren;
        
        const isEheVor2002 = this.person.isEheVor2002
        
        if(isEinEhepartnerVor1962geboren && isEheVor2002){
            return true;
        } 
        return false;
    }

    grosseOderKleineWittwenRente():boolean{    
        const grenze:Date = new Date();
        grenze.setFullYear(-45);
        grenze.setMonth(-2)

        const isGatteVor45JahrenGeboren = this.person.geburtstagEhePartner < grenze;
        const gibtEsKinder = this.person.kinder > 0;
        return gibtEsKinder || isGatteVor45JahrenGeboren;
    }

    anspruchInProzent():RentenAnspruch{
        const grXorKlRente = this.grosseOderKleineWittwenRente();
        const altesXorNeuesRecht = this.altesOderNeuesRecht();

        if(grXorKlRente && altesXorNeuesRecht){
            return RentenAnspruch.PROZENT_60;
        } else if (grXorKlRente && !altesXorNeuesRecht){
            return RentenAnspruch.PROZENT_55;
        } else {
            return RentenAnspruch.PROZENT_25;
        }
    }
    /**
     * 
     * @param {number} [kinder] if unset use 'person.kinder'
     * @returns {number} euro betrag pro monat 
     * @memberof HinterbliebenenRenteDao
     */
    kinderZuschlag(kinder?:number):number {
        if(kinder == undefined){
            kinder = this.person.kinder;
        }
        switch(kinder){
            case 0: return 0;
            case 1: return 26.99;
            case 2: return 40.48;
            case 3: return 53.98;
            case 4: return 67.47;
            case 5: return 80.96;
            default: return 94.46;
        }
    }

    wittwenRenteBrutto():number{
        const renteGatte = this.altersrenteDao.renteReal(this.person,this.altersrenteDao.singleton(this.person));
        const anspruchInProzent:number = this.anspruchInProzent().valueOf();
        const kinderZuschlag:number = this.kinderZuschlag();
        return renteGatte * anspruchInProzent + kinderZuschlag;
    }

    wittwenRenteGekuerzt():number{
        return Math.max(0, this.wittwenRenteBrutto() - this.rest40prozent());
    }

    wittwenRente():number {
        const rente = this.wittwenRenteGekuerzt();
        return Math.round((rente - this.versicherungDao.versicherungen(0,rente))* 1000)/1000;
    }

    freibetrag(region?:Region):number {
        if(region == null){
            region = this.person.regionOstOrWest;
        }
        switch(region){
            case Region.OST: return 783.816;
            case Region.WEST: return 819.192;
            default: throw new Error("Unknown region: " + region);
        }
    }

    pauschal40prozent():number {
        return this.person.bruttoEinkommenEhePartner * PROZENT_40;       
    }

    restNachAbzugFreibetrag():number {
        return Math.round(Math.max(0,this.person.bruttoEinkommenEhePartner - this.pauschal40prozent() - this.freibetrag())*1000)/1000;
    }
    
    rest40prozent():number {
        return Math.round(this.restNachAbzugFreibetrag() * PROZENT_40 * 1000)/1000;       
    }

    halbwaisenRente():number {
        return 117;
    }
}