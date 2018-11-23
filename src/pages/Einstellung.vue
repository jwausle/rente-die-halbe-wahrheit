<template>
  <div class="borderfat">
    <div class="row items-center">
      <div class="col-sm-4">
        <q-checkbox v-model="verbose" label="Verbose"/>
      </div>
      <div class="col-sm-7">
        (beta) 'Verbose' zeigt Berechungszwischenschritte in der Browser-Console an [z.B. Menu:Anzeige/Entwickler/Entwicklertools].
      </div>
    </div>
    <div class="row items-center">
      <div class="col-sm-11">
        <hr>
      </div>
    </div>
    <div class="row items-center">
      <div class="col-sm-4">
        <q-field
          icon="monetization_on"
          :error="vorsorgeausgleichHasError"
          error-label="Bitte einen Wert zwischen 0 und 100 eingegben"
        >
          <q-input v-model="vorsorgeausgleich" stack-label="Vorsorgeausgleich" suffix="%" v-on:input="vorsorgeausgleich.set"/>
        </q-field>
      </div>
      <div class="col-sm-7">
        Der Versorgungsausgleich ist der bei der Scheidung stattfindende Ausgleich der während der Ehezeit von den Eheleuten erworbenen Anwartschaften
        und Aussichten auf eine Versorgung wegen Alters oder verminderter Erwerbsfähigkeit.
      </div>
    </div>
    <div class="row items-center">
      <div class="col-sm-4">
        <q-field
          icon="supervisor_account"
          :error="soliHasError"
          error-label="Bitte einen Wert zwischen 0 und 100 eingegben"
        >
          <q-input v-model="soli" stack-label="Soli" suffix="%"/>
        </q-field>
      </div>
      <div class="col-sm-7">
        Der Solidaritätszuschlag (umgangssprachlich „Soli“) ist eine Ergänzungsabgabe zur Einkommensteuer und Körperschaftsteuer.
      </div>
    </div>
    <div class="row items-center">
      <div class="col-sm-4">
        <q-field
          icon="child_care"
          :error="kinderfreibetragHasError"
          error-label="Bitte einen Zahl eingegben"
        >
          <q-input v-model="kinderfreibetrag" stack-label="Kinderfreibetrag" suffix="Euro" v-on:input="kinderfreibetrag.set"/>
        </q-field>
      </div>
      <div class="col-sm-7">
        Muss noch definiert werden ...
      </div>
    </div>
    <div class="row items-center">
      <div class="col-sm-4">
        <q-field
          icon="accessible"
          :error="pflegeversicherungHasError"
          error-label="Bitte einen Wert zwischen 0 und 100 eingegben"
        >
          <q-input v-model="pflegeversicherung" stack-label="Pflegeversicherung" suffix="%" v-on:input="pflegeversicherung.set"/>
        </q-field>
      </div>
      <div class="col-sm-7">
        Die Pflegeversicherung ist eine Pflichtversicherung zur Absicherung des Risikos, pflegebedürftig zu werden.
      </div>
    </div>
    <div class="row items-center">
      <div class="col-sm-4">
        <q-field
          icon="local_hospital"
          :error="krankenversicherungHasError"
          error-label="Bitte einen Wert zwischen 0 und 100 eingegben"
        >
          <q-input v-model="krankenversicherung" stack-label="Krankenversicherung" suffix="%" v-on:input="krankenversicherung.set"/>
        </q-field>
      </div>
      <div class="col-sm-7 ">
        Die Krankenversicherung ist eine Pflichtversicherung zur Absicherung des Risikos, krank zu werden
      </div>
    </div>
    <div class="row items-center">
      <div class="col-sm-4">
        <q-field
          icon="spa"
          :error="versicherungHasError"
          error-label="Bitte einen Wert zwischen 0 und 100 eingegben"
        >
          <q-input v-model="versicherung" stack-label="Versicherung Allgemein" suffix="%" v-on:input="versicherung.set"/>
        </q-field>
      </div>
      <div class="col-sm-7 ">
        Muss noch definiert werden ...
      </div>
    </div>
  </div>
