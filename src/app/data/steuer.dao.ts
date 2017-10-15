import { PersonDao, Person } from './../data/person.dao';
import { Altersrente } from './../rente1/altersrente.dao';
import { Injectable, Inject } from '@angular/core';

const SOLI_PROZENT:number = 5.5/100;

Injectable()
export class SteuerDao{
    /**
     * 
     * Soli beitrag auf den Wert.
     * 
     * @param {number} value not null value
     * @returns {number} value * 5.5%
     * @memberof SteuerDao
     */
    soli(value:number):number {
        return value * SOLI_PROZENT;
    }

    /**
     * 
     * Frage: warum andere constanten in altersrente.dao?
     * 
     * @param {number} einkommen not null einkommen
     * @returns {number} steuer auf einkommen
     * @memberof SteuerDao 
     */
    einkommensSteuer(einkommen:number):number {
        if(einkommen <= 8652){
            return 0;
        } else if (einkommen <= 13669) {
            return Math.round(((974.58 * (einkommen - 8354 )/10000 + 1400) * (einkommen - 8354)/10000) * 1000)/1000 ;
        } else if (einkommen <= 52881) {
            return Math.round(((228.74*(einkommen-13469)/10000+2397)*(einkommen-13469)/10000+971)*1000)/1000;
        } else if (einkommen <= 250730) {
            return (einkommen*0.42-8239);
        } else {
            return einkommen*0.45-15761;
        }            
    }
}
