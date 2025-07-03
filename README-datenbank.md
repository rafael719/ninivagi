
Einsatz von MongoDB (NoSQL) – einfach erklärt

Warum habe ich MongoDB benutzt?
- Die Datenbank ist flexibel. Bücher können verschiedene Felder haben, das ist hier kein Problem.
- Sie ist leicht zu erweitern, wenn mehr Daten oder mehr Nutzer dazukommen.
- Für schnelle Entwicklung und wenn sich die Anforderungen oft ändern, ist MongoDB praktisch.

Was ist nicht so gut?
- Die Datenbank garantiert nicht immer, dass alle Daten sofort überall gleich sind. Für Banken oder sehr wichtige Daten wäre das schlecht.
- Komplizierte Abläufe (Transaktionen) sind schwieriger als bei klassischen Datenbanken.
- Es gibt keine festen Verbindungen zwischen den Daten (keine Foreign Keys). Das kann zu Fehlern führen, wenn die Daten sehr komplex werden.
- Sehr komplizierte Abfragen sind mit SQL oft einfacher.

Was könnte man besser machen?
- Man könnte die Daten genauer prüfen lassen (Validierung), damit keine fehlerhaften Daten gespeichert werden.
- Für Felder, nach denen oft gesucht wird, kann man Indexe anlegen. Das macht die Suche schneller.
- Regelmäßige Backups und ein Plan, wie man Daten wiederherstellt, sind wichtig (siehe backup.js und restore.js).
- Die Datenbank sollte überwacht werden, z.B. mit MongoDB Atlas oder Prometheus.
- Ein Replica Set (siehe replica-setup) sorgt dafür, dass die Datenbank auch bei Ausfällen weiterläuft.

Fazit
Für dieses Projekt ist MongoDB gut, weil es flexibel und schnell ist. Wenn die Daten aber sehr stark miteinander verbunden sind oder absolute Zuverlässigkeit nötig ist, sollte man auch über eine klassische (relationale) Datenbank nachdenken.
