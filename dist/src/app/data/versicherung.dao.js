"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var VERSICHERUNG_PROZENT = 7.3 / 100;
var KRANKENVERSICHERUNG_PROZENT = 8.4 / 100;
var PFLEGEVERSICHERUNG_PROZENT = 2.55 / 100;
core_1.Injectable();
var VersicherungDao = /** @class */ (function () {
    function VersicherungDao() {
    }
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
    VersicherungDao.prototype.versicherungen = function (krankenversicherung, rente) {
        if (krankenversicherung > 0) {
            return krankenversicherung - (rente * VERSICHERUNG_PROZENT);
        }
        return rente * (KRANKENVERSICHERUNG_PROZENT + PFLEGEVERSICHERUNG_PROZENT);
    };
    return VersicherungDao;
}());
exports.VersicherungDao = VersicherungDao;
//# sourceMappingURL=versicherung.dao.js.map