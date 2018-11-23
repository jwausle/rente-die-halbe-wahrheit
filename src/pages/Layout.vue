<template>
  <q-layout view="lHh Lpr LFF">
    <q-layout-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round v-on:click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>

        <q-toolbar-title>
          Rente die halbe Wahrheit
          <div slot="subtitle">Rentenbescheid ist nicht gleich Rente</div>
        </q-toolbar-title>

        <q-btn flat dense round v-on:click="rightDrawerOpen = !rightDrawerOpen" aria-label="Menu">
          <q-icon name="edit"/>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer side="left" v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list no-border link inset-delimiter>
        <q-list-header>Menu</q-list-header>
        <q-item-separator />
        <q-item to="/home">
          <q-item-side icon="home"/>
          <q-item-main label="Home"/>
        </q-item>
        <q-item to="/altersrente">
          <q-item-side icon="zoom_in"/>
          <q-item-main label="Altersrente"/>
        </q-item>
        <q-item to="/erwerbsminderung">
          <q-item-side icon="zoom_out"/>
          <q-item-main label="Erwerbsminderungsrente"/>
        </q-item>
        <q-item to="/hinterbliebenenrente">
          <q-item-side icon="supervisor_account"/>
          <q-item-main label="Hinterbliebenenrente"/>
        </q-item>
        <q-item to="/auswertung">
          <q-item-side icon="bar_chart"/>
          <q-item-main label="Auswertung"/>
        </q-item>
        <q-item-separator />
        <q-item to="/hinweise">
          <q-item-side icon="info"/>
          <q-item-main label="Erläuterung"/>
        </q-item>
        <q-item-separator />
        <q-item to="/eingabe">
          <q-item-side icon="build"/>
          <q-item-main label="Einstellung"/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-layout-drawer side="right" v-model="rightDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list no-border link inset-delimiter>
        <q-input v-model="name" stack-label="Name" v-on:input="name.set"/>
        <q-input v-model="geburtstag" stack-label="Geburtstag" v-on:input="geburtstag.set" :error="geburtstagHasError"/>
        <q-input v-model="einkommen" stack-label="Brutto Einkommen" v-on:input="einkommen.set" suffix="Euro"/>
        <q-input v-model="geburtstagEhePartner" stack-label="Geburtstag Ehepartner" v-on:input="geburtstagEhePartner.set"/>
        <q-input v-model="einkommenEhePartner" stack-label="Brutto Einkommen Ehepartner" v-on:input="einkommenEhePartner.set" suffix="Euro"/>
        <q-input v-model="kinder" stack-label="Kinder" v-on:input="kinder.set"/>
        <q-input v-model="berufsBegin" stack-label="Erster Arbeitstag" v-on:input="berufsBegin.set"/>
        <q-input v-model="rentenStart" stack-label="Erster Rententag" v-on:input="rentenStart.set"/>
        <q-input v-model="rentenInfo" stack-label="Tag der Renteninfo" v-on:input="rentenInfo.set"/>
        <q-select v-model="region" stack-label="Region" :options="[{label: 'Ost', value: 'Ost'},{label: 'West', value: 'West'}]" v-on:input="region.set"/>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-layout-footer>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        © M.Ch.Stöbe - alle Angaben ohne Gewähr - Stand 01.01.2015
      </q-toolbar>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import {openURL, date} from 'quasar'
import QItem from 'quasar-framework/src/components/list/QItem'
import Store from '../store/index'
import Logger from '../mixins/Logger'
import Formatter from '../mixins/Formatter'
import {required, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
  name: 'MyLayout',
  components: {QItem},
  mixins: [Logger, Formatter],
  data () {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      geburtstagHasError: false
    }
  },
  computed: {
    name: {
      get () {
        return Store.getters.getName
      },
      set (newName) {
        Store.commit('setName', newName)
      }
    },
    geburtstag: {
      get () {
        return date.formatDate(Store.getters.getPerson.geburtstag, 'DD.M.YYYY')
      },
      set (geburtstag) {
        try {
          let geburtstagDate = this.parseDate(geburtstag, 'DD.M.YYYY')
          Store.commit('setGeburtstag', geburtstagDate)
          this.$nextTick(() => {
            this.geburtstagHasError = false
          })
        } catch (err) {
          this.log('Layout', 'Error bei Geburtstagseingabe ' + geburtstag + ' - ' + err.message)
        }
        this.geburtstagHasError = true
      }
    },
    geburtstagEhePartner: {
      get () {
        return date.formatDate(Store.getters.getPerson.geburtstagEhePartner, 'DD.M.YYYY')
      },
      set (geburtstag) {
        try {
          let geburtstagDate = this.parseDate(geburtstag, 'DD.M.YYYY')
          Store.commit('setGeburtstagEhePartner', geburtstagDate)
        } catch (err) {
          this.log('Layout', 'Error bei Geburtstagseingabe ' + geburtstag + ' - ' + err.message)
        }
      }
    },
    kinder: {
      get () {
        return Store.getters.getPerson.kinder
      },
      set (kinder) {
        Store.commit('setKinder', kinder)
      }
    },
    berufsBegin: {
      get () {
        return date.formatDate(Store.getters.getPerson.berufsBegin, 'DD.M.YYYY')
      },
      set (datumString) {
        try {
          let datum = this.parseDate(datumString, 'DD.M.YYYY')
          Store.commit('setBerufsBegin', datum)
        } catch (err) {
          this.log('Layout', 'Error bei Berufsbegineingabe ' + datumString + ' - ' + err.message)
        }
      }
    },
    rentenStart: {
      get () {
        return date.formatDate(Store.getters.getPerson.rentenStart, 'DD.M.YYYY')
      },
      set (datumString) {
        try {
          let datum = this.parseDate(datumString, 'DD.M.YYYY')
          Store.commit('setRentenStart', datum)
        } catch (err) {
          this.log('Layout', 'Error bei Rentenstarteingabe ' + datumString + ' - ' + err.message)
        }
      }
    },
    rentenInfo: {
      get () {
        return date.formatDate(Store.getters.getPerson.jahrRenteninfo, 'DD.M.YYYY')
      },
      set (datumString) {
        try {
          let datum = this.parseDate(datumString, 'DD.M.YYYY')
          Store.commit('setRentenInfo', datum)
        } catch (err) {
          this.log('Layout', 'Error bei Renteninfoeingabe ' + datumString + ' - ' + err.message)
        }
      }
    },
    einkommen: {
      get () {
        return Store.getters.getPerson.einkommen.brutto
      },
      set (euro) {
        Store.commit('setEinkommen', euro)
      }
    },
    einkommenEhePartner: {
      get () {
        return Store.getters.getPerson.bruttoEinkommenEhePartner
      },
      set (euro) {
        Store.commit('setEinkommenEhePartner', euro)
      }
    },
    region: {
      get () {
        return Store.getters.getPerson.regionOstOrWest
      },
      set (ostOrWest) {
        Store.commit('setRegion', ostOrWest)
      }
    }
  },
  methods: {
    openURL
  },
  validations: {
    geburtstag: { required, minLength: minLength(8), maxLength: maxLength(10) }
  }
}
</script>

<style>
</style>
