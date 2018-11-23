<template>
  <q-page>
    <div class="container-fluid borderfat">
      <div class="row">
        <div class="col-sm-11">
          <br>
          <div class="row">
            <div class="col-sm-7">
              <h4>Ihre Rentenversicherung {{jahr}}</h4>
            </div>
            <div class="col-sm-5 rentenlogo">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-8">
              Für
            </div>
            <div class="col-sm-4 textright">
              {{person.name}}
            </div>
          </div>
          <div class="row">
            <div class="col-sm-8">
              Versicherungsnummer
            </div>
            <div class="col-sm-4 textright">
              0815-4711-42
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <br>
              In dieser Renteninformation haben wir die für Sie vom {{ person.berufsBegin | ddMMYYY }}
              bis zum 1.1.{{ person.jahrRenteninfo | YYYY }} gespeicherten Daten und das geltende Rentenrecht berücksichtigt.
              Ihre Regelaltersrente würde nach Erreichen der Regelaltersgrenze (01.01.2047) am 01.02.2047 beginnen.
              Änderungen in Ihren persönlichen Verhältnissen und gesetzliche Änderungen können sich auf Ihre zu erwartende Rente auswirken.
              Bitte beachten Sie, dass von der Rente auch Kranken- und Pflegeversicherungsbeiträge sowie gegebenenfalls Steuern zu zahlen sind.
              Auf der Rückseite finden Sie zudem wichtige Erläuterungen und zusätzliche Informationen.
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <h5>Rente wegen voller Erwerbsminderung</h5>
            </div>
          </div>
          <div class="row borderright">
            <div class="col-sm-10 borderright">
              Wären Sie heute wegen gesundheitlicher Einschränkungen voll erwerbsgemindert, bekämen Sie von uns eine monatliche Rente von:
            </div>
            <div class="col-sm-2 bordertop textright">
              <q-input v-model="renteHeute" float-label="Aktuelle Rente" suffix=" €" align="right"></q-input>
            </div>
          </div>
          <div class="row borderright">
            <div class="col-sm-10 borderright">
              <h5>Höhe Ihrer künftigen Regelaltersrente</h5>
            </div>
            <div class="col-sm-2"></div>
          </div>
          <div class="row borderright">
            <div class="col-sm-10 borderright">
              Ihre bislang erreichte Rentenanwartschaft entspräche nach heutigem Stand einer
              monatlichen Rente von:
            </div>
            <div class="col-sm-2 textright">
              <q-input v-model="renteBislang" float-label="Bislang erreichte Rente" suffix=" €" align="right"></q-input>
            </div>
          </div>
          <div class="row borderright">
            <div class="col-sm-10 borderright">
              Sollten bis zur Regelaltersgrenze Beiträge im Durchschnitt der letzten fünf Kalenderjahre gezahlt werden, bekämen Sie ohne Berücksichtigung
            </div>
            <div class="col-sm-2"></div>
          </div>
          <div class="row borderright">
            <div class="col-sm-10 borderright">
              von Rentenanpassungen von uns eine monatliche Rente von:
            </div>
            <div class="col-sm-2 borderspecial textright">
              <q-input v-model="rentePrognose" float-label="Prognostizierte Rente" suffix=" €" align="right"></q-input>
            </div>
          </div>
          <div class="box"></div>
          <div class="row">
            <div class="col-sm-12">
              <h5>Rentenanpassung</h5>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              Aufgrund zukünftiger Rentenanpassungen kann die errechnete Rente in Höhe von {{rente.voll}} EUR tatsächlich höher ausfallen.
              Allerdings können auch wir die Entwicklung nicht vorhersehen. Deshalb haben wir - ohne Berücksichtigung des Kaufkraftverlustes - zwei
              mögliche Varianten für Sie gerechnet. Beträgt der jährliche Anpassungssatz 1 Prozent, so ergäbe sich eine monatliche Rente von
              etwa {{rente.bislang}} EUR. Bei einem jährlichen Anpassungssatz von 2 Prozent ergäbe sich eine monatliche Rente von
              etwa {{rente.prognose}} EUR.
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              Zusätzlicher Vorsorgebedarf
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              Da die Renten im Vergleich zu den Löhnen künftig geringer steigen werden und sich somit die spätere Lücke zwischen Rente und
              Erwerbseinkommen vergrößert, wird eine zusätzliche Absicherung für das Alter wichtiger ("Versorgungslücke"). Bei der ergänzenden
              Altersvorsorge sollten Sie - wie bei Ihrer zu erwartenden Rente - den Kaufkraftverlust beachten.
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
  .box {
    position: relative;
    left: 71%;
    top: -120px;
    height: 1px;
    z-index: 1;
  }

  .rentenlogo {
    background-image: url(../assets/logo-rentenvers.png);
    background-repeat: no-repeat;
    background-position: right;
    background-size: 80%;
    height: 63px;
  }

  .textright {
    text-align: right;
  }

  .borderfat {
    border-left: 15px solid #e7e7e7;
  }

  .borderright {
    border-right: thin solid #757075;
  }

  .bordertop {
    border-top: thin solid #757075
  }

  .borderspecial {
    border-bottom: thin solid #757075;
  }
</style>

<script>
import Store from '../store'
import Formatter from '../mixins/Formatter.js'

export default {
  name: 'Home',
  mixins: [Formatter],
  data () {
    return {
      jahr: 2018
    }
  },
  computed: {
    name () {
      return Store.getters.getName
    },
    person () {
      return Store.getters.getPerson
    },
    rente () {
      return Store.getters.getRente
    },
    renteHeute: {
      get () {
        return Store.getters.getRente.voll
      },
      set (newRente) {
        let rente = this.rente
        rente.voll = newRente
        Store.commit('setRente', rente)
      }
    },
    renteBislang: {
      get () {
        return Store.getters.getRente.bislang
      },
      set (newRente) {
        let rente = this.rente
        rente.bislang = newRente
        Store.commit('setRente', rente)
      }
    },
    rentePrognose: {
      get () {
        return Store.getters.getRente.prognose
      },
      set (newRente) {
        let rente = this.rente
        rente.prognose = newRente
        Store.commit('setRente', rente)
      }
    }
  }
}
</script>
