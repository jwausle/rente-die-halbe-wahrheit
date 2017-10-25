"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SOLI_PROZENT = 5.5 / 100;
core_1.Injectable();
var SteuerDao = /** @class */ (function () {
    function SteuerDao() {
    }
    /**
     *
     * Soli beitrag auf den Wert.
     *
     * @param {number} value not null value
     * @returns {number} value * 5.5%
     * @memberof SteuerDao
     */
    SteuerDao.prototype.soli = function (value) {
        return value * SOLI_PROZENT;
    };
    /**
     *
     * Frage: warum andere constanten in altersrente.dao?
     *
     * @param {number} einkommen not null einkommen
     * @returns {number} steuer auf einkommen
     * @memberof SteuerDao
     */
    SteuerDao.prototype.einkommensSteuer = function (einkommen) {
        if (einkommen <= 8652) {
            return 0;
        }
        else if (einkommen <= 13669) {
            return Math.round(((974.58 * (einkommen - 8354) / 10000 + 1400) * (einkommen - 8354) / 10000) * 1000) / 1000;
        }
        else if (einkommen <= 52881) {
            return Math.round(((228.74 * (einkommen - 13469) / 10000 + 2397) * (einkommen - 13469) / 10000 + 971) * 1000) / 1000;
        }
        else if (einkommen <= 250730) {
            return (einkommen * 0.42 - 8239);
        }
        else {
            return einkommen * 0.45 - 15761;
        }
    };
    return SteuerDao;
}());
exports.SteuerDao = SteuerDao;
//# sourceMappingURL=steuer.dao.js.map