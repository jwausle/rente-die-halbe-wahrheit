import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AltersrenteDao,Altersrente } from './altersrente.dao';
import { PersonDao, Person } from '../data/person.dao';
import { VersicherungDao } from '../data/versicherung.dao';

@Component({
  selector: 'rente1',
  //styleUrls: ['./rente1.component.css'],
  styles: [require('./rente1.component.css')],
  //templateUrl: './rente1.component.html'
  template: require('./rente1.component.html')
})

export class AltersrenteComponent implements OnChanges, OnInit{ 
  private versicherungDao: VersicherungDao;
  private altersrenteDao: AltersrenteDao;
  private altersrente: Altersrente;
  private person: Person;  
  
  renteBrutto: number;
  versicherung: number;
  einkommensSteuer: number;
  renteNetto:number;
  kaufkraftverlust:number;
  
  constructor(private personDao: PersonDao, private aDao: AltersrenteDao, private vDao:VersicherungDao) {    
    this.person = personDao.singleton();
    this.altersrenteDao = aDao;
    this.versicherungDao = vDao;
    this.altersrente = this.altersrenteDao.singleton(this.person);
  }

  ngOnInit(): void {    
    this.renteBrutto = this.formatEuro(this.altersrenteDao.renteReal(this.person,this.altersrente));
    this.einkommensSteuer = this.formatEuro(this.altersrenteDao.einkommenSteuer(this.person,this.altersrente)/12);
    this.versicherung = this.formatEuro(this.versicherungDao.versicherungen(this.person.krankenVersicherung,this.renteBrutto));
    this.renteNetto = this.formatEuro(this.renteBrutto - this.einkommensSteuer - this.versicherung);
    
    const jahreBisZurRente = 28;
    this.kaufkraftverlust = this.zukunftswert(this.renteNetto,this.altersrente.kaufkraftverlust,28);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("change: " + changes)
  }

  setPersonName(){
    this.person.name = "Jan Winter";
  }

  private zukunftswert(rente:number,zins:number,jahre:number):number {
    var result:number = rente;
    for(var i = 0; i < jahre; i++){
      result = result - (result * zins/100);
    }
    return Math.round(result * 100) / 100;
  }

  changeKaufkraftverlust(newKaufkraftverlust): void {
    const jahreBisZurRente = 28;
    this.kaufkraftverlust = this.zukunftswert(this.renteNetto,this.altersrente.kaufkraftverlust,28);
  }

  private formatEuro(euro:number):number {
    return Math.round(euro * 100.0000000001)/100;
  }
}
