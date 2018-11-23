import Vue from 'vue'
import Vuex from 'vuex'
import Altersrente from './altersrente'
import Erwerbsminderung from './erwerbsminderung.js'
import HinterbliebenenRente from './hinterbliebenenRente'
import Versicherung from './versicherung'
/** From Store: Logger.methods.log('Store', 'message', state.config.verbose) */
import Logger from '../mixins/Logger'
import Assert from '../mixins/Assert'

Vue.use(Vuex)

const SOLI_PROZENT = 5.5 / 100

/** VA = Versorgungsausgleich */
const VA = 0.14
const KINDER = 1000

/** 7.3% */
export const VERSICHERUNG_PROZENT = 7.3 / 100
/** 8.4% */
export const KRANKENVERSICHERUNG_PROZENT = 8.4 / 100
/** 2.55% */
export const PFLEGEVERSICHERUNG_PROZENT = 2.55 / 100

/** Frage: Bedeutung dieser Zahl? */
export const RENTENWERT = 27
/** Frage: Bedeutung dieser Zahl ? */
export const DEK = 34857

export const REGION_OST = 'Ost'
export const REGION_WEST = 'West'
export const DEFAULT_REGION = 'Ost'

export const RENTEN_EINTRITT = 67
export const VORZEITIGER_RENTEN_EINTRITT = 64
export const MAX_VORZEITIGER_RENTEN_EINTRITT_MONATE = 48
export const RENTENEINTRITT_ = {
  VOR_63: 'VOR_63',
  VOR_67: 'VOR_67',
  MIT_67: 'MIT_67'
}

const state = {
  name: 'Max Mustermann',
  person: {
    name: 'Max Mustermann',
    geburtstag: new Date(1977, 4, 21),
    geburtstagEhePartner: new Date(1978, 5, 20),
    kinder: 1,
    berufsBegin: new Date(1999, 9, 1),
    jahrRenteninfo: new Date(2018, 11, 11),
    rentenStart: new Date(1977 + 65, 4, 21),
    bruttoEinkommenEhePartner: 1600,
    krankenVersicherung: 0,
    regionOstOrWest: DEFAULT_REGION,
    einkommen: {
      netto: 2400,
      brutto: 3000,
      steuer: 500,
      versicherung: 400,
      kaufkraftverlust: 100
    },
    rente: {
      voll: 1000,
      prognose: 500,
      bislang: 800,
      brutto: 1100,
      netto: 700
    },
    altersrente: {
      renteBrutto: 1000,
      brutto: 1000,
      steuer: 300,
      versicherung: 200,
      netto: 500
    },
    erwerbsminderungsrente: {
      vollMonat: 1000,
      vollVersicherungMonat: 200,
      vollErwerbsminderungMonat: 800,
      halbMonat: 500,
      halbVersicherungMonat: 100,
      halbErwerbsminderungMonat: 400
    },
    hinterbliebenenrente: {
      brutto: 500,
      freibetrag: 117,
      lohnRest: 0,
      gekuerzt: 0,
      netto: 0
    }
  },
  config: {
    renteneintritt: 64,
    renteneintrittMonat: 0,
    kaufkraftverlust: 0.84,
    verbose: false,
    soli: SOLI_PROZENT,
    vorsorgeausgleich: VA,
    kinderfreibetrag: KINDER,
    pflegeversicherung: PFLEGEVERSICHERUNG_PROZENT,
    krankenversicherung: KRANKENVERSICHERUNG_PROZENT,
    versicherungAllg: VERSICHERUNG_PROZENT
  }
}

