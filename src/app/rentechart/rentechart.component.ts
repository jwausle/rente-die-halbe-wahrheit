import { HinterbliebenenRenteDao } from './../rente3/hinterbliebenenrente.dao';
import { ErwerbsminderungsRenteDao } from './../rente2/erwerbsminderungsrente.dao';
import { Altersrente, AltersrenteDao } from './../rente1/altersrente.dao';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PersonDao, Person } from '../data/person.dao';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'rentechart',
  //styleUrls: ['./rentechart.component.css'],
  styles: [require('./rentechart.component.css')],
  //templateUrl: './rentechart.component.html'
  template: require('./rentechart.component.html')
})
export class AuswertungComponent implements OnInit { 
  private alterrente: Altersrente;
  private person: Person;
  private name: string;

  private single: any[]  
  private view: any[] = [700, 400];
  
  // options
  showXAxis = false;
  showYAxis = false;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Population';
  
  colorScheme = {
    domain: ['#6699FF']
  };
  
  constructor(private personDao:PersonDao, //
     private altersrenteDao:AltersrenteDao,//
     private erwerbsminderungsDao:ErwerbsminderungsRenteDao,//
     private hinterbliebenenDao:HinterbliebenenRenteDao) {
    this.person = personDao.singleton();
    this.alterrente = altersrenteDao.singleton(this.person);
  }
  
  ngOnInit(): void {
    this.name = this.person.name;
    
    const einkommen = this.person.nettoEinkommen;
    const krankengeld = einkommen * 80/100;
    const erwerbsminderung = this.erwerbsminderungsDao.volleErwerbsminderung(this.person,this.alterrente);
    const pflegefall = erwerbsminderung;
    const invaliditaet  = erwerbsminderung;
    const wittwenrente = this.hinterbliebenenDao.wittwenRente();
    const rente = this.altersrenteDao.renteNetto(this.person);

    this.single = [
      { "name": "Einkommen", "value": einkommen},
      { "name": "Krankengeld", "value": krankengeld},
      { "name": "Erwerbsminderung", "value": erwerbsminderung},
      { "name": "Pflegefall", "value": pflegefall},
      { "name": "Invalidität", "value": invaliditaet},
      { "name": "Hinterbliebenenrente", "value": wittwenrente},
      { "name": "Langzeitrente", "value": rente}
    ]
  }
}