</template>

<style>
  .borderfat {
    border-left: 15px solid #e7e7e7;
  }
</style>

<script>
import Store from '../store'
import Logger from '../mixins/Logger'
import Formatter from '../mixins/Formatter'

export default {
  name: 'Einstellung',
  mixins: [Logger, Formatter],
  data () {
    return {
      soliHasError: false,
      pflegeversicherungHasError: false,
      krankenversicherungHasError: false,
      versicherungHasError: false,
      vorsorgeausgleichHasError: false,
      kinderfreibetragHasError: false
    }
  },
  computed: {
    verbose: {
      get () {
        return Store.getters.getConfig.verbose
      },
      set (trueOrFalse) {
        Store.commit('setVerbose', trueOrFalse)
      }
    },
    soli: {
      get () {
        return Math.round(Store.getters.getConfig.soli * 10000) / 100
      },
      set (prozent) {
        try {
          let parsedProzent = this.parseProzent(prozent)
          Store.commit('setSoli', parsedProzent / 100)
          this.$nextTick(() => {
            this.soliHasError = false
          })
        } catch (err) {
          this.log('Einstellung', 'Error bei Prozenteingabe ' + prozent + ' - ' + err.message)
          this.soliHasError = true
        }
      }
    },
    vorsorgeausgleich: {
      get () {
        return Math.round(Store.getters.getConfig.vorsorgeausgleich * 10000) / 100
      },
      set (prozent) {
        try {
          let parsedProzent = this.parseProzent(prozent)
          Store.commit('setVorsorgeausgleich', parsedProzent / 100)
          this.$nextTick(() => {
            this.vorsorgeausgleichHasError = false
          })
        } catch (err) {
          this.log('Einstellung', 'Error bei Prozenteingabe ' + prozent + ' - ' + err.message)
          this.vorsorgeausgleichHasError = true
        }
      }
    },
    kinderfreibetrag: {
      get () {
        return Store.getters.getConfig.kinderfreibetrag
      },
      set (euro) {
        Store.commit('setKinderfreibetrag', euro)
      }
    },
    pflegeversicherung: {
      get () {
        return Math.round(Store.getters.getConfig.pflegeversicherung * 10000) / 100
      },
      set (prozent) {
        try {
          let parsedProzent = this.parseProzent(prozent)
          Store.commit('setPflegeversicherung', parsedProzent / 100)
          this.$nextTick(() => {
            this.pflegeversicherungHasError = false
          })
        } catch (err) {
          this.log('Einstellung', 'Error bei Prozenteingabe ' + prozent + ' - ' + err.message)
          this.pflegeversicherungHasError = true
        }
      }
    },
    krankenversicherung: {
      get () {
        return Math.round(Store.getters.getConfig.krankenversicherung * 10000) / 100
      },
      set (prozent) {
        try {
          let parsedProzent = this.parseProzent(prozent)
          Store.commit('setPflegeversicherung', parsedProzent / 100)
          this.$nextTick(() => {
            this.krankenversicherungHasError = false
          })
        } catch (err) {
          this.log('Einstellung', 'Error bei Prozenteingabe ' + prozent + ' - ' + err.message)
          this.krankenversicherungHasError = true
        }
      }
    },
    versicherung: {
      get () {
        return Math.round(Store.getters.getConfig.versicherungAllg * 10000) / 100
      },
      set (prozent) {
        try {
          let parsedProzent = this.parseProzent(prozent)
          Store.commit('setVersicherungAllg', parsedProzent / 100)
          this.$nextTick(() => {
            this.versicherungHasError = false
          })
        } catch (err) {
          this.log('Einstellung', 'Error bei Prozenteingabe ' + prozent + ' - ' + err.message)
          this.versicherungHasError = true
        }
      }
    }
  }
}
</script>
