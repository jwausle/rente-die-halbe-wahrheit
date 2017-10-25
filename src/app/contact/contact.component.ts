import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CustomValidators from '../forms/CustomValidators';

import { PersonDao, Person } from './../data/person.dao';

@Component({
  selector: 'kontakt',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact-component.css']
})
export class ContactComponent implements OnInit {
  private contactForm: FormGroup;
  private random: Number;
  private person: Person;

  constructor(private formBuilder: FormBuilder, private personDao: PersonDao) {
    this.person = personDao.singleton();
  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.validateEmail]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
    this.random = Math.random() * 100;
  }
  submitForm(): void {
    console.log(this.contactForm);
  }
}
