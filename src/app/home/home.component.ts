import { PersonDao, Person } from './../data/person.dao';

import { Component, OnInit } from '@angular/core';
import { SplitPaneModule } from 'ng2-split-pane/lib/ng2-split-pane';

@Component({
  selector: 'home',
  //styleUrls: ['./home.component.css'],
  styles: [require('./home.component.css')],
  //templateUrl: './home.component.html'
  template: require('./home.component.html')
})
export class HomeComponent{
  person: Person;
  
  constructor(private personDao: PersonDao) {    
    this.person = personDao.singleton();

  }

  setPersonName(){
    this.person.name = "Jekaterina Winter";
  }
  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    } else {
        return null;
    }
  }
}
