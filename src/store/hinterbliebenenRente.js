import Altersrente from './altersrente'
import Versicherung from './versicherung'
import {REGION_OST, REGION_WEST} from './index'
import Logger from '../mixins/Logger'

export const NEUJAHR_1962 = new Date('1962-01-02T00:00:00')

export const PROZENT_60 = 60 / 100
export const PROZENT_55 = 55 / 100
export const PROZENT_40 = 40 / 100
export const PROZENT_25 = 25 / 100

export default {
  verbose: false,
  methods: {
    altesOderNeuesRecht (person) {
      const isKundeVor1962geboren = person.geburtstag < NEUJAHR_1962
      const isGatteVor1962geboren = person.geburtstagEhePartner < NEUJAHR_1962
      const isEinEhepartnerVor1962geboren = isKundeVor1962geboren || isGatteVor1962geboren
      const isEheVor2002 = person.isEheVor2002

      Logger.methods.log('Hinterbliebenenrente', 'isEinEhepartnerVor1962geboren=' + isEinEhepartnerVor1962geboren + ' && isEheVor2002=' + isEheVor2002, this.verbose)
      if (isEinEhepartnerVor1962geboren && isEheVor2002) {
        return true
      }
      return false
    },
    grosseOderKleineWittwenRente (person) {
      const grenze = new Date()
      grenze.setFullYear(-45)
      grenze.setMonth(-2)

      const isGatteVor45JahrenGeboren = person.geburtstagEhePartner < grenze
      const gibtEsKinder = person.kinder > 0
      return gibtEsKinder || isGatteVor45JahrenGeboren
    },
    anspruchInProzent (person) {
      const grXorKlRente = this.grosseOderKleineWittwenRente(person)
      const altesXorNeuesRecht = this.altesOderNeuesRecht(person)

      if (grXorKlRente && altesXorNeuesRecht) {
        return PROZENT_60
      } else if (grXorKlRente && !altesXorNeuesRecht) {
        return PROZENT_55
      } else {
        return PROZENT_25
      }
    },
    /**
     *
     * @param {number} [kinder] if unset use 'person.kinder'
     * @returns {number} euro betrag pro monat
     * @memberof HinterbliebenenRenteDao
     */
    kinderZuschlag (person) {
      switch (person.kinder) {
        case 0:
          return 0
        case 1:
          return 26.99
        case 2:
          return 40.48
        case 3:
          return 53.98
        case 4:
          return 67.47
        case 5:
          return 80.96
        default:
          return 94.46
      }
    },
    wittwenRenteBrutto_ (person, altersrente) {
      console.log('>> ' + person)
      console.log('>> ' + altersrente)
      const renteGatte = Altersrente.methods.renteRealMonat(person, altersrente)
      const anspruchInProzent = this.anspruchInProzent(person).valueOf()
      const kinderZuschlag = this.kinderZuschlag(person)
      return renteGatte * anspruchInProzent + kinderZuschlag
    },
    wittwenRenteGekuerzt_ (person, altersrente) {
      return Math.max(0, this.wittwenRenteBrutto_(person, altersrente) - this.rest40prozent(person))
    },
    wittwenRente_ (person, altersrente) {
      const rente = this.wittwenRenteGekuerzt_(person, altersrente)
      return Math.round((rente - Versicherung.methods.versicherungen(person.krankenVersicherung, rente, altersrente)) * 1000) / 1000
    },
    freibetrag_ (person) {
      switch (person.regionOstOrWest) {
        case REGION_OST:
          return 783.816
        case REGION_WEST:
          return 819.192
      }
    },
    pauschal40prozent (einkommen) {
      return einkommen * PROZENT_40
    },
    restNachAbzugFreibetrag (person) {
      return Math.round(Math.max(0, person.bruttoEinkommenEhePartner - this.pauschal40prozent(person.bruttoEinkommenEhePartner) - this.freibetrag_(person)) * 1000) / 1000
    },
    rest40prozent (person) {
      return Math.round(this.restNachAbzugFreibetrag(person) * PROZENT_40 * 1000) / 1000
    },
    halbwaisenRente_ () {
      return 117
    }
  }
}
