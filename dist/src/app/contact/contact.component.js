"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CustomValidators_1 = require("../forms/CustomValidators");
var person_dao_1 = require("./../data/person.dao");
var ContactComponent = /** @class */ (function () {
    function ContactComponent(formBuilder, personDao) {
        this.formBuilder = formBuilder;
        this.personDao = personDao;
        this.person = personDao.singleton();
    }
    ContactComponent.prototype.ngOnInit = function () {
        this.contactForm = this.formBuilder.group({
            name: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.required, CustomValidators_1.default.validateEmail]],
            content: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10)]]
        });
        this.random = Math.random() * 100;
    };
    ContactComponent.prototype.submitForm = function () {
        console.log(this.contactForm);
    };
    ContactComponent = __decorate([
        core_1.Component({
            selector: 'kontakt',
            templateUrl: './contact.component.html',
            styleUrls: ['./contact-component.css']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, person_dao_1.PersonDao])
    ], ContactComponent);
    return ContactComponent;
}());
exports.ContactComponent = ContactComponent;
//# sourceMappingURL=contact.component.js.map