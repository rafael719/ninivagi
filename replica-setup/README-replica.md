# MongoDB Replica Set Setup

## Was ist ein Replica Set?
Ein Replica Set in MongoDB ist eine Gruppe von mongod-Prozessen, die denselben Datenbestand halten. Replica Sets bieten Redundanz und erhöhen die Verfügbarkeit.

## Beispiel-Setup (lokal, für Testzwecke)

### 1. Drei MongoDB-Instanzen starten (z. B. mit Docker):
```powershell
# Terminal 1
mongod --replSet rs0 --port 27017 --dbpath ./data/rs0-0

# Terminal 2
mongod --replSet rs0 --port 27018 --dbpath ./data/rs0-1

# Terminal 3
mongod --replSet rs0 --port 27019 --dbpath ./data/rs0-2
```

### 2. Replica Set initialisieren
```powershell
mongo --port 27017
# Dann in der Mongo Shell:
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27017" },
    { _id: 1, host: "localhost:27018" },
    { _id: 2, host: "localhost:27019" }
  ]
})
```

### 3. Verbindungs-URI für deine .env-Datei
```
MONGODB_URI=mongodb://localhost:27017,localhost:27018,localhost:27019/deinedb?replicaSet=rs0
```

## Hinweise
- Die Anwendung (api.js) benötigt keine Änderungen, solange die URI stimmt.
- Für Produktivbetrieb empfiehlt sich Docker Compose oder ein Cloud-Dienst.

---
**Nachweis F1F:**
Dieses Projekt ist für den Betrieb mit einem MongoDB Replica Set vorbereitet. Siehe Beispiel oben.
