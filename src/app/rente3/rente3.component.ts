import { HinterbliebenenRenteDao } from './hinterbliebenenrente.dao';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PersonDao, Person } from '../data/person.dao';

@Component({
  selector: 'rente3',
  styleUrls: ['./rente3.component.css'],
  templateUrl: './rente3.component.html'
})
export class HinterbliebenenrenteComponent implements OnInit{ 
  private person: Person;
  
  private wittwenRenteBrutto: number;
  private lohn: number;
  private pauschal40: number;
  private lohnAnrechenbar: number;
  private freibetrag: number;
  private lohnRest: number;
  private lohnRest40: number;
  private wittwenRenteGekuerzt: number;
  private wittwenRente: number;
  private halbwaisenRente: number;
  
  constructor(private personDao:PersonDao,private dao: HinterbliebenenRenteDao) {    
    this.person = personDao.singleton();
  }
  
  ngOnInit(): void {
    this.wittwenRenteBrutto = this.dao.wittwenRenteBrutto();
    this.lohn = this.person.bruttoEinkommenEhePartner;
    this.pauschal40 = this.dao.pauschal40prozent();
    this.lohnAnrechenbar = this.lohn - this.pauschal40;
    this.freibetrag = this.dao.freibetrag();
    this.lohnRest = this.dao.restNachAbzugFreibetrag();
    this.lohnRest40 = this.dao.rest40prozent();
    this.wittwenRenteGekuerzt = this.dao.wittwenRenteGekuerzt();
    this.wittwenRente = this.dao.wittwenRente();
    this.halbwaisenRente = this.dao.halbwaisenRente();
  }

}
