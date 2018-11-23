<template>
  <div class="container-fluid borderfat">
    <h4>Hinterbliebenrente</h4>
    <div class="container">
      <img src="../assets/hinterbliebene-gross.png" alt="loading ... /assets/images/hinterbliebene-gross.png"/>
    </div>
    <div class="centered">
      <table>
        <tr>
          <td>Witwenrentenanspruch (25%)</td>
          <td class="money">{{wittwenRenteBrutto | formatNumber}} €</td>
        </tr>
        <tr>
          <td>(kleine Witwenrente nach neuem Recht)</td>
          <td></td>
        </tr>
        <tr>
          <td>Bruttoeinkommen des Hinterbliebenen</td>
          <td class="money">{{lohn | formatNumber}} €</td>
        </tr>
        <tr>
          <td>- pauschal (40%)</td>
          <td class="money">{{pauschal40 | formatNumber}} €</td>
        </tr>
        <tr>
          <td>= anrechenbarer Lohn</td>
          <td class="money">{{lohnAnrechenbar | formatNumber}} €</td>
        </tr>
        <tr>
          <td>- Freibetrag</td>
          <td class="money">{{freibetrag | formatNumber}} €</td>
        </tr>
        <tr>
          <td>Freibetrag übersteigender Betrag</td>
          <td class="money">{{lohnRest | formatNumber}} €</td>
        </tr>
        <tr>
          <td>Anrechnungsbetrag (40%)</td>
          <td class="money">{{lohnRest40 | formatNumber}} €</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>gekürzte Witwenrente</td>
          <td class="money">{{wittwenRenteGekuerzt | formatNumber}} €</td>
        </tr>
        <tr>
          <td>Witwenrente nach Abzug KV/PV</td>
          <td class="money">{{wittwenRente | formatNumber}} €</td>
        </tr>
        <tr>
          <td>Halbwaisenrente inkl. Zuschlag</td>
          <td class="money">{{halbwaisenRente | formatNumber}} €</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Store from '../store'
import Formatter from '../mixins/Formatter.js'

export default {
  name: 'Hinterbliebenrente',
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
    config () {
      return Store.getters.getConfig
    },
    wittwenRenteBrutto () {
      return Store.getters.getHinterbliebenenrente.brutto
    },
    lohn () {
      return this.person.bruttoEinkommenEhePartner
    },
    pauschal40 () {
      return this.person.bruttoEinkommenEhePartner * 0.4
    },
    lohnAnrechenbar () {
      return this.lohn - this.pauschal40
    },
    freibetrag () {
      return Store.getters.getHinterbliebenenrente.brutto
    },
    lohnRest () {
      return Store.getters.getHinterbliebenenrente.lohnRest
    },
    lohnRest40 () {
      return this.lohnRest * 0.4
    },
    wittwenRenteGekuerzt () {
      return Store.getters.getHinterbliebenenrente.gekuerzt
    },
    wittwenRente () {
      return Store.getters.getHinterbliebenenrente.netto
    },
    halbwaisenRente () {
      return Store.getters.getHinterbliebenenrente.halbwaisen
    }
  }
}
</script>

<style scoped>
  .container {
    position: relative;
    color: white;
    z-index: -1;
  }

  .centered {
    position: relative;
    top: -320px;
    left: 20%;
    color: black;
    z-index: 1;
    text-align: left;
    vertical-align: top;
    font-size: 60%;
  }

  .money {
    text-align: right;
  }

  .borderfat {
    border-left: 15px solid #e7e7e7;
  }
</style>
