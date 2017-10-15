import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ErwerbsminderungsRenteDao } from './erwerbsminderungsrente.dao';
import { AltersrenteDao,Altersrente } from '../rente1/altersrente.dao';
import { PersonDao, Person } from '../data/person.dao';
import { VersicherungDao } from '../data/versicherung.dao';

@Component({
  selector: 'rente2',
  styleUrls: ['./rente2.component.css'],
  templateUrl: './rente2.component.html'
})
export class ErwerbsminderungsrenteComponent implements OnInit{ 
  private erwerbsminderungsRenteDao: ErwerbsminderungsRenteDao;
  private versicherungDao: VersicherungDao;
  private altersrenteDao: AltersrenteDao;
  private altersrente: Altersrente;
  private person: Person;  
  
  volleRenteBrutto: number;
  volleErwerbsmiderungMonat: number;
  volleVersicherungen: number;
  volleErwerbsminderung: number;

  halbeRenteBrutto: number;
  halbeErwerbsmiderungMonat: number;
  halbeVersicherungen: number;
  halbeErwerbsminderung: number;
  
  versicherung: number;
  einkommensSteuer: number;
  renteNetto:number;
  
  constructor(private personDao: PersonDao, private aDao: AltersrenteDao, private vDao:VersicherungDao, private emDao: ErwerbsminderungsRenteDao) {    
    this.person = personDao.singleton();
    this.altersrenteDao = aDao;
    this.versicherungDao = vDao;
    this.erwerbsminderungsRenteDao = emDao;
    this.altersrente = this.altersrenteDao.singleton(this.person);
  }

  ngOnInit(): void {    
    this.volleRenteBrutto = this.altersrenteDao.renteReal(this.person,this.altersrente);
    this.einkommensSteuer = this.altersrenteDao.einkommenSteuer(this.person,this.altersrente)/12;
    this.versicherung = this.versicherungDao.versicherungen(this.person.krankenVersicherung,this.volleRenteBrutto);
    this.renteNetto = this.volleRenteBrutto - this.einkommensSteuer - this.versicherung;

    this.volleErwerbsmiderungMonat =  this.erwerbsminderungsRenteDao.volleErwerbsminderungMonat(this.person,this.altersrente);
    this.volleVersicherungen = this.erwerbsminderungsRenteDao.volleVersicherungen(this.person);
    this.volleErwerbsminderung = this.erwerbsminderungsRenteDao.volleErwerbsminderung(this.person,this.altersrente);

    this.halbeRenteBrutto =  this.volleRenteBrutto/2
    this.halbeErwerbsmiderungMonat = this.erwerbsminderungsRenteDao.halbeErwerbsminderungMonat(this.person,this.altersrente);
    this.halbeVersicherungen = this.erwerbsminderungsRenteDao.halbeVersicherungen(this.person);
    this.halbeErwerbsminderung = this.erwerbsminderungsRenteDao.halbeErwerbsminderung(this.person,this.altersrente);
  }
}
