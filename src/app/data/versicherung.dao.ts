import { Injectable, Inject } from '@angular/core';

const VERSICHERUNG_PROZENT:number = 7.3/100;
const KRANKENVERSICHERUNG_PROZENT:number = 8.4/100;
const PFLEGEVERSICHERUNG_PROZENT:number = 2.55/100;

Injectable()
export class VersicherungDao{
    
    /**
     * Berechnet die rente - VERSICHERUNGSANTEIL. Es gibt 2 Fälle:  
     * 
     * 1. krankenversicherung >  0 : krankenversicherung - ( rente x 7.3%)
     * 2. krankenversicherung <= 0 : rente x (8.4% + 7.3%)
     * 
     * @param {number} krankenversicherung >=0 kranken versicherung
     * @param {number} rente >0 rente
     * @returns {number} rente - VERSICHEREUNGSANTEIL
     * @memberof VersicherungDao
     */
    versicherungen(krankenversicherung:number,rente:number):number {
        if(krankenversicherung > 0){
            return krankenversicherung - (rente * VERSICHERUNG_PROZENT)
        }
        return rente * (KRANKENVERSICHERUNG_PROZENT + PFLEGEVERSICHERUNG_PROZENT);
    }
}