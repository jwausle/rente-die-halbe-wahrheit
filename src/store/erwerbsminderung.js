import Logger from '../mixins/Logger'
import Assert from '../mixins/Assert'
import Altersrente from './altersrente'
import Versicherung from './versicherung'

export default {
  verbose: false,
  methods: {
    /** Brutto einkommen des Ehegatten im Jahr 19200 */
    ehegattenEinkommenBruttoImJahr (person) {
      Assert.requireDefined(person, 'person - must be defined')
      Assert.requireDefined(person.bruttoEinkommenEhePartner, 'person.bruttoEinkommenEhePartner - must be defined')
      let monatsEinkommenOrNull = person.bruttoEinkommenEhePartner
      Logger.methods.log('Store.erwerbsminderungsrente', 'calcualating ehe einkommen brutto/jahr ...', this.verbose)
      Logger.methods.log('Store.erwerbsminderungsrente', '- einkommen (monat): ' + monatsEinkommenOrNull + ' (erwartet:19200)', this.verbose)
      if (monatsEinkommenOrNull == null) {
        Logger.methods.log('Store.erwerbsminderungsrente', 'calcualating ehe einkommen brutto/jahr: ' + 0, this.verbose)
        return 0
      }
      let bruttoProJahr = monatsEinkommenOrNull * 12
      Logger.methods.log('Store.erwerbsminderungsrente', 'calcualating ehe einkommen brutto/jahrr: ' + bruttoProJahr, this.verbose)
      return bruttoProJahr
    },
    /** Versorgunsgsausgleich ()? 2688 */
    ehegattenVaImJahr (person, config) {
      Logger.methods.log('Store.erwerbsminderungsrente', 'calcualating ehepartner  ...', this.verbose)
      let ehegattenEinkommenBruttoImJahr1 = this.ehegattenEinkommenBruttoImJahr(person)
      let versorgungsausgleich = Math.round(ehegattenEinkommenBruttoImJahr1 * config.vorsorgeausgleich * 1000) / 1000
      Logger.methods.log('Store.erwerbsminderungsrente', 'calcualating ehepartner VA: ' + versorgungsausgleich, this.verbose)
      return versorgungsausgleich
    },
    /** Pro Jahr 1000 euro */
    kinderEinnahmenImJahr (person, config) {
      Logger.methods.log('Store.erwerbsminderungsrente', 'calcualating kinder geld ...', this.verbose)
      let kindergeld = person.kinder * config.kinderfreibetrag
      Logger.methods.log('Store.erwerbsminderungsrente', 'calcualating kinder geld: ' + kindergeld, this.verbose)
      return kindergeld
    },
    /** Netto einkommen des Ehegatten im Jahr 15512 */
    ehegattenEinkommenNettoImJahr (person, config) {
      Assert.requireDefined(person, 'person - must be defined')
      Logger.log('Store.erwerbsminderungsrente', 'calcualating ehe einkommen netto ...', this.verbose)
      let brutto = this.ehegattenEinkommenBruttoImJahr(person)
      let ehegattenVaImJahr1 = this.ehegattenVaImJahr(person, config)
      let kinderFreibetrag = this.kinderEinnahmenImJahr(person, config)
      let netto = brutto - ehegattenVaImJahr1 - kinderFreibetrag
      Logger.log('Store.erwerbsminderungsrente', 'calcualating ehe einkommen netto: ' + netto, this.verbose)
      return netto
    },
    /** Stand der Renteninfo 35 */
    alterRenteninfo (person) {
      const geburtsjahr = person.geburtstag.getFullYear()
      return person.jahrRenteninfo - 1 - geburtsjahr
    },
    /** Jahr renteneintritt 2045 */
    sjahrRenteneintritt (person, config) {
      Assert.requireDefined(person, 'person - must be defined')
      Assert.requireDefined(person.geburtstag, 'person.geburtstag - must be defined')
      Assert.requireDefined(config, 'config - must be defined')
      Assert.requireDefined(config.renteneintritt, 'config.renteneintritt - must be defined')
      return person.geburtstag.getFullYear() + config.renteneintritt
    },
    /** Jahr renteneintritt 100 */
    besteuerungsAnteil (person, config) {
      Assert.requireDefined(person, 'person - must be defined')
      Assert.requireDefined(config, 'config - must be defined')
      const jahr = Altersrente.methods.jahrRenteneintritt(person, config)
      switch (jahr) {
        case 2014:
          return 68
        case 2015:
          return 70
        case 2016:
          return 72
        case 2017:
          return 74
        case 2018:
          return 76
        case 2019:
          return 78
        case 2020:
          return 80
        case 2021:
          return 81
        case 2022:
          return 82
        case 2023:
          return 83
        case 2024:
          return 84
        case 2025:
          return 85
        case 2026:
          return 86
        case 2027:
          return 87
        case 2028:
          return 88
        case 2029:
          return 89
        case 2030:
          return 90
        case 2031:
          return 91
        case 2032:
          return 92
        case 2033:
          return 93
        case 2034:
          return 94
        case 2035:
          return 95
        case 2036:
          return 96
        case 2037:
          return 97
        case 2038:
          return 98
        case 2039:
          return 99
        default:
          return 100
      }
    },
    /**  0 */
    ehegattenEinkommensSteuer (person, config) {
      const einkommen = this.ehegattenEinkommenNettoImJahr(person, config)
      const einkommen50prozent = einkommen / 2
      return this.steuer_einkommensSteuer(einkommen50prozent)
    },
    /**  0 */
    ehegattenEinkommensSteuerGrund (person, config) {
      const einkommensSteuer = this.ehegattenEinkommensSteuer(person, config)
      const soli = this.steuer_soli(einkommensSteuer, config)
      return einkommensSteuer + soli
    },
    /** 7200 */
    emEinkommenImJahr (person, config) {
      Assert.requireDefined(person, 'person - must be defined')
      Assert.requireDefined(person.rente, 'person.rente - must be defined')
      Assert.requireDefined(person.rente.voll, 'person.rente.voll - must be defined')
      Assert.requireDefined(config, 'config - must be defined')
      let prozent = this.besteuerungsAnteil(person, config) / 100
      let einkommen = person.rente.voll * 12 * prozent
      Logger.methods.log('Store.erwerbsminderungsrente', 'EM einkommen im jahr: ' + einkommen, this.verbose)
      return einkommen
    },
    /** 0 */
    emEinkommensSteuer (person, config) {
      const einkommen = this.emEinkommenImJahr(person, config)
      return this.steuer_einkommensSteuer(einkommen)
    },
    /** 0 */
    emEinkommensSteuerGrund (person, config) {
      Logger.methods.log('Store.erwerbsminderungsrente', 'Einkommenssteuer ...', this.verbose)
      const einkommenSteuer = this.emEinkommensSteuer(person, config)
      const soli = this.steuer_soli(einkommenSteuer, config)
      const steuer = einkommenSteuer + soli
      Logger.methods.log('Store.erwerbsminderungsrente', 'Einkommenssteuer em:' + steuer + ' =ekst:' + einkommenSteuer + ' + soli:' + soli + ' (erwartet:0=0+0)', this.verbose)
      return steuer
    },
    /** 3600 */
    em2EinkommenImJahr (person, config) {
      const prozent = this.besteuerungsAnteil(person, config) / 100
      return person.renteVoll / 2 * 12 * prozent
    },
    /** 0 */
    em2EinkommensSteuer (person, config) {
      const einkommen = this.em2EinkommenImJahr(person, config)
      return this.steuer_einkommensSteuer(einkommen)
    },
    /** 0 */
    em2EinkommensSteuerGrund (person, config) {
      const einkommenSteuer = this.em2EinkommensSteuer(person, config)
      const soli = this.steuer_soli(einkommenSteuer, config)
      return einkommenSteuer + soli
    },
    /** 26400 (expected: 22.712,00)  */
    eheEinkommenImJahr (person, config) {
      Assert.requireDefined(person, 'person - must be defined')
      Assert.requireDefined(config, 'config - must be defined')
      Logger.log('Store.erwerbsminderungsrente', 'calcualating ehe einkommens steuer/jahr ...', this.verbose)
      const einkommenGatte = this.ehegattenEinkommenNettoImJahr(person, config)
      const einkommen = this.emEinkommenImJahr(person, config)
      const einkommenEhe = einkommenGatte + einkommen
      Logger.log('Store.erwerbsminderungsrente', 'calcualating ehe einkommens steuer/jahr:' + einkommenEhe + ' = kunde:' + einkommen + ' + gatte:' + einkommenGatte + ' (erwartet: 22712=15512+7200', this.verbose)
      return einkommenEhe
    },
    /** 1.016 */
    eheEinkommensSteuer (person, config) {
      Assert.requireDefined(person, 'person - must be defined')
      Assert.requireDefined(config, 'config - must be defined')
      Logger.log('Store.erwerbsminderungsrente', 'calcualating ehe einkommens steuer ... ', this.verbose)
      let einkommen = this.eheEinkommenImJahr(person, config)
      let steuer = this.steuer_einkommensSteuer(einkommen / 2) * 2
      Logger.log('Store.erwerbsminderungsrente', 'calcualating ehe einkommens steuer: ' + steuer, this.verbose)
      return steuer
    },
    /** 1071,88 = 1.016,00 + 55,88 */
    eheEinkommensSteuerGrund (person, config) {
      Assert.requireDefined(person, 'person - must be defined')
      Assert.requireDefined(config, 'config - must be defined')
      Logger.log('Store.erwerbsminderungsrente', 'calcualating ehe einkommens steuer + soli ... ', this.verbose)
      const einkommenSteuer = this.eheEinkommensSteuer(person, config)
      const soli = this.steuer_soli(einkommenSteuer, config)
      let steuer = Math.round((einkommenSteuer + soli) * 1000) / 1000
      Logger.log('Store.erwerbsminderungsrente', 'calcualating ehe einkommens steuer + soli: ' + steuer, this.verbose)
      return steuer
    },
    /** 19.112,00   */
    ehe2EinkommenImJahr (person, config) {
      return this.ehegattenEinkommenNettoImJahr(person, config) +
             this.em2EinkommenImJahr(person, config)
    },
    /** 0 */
    ehe2EinkommensSteuer (person, config) {
      const einkommen = this.ehe2EinkommenImJahr(person, config)
      return this.steuer_einkommensSteuer(einkommen / 2) * 2
    },
    /** 384,02 = 364,00  + 20,02 */
    ehe2EinkommensSteuerGrund (person, config) {
      const einkommenSteuer = this.ehe2EinkommensSteuer(person, config)
      const soli = this.steuer_soli(einkommenSteuer, config)
      return Math.round((einkommenSteuer + soli) * 1000) / 1000
    },
    /** 1071,88 */
    volleErwerbsminderungBrutto (person, config) {
      if (person.verheiratet) {
        return Math.round((this.eheEinkommensSteuerGrund(person, config) - this.ehegattenEinkommensSteuerGrund(person, config)) * 1000) / 1000
      }
      return Math.round(this.emEinkommensSteuerGrund(person, config) * 1000) / 1000
    },
    /** -89,32 EUR */
    volleErwerbsminderungMonat_ (person, config) {
      Assert.requireDefined(person, 'person - must be defined')
      Assert.requireDefined(config, 'config - must be defined')
      Logger.log('Store.erwerbsminderungsrente', 'volleErwerbsminderungMonat.brutto ...', this.verbose)
      let brutto = this.volleErwerbsminderungBrutto(person, config)
      Logger.log('Store.erwerbsminderungsrente', 'volleErwerbsminderungMonat.brutto = ' + brutto, this.verbose)
      return Math.round(brutto / 12 * 1000) / 1000
    },
    /** -65,70 EUR */
    volleVersicherungen_ (person, config) {
      Assert.requireDefined(person, 'person must be defined')
      Assert.requireDefined(person.krankenVersicherung, 'person.krankenVersicherung must be defined')
      Assert.requireDefined(person.rente, 'person.rente must be defined')
      Assert.requireDefined(person.rente.voll, 'person.rente.voll must be defined')
      return Versicherung.methods.versicherungen(person.krankenVersicherung, person.rente.voll, config)
    },
    /** 444,98 EUR */
    volleErwerbsminderung_ (person, config) {
      Assert.requireDefined(person, 'person must be defined')
      Assert.requireDefined(person.rente, 'person.rente must be defined')
      Assert.requireDefined(person.rente.voll, 'person.rente.voll must be defined')
      return person.rente.voll -
             this.volleErwerbsminderungMonat_(person, config) -
             this.volleVersicherungen_(person, config)
    },
    /** 384,02 */
    halbeErwerbsminderungBrutto (person, config) {
      if (person.verheiratet) {
        return this.ehe2EinkommensSteuerGrund(person, config) - this.ehegattenEinkommensSteuerGrund(person, config)
      }
      return this.emEinkommensSteuerGrund(person, config)
    },
    /** -32,00 EUR EUR */
    halbeErwerbsminderungMonat (person, config) {
      return Math.round(this.halbeErwerbsminderungBrutto(person, config) / 12 * 1000) / 1000
    },
    /** -32,85 EUR */
    halbeVersicherungen_ (person, config) {
      Assert.requireDefined(person, 'person must be defined')
      Assert.requireDefined(person.krankenVersicherung, 'person.krankenVersicherung must be defined')
      Assert.requireDefined(person.rente, 'person.rente must be defined')
      Assert.requireDefined(person.rente.voll, 'person.rente.voll must be defined')
      return Versicherung.methods.versicherungen(person.krankenVersicherung, person.rente.voll / 2, config)
    },
    /** 235,15 EUR */
    halbeErwerbsminderung_ (person, config) {
      Assert.requireDefined(person, 'person must be defined')
      Assert.requireDefined(person.rente, 'person.rente must be defined')
      Assert.requireDefined(person.rente.voll, 'person.rente.voll must be defined')
      return person.rente.voll / 2 -
             this.halbeErwerbsminderungMonat(person, config) -
             this.halbeVersicherungen_(person, config)
    },
    steuer_soli (einkommen, config) {
      Assert.requireDefined(config, 'config must be defined')
      Assert.requireDefined(config.soli, 'config.soli must be defined')
      return einkommen * config.soli
    },
    steuer_einkommensSteuer (einkommen) {
      if (einkommen <= 8652) {
        return 0
      } else if (einkommen <= 13669) {
        return Math.round(((974.58 * (einkommen - 8354) / 10000 + 1400) * (einkommen - 8354) / 10000) * 1000) / 1000
      } else if (einkommen <= 52881) {
        return Math.round(((228.74 * (einkommen - 13469) / 10000 + 2397) * (einkommen - 13469) / 10000 + 971) * 1000) / 1000
      } else if (einkommen <= 250730) {
        return (einkommen * 0.42 - 8239)
      } else {
        return einkommen * 0.45 - 15761
      }
    }
  }
}
