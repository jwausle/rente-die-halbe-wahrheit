"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var versicherung_dao_1 = require("./../../app/data/versicherung.dao");
describe("VersicherungDaoTest", function () {
    var undertest;
    beforeEach(testing_1.async(function () {
        undertest = new versicherung_dao_1.VersicherungDao();
    }));
    it('#simple test', function () {
        expect(undertest.versicherungen(0, 100)).toEqual(10.95);
        expect(undertest.versicherungen(0, 1000)).toEqual(109.5);
        expect(undertest.versicherungen(10, 100)).toEqual(2.7);
        expect(undertest.versicherungen(10, 1000)).toEqual(-63); // Darf das negativ sein?
    });
});
//# sourceMappingURL=versicherung.dao.spec.js.map