import {RENTEN_EINTRITT, RENTENEINTRITT_, MAX_VORZEITIGER_RENTEN_EINTRITT_MONATE} from './index'
/** From Store: Logger.methods.log('Store', 'message', state.config.verbose) */
import Logger from '../mixins/Logger'
import Assert from '../mixins/Assert'
import {date} from 'quasar'

function Unit () {
  this.MONTHS = date.months
}
const unit = new Unit()

export default {
  verbose: false,
  methods: {
    alterRenteninfo (person) { /** Stand der Renteninfo 35 */
      Assert.requireDefined(person, 'person must be defined')
      Assert.requireDefined(person.geburtstag, 'person.geburtstag must be defined')
      Assert.requireDate(person.geburtstag, 'person.geburtstag must be a date')
      let geburtsjahr = person.geburtstag.getFullYear()
      return person.jahrRenteninfo - 1 - geburtsjahr
    },
    jahrRenteneintritt (person, config) { /** Jahr renteneintritt 2045 */
      Assert.requireDefined(person, 'person must be defined')
      Assert.requireDefined(person.geburtstag, 'person.geburtstag must be defined')
      Assert.requireDefined(config, 'config must be defined')
      Assert.requireDefined(config.renteneintritt, 'config.renteneintritt must be defined')
      return person.geburtstag.getFullYear() + config.renteneintritt
    },
    renteneintrittSoll (person) { /** Geburtstag + 67 */
      Assert.requireDefined(person, 'person must be defined')
      Assert.requireDefined(person.geburtstag, 'person.geburtstag must be defined')
      let renteneintritt = date.addToDate(person.geburtstag, {year: RENTEN_EINTRITT})
      return renteneintritt
    },
    renteneintrittSoll2 (person) { /** Geburtstag + 67 jahre + 1 Monat */
      let renteneintritt = date.addToDate(this.renteneintrittSoll(person), {month: 1})
      return renteneintritt
    },

    /** Arbeitsmonate 544 */
    arbeitsMonate (person, config) {
      Assert.requireDefined(person, 'person must be defined')
      Assert.requireDefined(person.berufsBegin, 'person.berufsBegin must be defined')
      Assert.requireDate(person.berufsBegin, 'person.berufsBegin must be a date')
      Assert.requireDefined(person.geburtstag, 'person.geburtstag must be defined')
      Assert.requireDate(person.geburtstag, 'person.geburtstag must be a date')
      Assert.requireDefined(config, 'config must be defined')
      Assert.requireDefined(config.renteneintritt, 'config.renteneintritt must be defined')
      Assert.requireDefined(config.renteneintrittMonat, 'config.renteneintrittMonat must be defined')
      let berufsBeginInMonaten = date.getDateDiff(person.berufsBegin, person.geburtstag, unit.MONTHS)
      let rentenEintrittTag = date.addToDate(person.geburtstag, {year: config.renteneintritt, month: config.renteneintrittMonat})
      let rentenEintrittInMonaten = date.getDateDiff(rentenEintrittTag, person.geburtstag, unit.MONTHS)
      return rentenEintrittInMonaten - berufsBeginInMonaten
    },
    arbeitsJahre (person, config) { /** Arbeitsjahre 45,33 */
      let jahre = Math.round(this.arbeitsMonate(person, config) / 12 * 100) / 100
      return jahre
    },
    vorzeitigerRentenEintrittInMonaten (config) { /** Vorzeitiger Renteneintritt in Monaten 36 */
      Assert.requireDefined(config, 'config must be defined')
      Assert.requireDefined(config.renteneintritt, 'config.renteneintritt must be defined')
      Assert.requireDefined(config.renteneintrittMonat, 'config.renteneintrittMonat must be defined')
      let monate = (RENTEN_EINTRITT - config.renteneintritt) * 12 - config.renteneintrittMonat
      return Math.min(MAX_VORZEITIGER_RENTEN_EINTRITT_MONATE, monate)
    },
    alterRentenEintrittInMonaten (person) { /** Geburtsjahr constante from:1953 to:>1964 => 758 - >780 monate */
      Assert.requireDefined(person, 'person must be defined')
      Assert.requireDefined(person.geburtstag, 'person.geburtstag must be defined')
      Assert.requireDate(person.geburtstag, 'person.geburtstag must be a date')
      switch (person.geburtstag.getFullYear()) {
        case 1953: return 758
        case 1954: return 760
        case 1955: return 762
        case 1956: return 764
        case 1957: return 766
        case 1958: return 768
        case 1959: return 770
        case 1960: return 772
        case 1961: return 774
        case 1962: return 776
        case 1963: return 778
        default: return 780
      }
    },
    alterRentenEintritt (person) { /** Geburtsjahr constante 'geburtstagsJahrConstant' in rounded monaten */
      return Math.round(this.alterRentenEintrittInMonaten(person) / 12)
    },
    geburtstagsMonatConstantRest (person) { /** Rest of round 'geburtstagsMonatConstant' */
      return this.alterRentenEintrittInMonaten(person) - (this.alterRentenEintritt(person) * 12)
    },
    isLangVersichert (config) { /** Ist person lange versichert */
      Assert.requireDefined(config, 'config must be defined')
      Assert.requireDefined(config.renteneintritt, 'config.renteneintritt must be defined')
      Assert.requireDefined(config.renteneintrittMonat, 'config.renteneintrittMonat must be defined')
      let left = this.vorzeitigerRentenEintrittInMonaten() <= 45
      let right = config.renteneintritt * 12 + config.renteneintrittMonat >= this.alterRentenEintrittInMonaten()
      return left && right
    },
    isVor63oderKleiner35 (person, config) { /** Ist person vor 63 oder <35 Jahre */
      Assert.requireDefined(config, 'config must be defined')
      Assert.requireDefined(config.renteneintritt, 'config.renteneintritt must be defined')
      if (config.renteneintritt < 63) {
        return RENTENEINTRITT_.VOR_63
      }
      Logger.methods.log('config', 'isVor63oderKleiner35 >= 63', this.verbose)
      let left = this.arbeitsJahre(person, config) < 35
      Logger.methods.log('config', 'isVor63oderKleiner35.arbeitsjahre=' + left, this.verbose)
      let right = config.renteneintritt < RENTEN_EINTRITT
      Logger.methods.log('config', 'isVor63oderKleiner35.renteneintritt=' + right, this.verbose)
      if (left && right) {
        return RENTENEINTRITT_.VOR_67
      }
      Logger.methods.log('config', 'isVor63oderKleiner35 >= 67 return ' + RENTENEINTRITT_.MIT_67, this.verbose)
      return RENTENEINTRITT_.MIT_67
    },
    rentenKuerzung (person, config) { /** Potentielle renten kürzung in % 18.0 */
      switch (this.isVor63oderKleiner35(person, config)) {
        case RENTENEINTRITT_.VOR_63:
        case RENTENEINTRITT_.MIT_67:
          return 0
      }
      let monate = this.vorzeitigerRentenEintrittInMonaten()
      let langversichert = 0
      if (this.isLangVersichert()) {
        langversichert = monate * 0.3
      }
      return monate * person.renteKuerzungProzent + langversichert
    },
    rentenZuschlag (person, config) { /** Potentieller rentenzuschlag in % 0 */
      switch (this.isVor63oderKleiner35(person, config)) {
        case RENTENEINTRITT_.VOR_63:
        case RENTENEINTRITT_.MIT_67:
          return 0
      }
      let monate = this.vorzeitigerRentenEintrittInMonaten(config)
      return monate * -0.5 * person.renteKuerzungProzent
    },
    besteuerungsAnteil (person, config) { /** Besteuerungsanteil 100% */
      let jahr = this.jahrRenteneintritt(person, config)
      switch (jahr) {
        case 2014: return 68
        case 2015: return 70
        case 2016: return 72
        case 2017: return 74
        case 2018: return 76
        case 2019: return 78
        case 2020: return 80
        case 2021: return 81
        case 2022: return 82
        case 2023: return 83
        case 2024: return 84
        case 2025: return 85
        case 2026: return 86
        case 2027: return 87
        case 2028: return 88
        case 2029: return 89
        case 2030: return 90
        case 2031: return 91
        case 2032: return 92
        case 2033: return 93
        case 2034: return 94
        case 2035: return 95
        case 2036: return 96
        case 2037: return 97
        case 2038: return 98
        case 2039: return 99
        default: return 100
      }
    },
    renteBrutto (person) { return this.renteRealMonat(person) },
    renteRealMonat (person, config) { /** 600,00 EUR */
      let vor63oderKleiner35 = this.isVor63oderKleiner35(person, config)
      Logger.methods.log('config', 'svor63oderKleiner35=' + vor63oderKleiner35, this.verbose)
      switch (vor63oderKleiner35) {
        case RENTENEINTRITT_.VOR_63:
        case RENTENEINTRITT_.VOR_67:
          return 0
      }
      Logger.methods.log('config - vor63oderKleiner35=' + vor63oderKleiner35 + '>=67', this.verbose)
      let zuschlag = this.rentenZuschlag(person, config)
      let kuerzung = this.rentenKuerzung(person, config)
      Logger.methods.log('config', 'kürzung=' + kuerzung + ' zuschlag=' + zuschlag + ' voll=' + person.rente.voll, this.verbose)
      if (zuschlag > 0) {
        return person.rente.voll + person.rente.voll * zuschlag
      } else {
        return person.rente.voll - person.rente.voll * kuerzung
      }
    },
    einkommen (person, config) {
      let monatsRente = this.renteRealMonat(person, config)
      let steuerAnteil = this.besteuerungsAnteil(person, config) / 100
      return monatsRente * 12 * steuerAnteil
    },
    einkommenSteuerMonat (person, config) {
      let einkommen = this.einkommen(person, config)
      if (einkommen <= 8652) {
        return 0
      } else if (einkommen <= 13669) {
        return (993.62 * (einkommen - 8652) / 10000 + 1400) * (einkommen - 8652) / 10000
      } else if (einkommen <= 53665) {
        return (225.4 * (einkommen - 13669) / 10000 + 2397) * (einkommen - 13669) / 10000 + 952.48
      } else if (einkommen <= 254446) {
        return (einkommen * 0.42 - 8394.14)
      } else {
        return einkommen * 0.45 - 16027.52
      }
    },
    soli (person, config) {
      return this.einkommenSteuerMonat(person, config) * 5.5 / 100
    },
    renteNettoMonat (person, config) {
      Assert.requireDefined(person, 'person must be defined')
      Assert.requireDefined(person.krankenVersicherung, 'person.krankenVersicherung must be defined')
      let renteBrutto = this.renteRealMonat(person, config)
      let einkommensSteuer = this.einkommenSteuerMonat(person, config) / 12
      let versicherung = this.versicherungen(person.krankenVersicherung, renteBrutto, config)
      let renteNetto = renteBrutto - einkommensSteuer - versicherung
      return Math.round(renteNetto * 1000) / 1000
    },
    zukunftswert (rente, zins, jahre) {
      var result = rente
      for (var i = 0; i < jahre; i++) {
        result = result - (result * zins / 100)
      }
      return Math.round(result * 100) / 100
    }
  }
}
