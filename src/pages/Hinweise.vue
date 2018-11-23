<template>
  <div class="container-fluid borderfat">
    Anspruch des Programmes ist die kundenorientierte Veranschaulichung der Unterschiede zwischen
    Brutto- und Nettorentenansprüchen sowie der Anspruchshöhe einer ggf. zu erwartenden Witwenrente
    unter Berücksichtigung der Kürzung durch Anrechnung eigenen Einkommens.
    <h2>Hinweis</h2>
    Die Berechnungen basieren auf einem vereinfachten Verfahren und berücksichtigen daher nicht alle
    individuellen Gegebenheiten des betrachteten Kunden.
    Für die Richtigkeit der Berechnungsergebnisse wird daher auch keine Gewähr übernommen.
    <h3>Dateieingabe</h3>
    Auf der Seite "Dateneingabe" werden die für die Darstellung des Renteninformationsmusters benötigten
    Werte sowie berechnungsrelevante Daten eingegeben.

    Die Werte in farblich markierten Feldern können verändert werden. Zum Teil sind Hinweise hinterlegt,
    welche nach Auswahl des jeweiligen Feldes angezeigt werden.

    Links wird die Renteninformation mit den Werten des Kunden (nach Eingabe) nachgebildet.
    <h3>Altersrente</h3>
    In den kleineren Fenstern auf der rechten Seite sind drei Gründe für eine Reduzierung der Bruttoalters-
    rente dargestellt.
    <ol>
      <li>Reduzierung aufgrund von Rentenabschlägen durch Renteneintritt vor Erreichen des Regelrentenalters.
        Da die Rente nicht nur aufgrund der gesetzlich vorgeschriebenen Abschläge reduziert wird, sondern auch
        durch die nicht gezahlten Beiträge für die Zeit zwischen Renteneintritt und Regelrentenalter, ist der Wert
        des Abschlages auf der Seite "Dateneingabe" zu variieren. Er ist mit 0,2% pro Monat vorbelegt.
        Die gesetzliche Kürzug von 0,3% ist in der Berechnung bereits berücksichtigt.
        Als tatsächliches Renteneintrittsalter wurden 63 Jahre und 6 Monate (Durchschnitt in Deutschland) vorbelegt.
        Dies kann durch den Anwender individuell verändert werden.
      </li>
      <li>
        Reduzierung durch Steuern und Sozialversicherungsbeiträge. Die errechnete Steuer entspricht den
        aktuellen Steuersätzen der Einkommenssteuertabelle Deutschlands (Grundtabelle). Die tatsächlich im
        Alter zu zahlende Steuer kann aufgrund ändernder Steuergesetze, zusätzlicher Einnahmen oder Ausgaben
        höher oder niedriger ausfallen. Die Kranken-und Pflegeversicherungsbeiträge entsprechen den aktuellen
        Beiträgen/Beitragssätzen und sind bei Privatversicherten um einen GRV-Zuschuss verringert.
      </li>
      <li>
        In der Renteninformation werden unter "Rentenanpassung" zwei durch fiktive Rentenanpassungen er-
        höhte Regelaltersrenten ausgewiesen. Um diese Betrachtung etwas realitätsnaher zu gestalten, wird im
        dritten Fenster eine sich ergebende Rente unter Berücksichtigung der durchschnittlichen Werte der letzten
        10 Jahre für Rentenanpassungen und Inflation dargestellt.
      </li>
    </ol>
    <h3>Erwerbsminderungsrente</h3>
    <ol>
      <li>
        Es werden rechts die ggf. noch zu berücksichtigenden Abzüge durch Steuern und Sozialversicherungsbeiträge
        dargestellt.
      </li>
      <li>
        Im Fenster darunter wird die halbe EM-Rente ausgewiesen auf die der Kunde Anspruch hat, wenn seine
        Arbeitsfähigkeit noch zu groß, um Anspruch auf die volle EM-Rente zu haben. Auch hier sind die entsprechenden
        Abzüge errechnet und dargestellt.
      </li>
      <li>
        Das dritte Fenster enthält einen Hinweis auf die Versorgungslücke, welche dadurch entsteht, dass während
        einer Erwerbsminderung i.d.R. keine weiteren Beiträge mehr in die Rentenversicherung eingezahlt werden, so
        dass sich die Ansprüche auf Altersrente nicht so entwickeln werden, wie bisher angenommen.
        Bei Umwandlung der Erwerbsminderungsrente in eine Altersrente wird die Altersrente nicht geringer ausfallen,
        als die Erwerbsminderungsrente, die zuletzt gezahlt wurde.
      </li>
    </ol>
    <h3>Hinterbliebenenrente</h3>
    Hier wird der sich aus der Erwerbsminderungsrente des Versicherten ergebende Anspruch auf Witwen- bzw.
    Witwerrente für den hinterbliebenen Ehegatten errechnet.
    Gleichzeitig wird die Kürzung des Anspruches durch Anrechnung eigenen Einkommens dargestellt.
    Die für den Rentenanspruch und die Anrechnung relevanten Daten (Rentenart, Einkommenshöhe, Anzahl
    Kinder und Wohnort) können verändert werden.
    Ist mindestens ein Kind angegeben, wird die Halbwaisenrente inkl. Zuschlag mit angezeigt.
    <h3>Auswertung</h3>
    Um im Kundengespräch alle biometrischen Risiken im Zusammenhang darstellen zu können, sind auf dieser
    Seite die aus der Renteninformation resultierenden Werte in einer Grafik darsgestellt.

    Zusätzlich ist das Thema Krankengeld, Pflege- und Unfallversicherung mit integriert, um den Übergang zur
    konzeptionellen Vorsorgeberatung zu erleichtern.
  </div>
</template>

<script/>

<style scoped>
  .borderfat {
    border-left: 15px solid #e7e7e7;
  }
</style>