const getters = {
  verbose (state) {
    return state.config.verbose
  },
  getName (state) {
    return state.person.name
  },
  getPerson (state) {
    return state.person
  },
  getRente (state) {
    return state.person.rente
  },
  getAltersrente (state) {
    let person = state.person
    let config = state.config
    person.altersrente.renteBrutto = Altersrente.methods.renteRealMonat(person, config)
    person.altersrente.brutto = Altersrente.methods.renteRealMonat(person, config)
    person.altersrente.steuer = Altersrente.methods.einkommenSteuerMonat(person, config)
    person.altersrente.versicherung = Versicherung.methods.versicherungen(person.krankenVersicherung, person.rente.voll, config)
    person.altersrente.netto = person.altersrente.brutto - person.altersrente.steuer - person.altersrente.versicherung
    let jahreBisZurRente = person.rentenStart.getFullYear() - person.jahrRenteninfo.getFullYear()
    person.einkommen.kaufkraftverlust = Altersrente.methods.zukunftswert(person.altersrente.netto, config.kaufkraftverlust, jahreBisZurRente)
    return person.altersrente
  },
  getErwerbsminderungsrente (state) {
    Logger.methods.log('Store', 'erwerbsminderungsrente ... ' + Erwerbsminderung.verbose, state.config.verbose)
    state.person.erwerbsminderungsrente.vollMonat = Erwerbsminderung.methods.volleErwerbsminderungMonat_(state.person, state.config)
    state.person.erwerbsminderungsrente.vollVersicherungMonat = Erwerbsminderung.methods.volleVersicherungen_(state.person, state.config)
    state.person.erwerbsminderungsrente.vollErwerbsminderungMonat = Erwerbsminderung.methods.volleErwerbsminderung_(state.person, state.config)
    state.person.erwerbsminderungsrente.halbMonat = Erwerbsminderung.methods.halbeErwerbsminderungMonat(state.person, state.config)
    state.person.erwerbsminderungsrente.halbVersicherungMonat = Erwerbsminderung.methods.halbeVersicherungen_(state.person, state.config)
    state.person.erwerbsminderungsrente.halbErwerbsminderungMonat = Erwerbsminderung.methods.halbeErwerbsminderung_(state.person, state.config)
    Logger.methods.log('Store', 'person=' + JSON.stringify(state.person), state.config.verbose)
    Logger.methods.log('Store', 'erwerbsminderungsrente=' + JSON.stringify(state.person.erwerbsminderungsrente), state.config.verbose)
    return state.person.erwerbsminderungsrente
  },
  getHinterbliebenenrente (state) {
    let person = state.person
    let config = state.config
    person.hinterbliebenenrente.brutto = HinterbliebenenRente.methods.wittwenRenteBrutto_(person, config)
    person.hinterbliebenenrente.freibetrag = HinterbliebenenRente.methods.freibetrag_(person)
    person.hinterbliebenenrente.lohnRest = HinterbliebenenRente.methods.restNachAbzugFreibetrag(person)
    person.hinterbliebenenrente.gekuerzt = HinterbliebenenRente.methods.wittwenRenteGekuerzt_(person, config)
    person.hinterbliebenenrente.netto = HinterbliebenenRente.methods.wittwenRente_(person, config)
    person.hinterbliebenenrente.halbwaisen = HinterbliebenenRente.methods.halbwaisenRente_()
    return person.hinterbliebenenrente
  },
  getEinkommen (state) {
    let person = state.person
    let config = state.config
    person.einkommen.steuer = Erwerbsminderung.methods.eheEinkommensSteuer(person, config) / 12
    person.einkommen.versicherung = Versicherung.methods.versicherungen(person.krankenVersicherung, person.rente.voll, config)
    return person.einkommen
  },
  getConfig (state) {
    return state.config
  }
}

const mutations = {
  setVerbose (state, trueOrFalse) {
    state.config.verbose = trueOrFalse
    Altersrente.verbose = trueOrFalse
    Erwerbsminderung.verbose = trueOrFalse
    HinterbliebenenRente.verbose = trueOrFalse
  },
  setName (state, name) {
    state.person.name = name
  },
  setGeburtstag (state, geburtstag) {
    state.person.geburtstag = Assert.requireDate(geburtstag, 'geburtstag - must be a date')
  },
  setGeburtstagEhePartner (state, geburtstag) {
    state.person.geburtstagEhePartner = Assert.requireDate(geburtstag, 'geburtstagEhePartner - must be a date')
  },
  setKinder (state, kinder) {
    state.person.kinder = Number(kinder)
  },
  setBerufsBegin (state, datum) {
    state.person.berufsBegin = Assert.requireDate(datum, 'berufsBegin - must be a date')
  },
  setRentenStart (state, datum) {
    state.person.rentenStart = Assert.requireDate(datum, 'rentenStart - must be a date')
  },
  setRentenInfo (state, datum) {
    state.person.jahrRenteninfo = Assert.requireDate(datum, 'rentenInfo - must be a date')
  },
  setEinkommen (state, euro) {
    state.person.einkommen.brutto = Number(euro)
  },
  setEinkommenEhePartner (state, euro) {
    state.person.bruttoEinkommenEhePartner = Number(euro)
  },
  setRegion (state, region) {
    state.person.regionOstOrWest = region
  },
  setRente (state, rente) {
    state.person.rente = rente
  },
  setRentenEintrittJahr (state, jahr) {
    state.config.renteneintritt = jahr
    let person = state.person
    let config = state.config
    Logger.methods.log('Store', 'config = ' + JSON.stringify(config), state.config.verbose)
    person.altersrente.renteBrutto = Altersrente.methods.renteRealMonat(person, config)
    Logger.methods.log('Store', '>> altersrente.renteBrutto = ' + person.altersrente.renteBrutto, state.config.verbose)
  },
  setRentenEintrittMonat (state, monat) {
    state.config.renteneintrittMonat = monat
    let person = state.person
    let config = state.config
    Logger.methods.log('Store', 'config = ' + JSON.stringify(config), state.config.verbose)
    person.altersrente.renteBrutto = Altersrente.methods.renteRealMonat(person, config)
  },
  setKaufkraftVerlustInProzent (state, prozent) {
    state.config.kaufkraftverlust = prozent
  },
  setSoli (state, prozent) {
    state.config.soli = prozent
  },
  setVorsorgeausgleich (state, euro) {
    state.config.vorsorgeausgleich = euro
  },
  setKinderfreibetrag (state, euro) {
    state.config.kinderfreibetrag = euro
  },
  setPflegeversicherung (state, prozent) {
    state.config.pflegeversicherung = prozent
  },
  setKrankenversicherung (state, prozent) {
    state.config.krankenversicherung = prozent
  },
  setVersicherungAllg (state, prozent) {
    state.config.versicherungAllg = prozent
  }
}

const actions = {}

export default new Vuex.Store(
  {
    getters,
    state,
    mutations,
    actions
  })
