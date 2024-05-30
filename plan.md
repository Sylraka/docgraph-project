so, jetzt hab ich ein neues projekt aufgesetzt und mich ins redux-toolkit eingelesen. Das Ziel dieses Projektes ist klar: Eine neue Interpretation meines Graphen-Projektes.
Doch wo anfangen?
Dieses Ding hat sich so weit aufgeblasen dass ein Anfang schwer zu finden ist.

Vielleicht erleichtert es die Sache, die notwendigen Komponenten des Projektes einmal aufzuzählen.

1.  React-Projekt
1.1. Redux-Store
1.2. API zu einer Datenbank
1.3. Eine Oberfläche, auf der die gesammelten Daten dargestellt werden können (evtl umformatierung mancher Elemente notwendig, z.B. die Speicherung der Position)
2. Datenbank
firebase ist zu nervig, cassandra zuh oversized für dieses projekt... also... wieder mongodb
2.1. Integration des alten JSON-Datenformates in Datenbank (gesammelte Inhalte können übertragen werden)
2.2. Datenbank hosten: azure sollte angeblich ein kostenloses kontingent bieten, tut es aber nicht
mongodb atlas ist der wrapper um mongodb der einem viele konfigs in der cloud-umgebung abnimmt, ist aber ohne kostenpflichtige cloud-umgebung nicht nutzbar. Deshalb: mongodb ohne irgendwas
2.3. mongodb compass as GUI
3. HTTP-Anfragen für Datenbank: Middleware
Um mit der Datenbank kommunieren zu können, benötigen wir einen Server, an den HTTP-Anfragen gesendet werden können.
3.1 random technologie: Express.js mit MongoDB-Node.js-Treiber: express mongoose