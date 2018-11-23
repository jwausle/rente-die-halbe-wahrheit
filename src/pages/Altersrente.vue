<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-11 borderfat">
        <h4>Altersrente  </h4>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-11 borderfat">
        <p><b>Realer Renteneintritt {{person.einkommen.netto}}</b></p>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-11 borderfat padding-left">
        Das durchschnittliche Renteneintrittsalter in Deutschland liegt bei 64 Jahren (Stand 2012).
      </div>
    </div>
    <div class="row">
      <div class="col-sm-8 borderfat padding-left">
        Wann gehen Sie voraussichtlich in Rente?
        <q-input v-model="renteneintrittJahr" float-label="Alter in Jahren" />
        <q-input v-model="renteneintrittMonat" float-label="Monaten "/>
        {{renteBrutto | formatNumber}} € Altersrente nach Rentenkürzung um 18,0%.
      </div>
      <div class="col-sm-3">
        <img src="../assets/sanduhr-mittel2.png"/>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-11 borderfat">
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-11 borderfat">
        <p><b>Die Rente findet Netto statt</b></p>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-11 borderfat padding-left">
        Steuern und Sozialversicherungsbeiträge können die Rentenzahlungen geringer ausfallen lassen.
      </div>
    </div>
    <div class="row">
      <div class="col-sm-8 borderfat padding-left">
        <p>{{altersrente.brutto | formatNumber}} € Altersrente Brutto</p>
        <p>{{altersrente.steuer | formatNumber}} € Einkommensteuer inkl. Solidaritätszuschlag</p>
        <p>{{altersrente.versicherung | formatNumber}} € Kranken- und Pflegeversicherungsbeitrag</p>
        <p>{{altersrente.netto | formatNumber}} € Altersrente Netto</p>
      </div>
      <div class="col-sm-3">
        <img src="../assets/steuerlast-gross.png"/>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-11 borderfat">
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-11 borderfat">
        <p><b>Kaufkraftverlust</b></p>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-11 borderfat padding-left">
        Kalkuliert man den Kaufkraftverlust bei einer Inflationsrate von 1,66% (Ø letzte 10 Jahre)
        unter Berücksichtigung der Rentenanpassungen von 0,82% (Ø letzte 10 Jahre) ist mit einem
        jährlichen Verlust von
      </div>
    </div>
    <div class="row items-center">
      <div class="col-sm-4 borderfat padding-left">
        <q-input v-model="kaufkraftverlust" suffix="%"/>
      </div>
      <div class="col-sm-4 padding-left">
        zu rechnen.
      </div>
      <div class="col-sm-3">
        <img src="../assets/baum-mittel.png"/>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-11 borderfat">
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-11 borderfat">
        <br>
        <div class="row">
          <div class="col-sm-7" >
            <h2>Ihre Rentenversicherung {{jahr}}</h2>
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
          <div class="col-sm-8" >
            Versicherungsnummer
          </div>
          <div class="col-sm-4 textright">
            0815-4711-42
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <br>
            In dieser Renteninformation haben wir die für Sie vom {{person.berufsBegin | ddMMYYY}}
            bis zum 1.1.{{person.jahrRenteninfo}} gespeicherten Daten und das geltende Rentenrecht berücksichtigt.
            Ihre Regelaltersrente würde nach Erreichen der Regelaltersgrenze (01.01.2047) am 01.02.2047 beginnen.
            Änderungen in Ihren persönlichen Verhältnissen und gesetzliche Änderungen können sich auf Ihre zu erwartende Rente auswirken.
            Bitte beachten Sie, dass von der Rente auch Kranken- und Pflegeversicherungsbeiträge sowie gegebenenfalls Steuern zu zahlen sind.
            Auf der Rückseite finden Sie zudem wichtige Erläuterungen und zusätzliche Informationen.
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <h4>Rente wegen voller Erwerbsminderung</h4>
          </div>
        </div>
        <div class="row borderright">
          <div class="col-sm-10 borderright">
            Wären Sie heute wegen gesundheitlicher Einschränkungen voll erwerbsgemindert, bekämen Sie von uns eine monatliche Rente von:
          </div>
          <div class="col-sm-2 bordertop textright">
            {{rente.voll}} €
          </div>
        </div>
        <div class="row borderright">
          <div class="col-sm-10 borderright">
            <h4>Höhe Ihrer künftigen Regelaltersrente</h4>
          </div>
          <div class="col-sm-2"></div>
        </div>
        <div class="row borderright">
          <div class="col-sm-10 borderright">
            Ihre bislang erreichte Rentenanwartschaft entspräche nach heutigem Stand einer
            monatlichen Rente von:
          </div>
          <div class="col-sm-2 textright">
            {{rente.bislang}} €
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
            <h3>{{altersrente.netto | formatNumber}}€</h3>
          </div>
        </div>
        <div class="box"><img src="../assets/lupe.png" width="50%"></div>
        <div class="row">
          <div class="col-sm-12">
            <h4>Rentenanpassung</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            Aufgrund zukünftiger Rentenanpassungen kann die errechnete Rente in Höhe von {{rente.voll}} EUR tatsächlich höher ausfallen.
            Allerdings können auch wir die Entwicklung nicht vorhersehen. Deshalb haben wir - ohne Berücksichtigung des Kaufkraftverlustes - zwei
            mögliche Varianten für Sie gerechnet. Beträgt der jährliche Anpassungssatz 1 Prozent, so ergäbe sich eine monatliche Rente von
            etwa {{ rente.bislang }} EUR. Bei einem jährlichen Anpassungssatz von 2 Prozent ergäbe sich eine monatliche Rente von
            etwa {{ rente.prognose }} EUR.
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
</template>

<script>
import Store from '../store'
import Formatter from '../mixins/Formatter.js'

export default {
  name: 'Altersrente',
  mixins: [Formatter],
  data () {
    return {
      jahr: 2018,
      kaufkraftverlustInPercent: 2,
      renteneintrittMonat_: 1,
      renteneintrittJahr_: 2044
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
    config: {
      get () { return Store.getters.getConfig }
    },
    altersrente: {
      get () { return Store.getters.getAltersrente },
      set (nil) { }
    },
    kaufkraftverlust: {
      get () { return this.kaufkraftverlustInPercent },
      set (nil) { }
    },
    renteneintrittJahr: {
      get () { return this.config.renteneintritt },
      set (jahr_) { Store.commit('setRentenEintrittJahr', jahr_) }
    },
    renteneintrittMonat: {
      get () { return this.config.renteneintrittMonat },
      set (monat) { Store.commit('setRentenEintrittMonat', monat) }
    },
    renteBrutto: {
      get () { return Store.getters.getAltersrente.renteBrutto },
      set (nil) {}
    }
  }
}
</script>

<style scoped>
  table {
    width: 100%;
    border: 0px;
  }

  .money {
    width: 50px;
    text-align: right;
    float:left;
  }

  .box {
    position: relative;
    left: 60%;
    top: -160px;
    height: 1px;
    z-index: -1;
  }

  .rentenlogo {
    background-image: url(../assets/logo-rentenvers.png);
    background-repeat:no-repeat;
    background-position: right;
    background-size:80%;
    height: 63px;
  }

  .textright{
    text-align: right;
  }

  .borderfat{
    border-left: 15px solid #e7e7e7;
  }

  .borderright{
    border-right: thin solid #757075;
  }

  .bordertop{
    border-top: thin solid #757075
  }

  .borderspecial{
    border-bottom: thin solid #757075;
    border-left: thin solid #757075;
  }

  .padding-left {
    padding-left: 10px;
  }
</style>
