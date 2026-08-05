# Repräsentation der Bundestagswahl

Wahlergebnisse repräsentieren nicht die tatsächliche Bevölkerung. Hier wird gezeigt, wie sich die Stimmenanteile je nach verwendeter Gesamtmenge verändern. Inspiration und Daten von [Arne Semsrotts](https://www.instagram.com/arne.semsrott/) [Vortrag](https://www.youtube.com/watch?v=7waHkzEHcuw) bei der re:publica 26.

## Daten (Google Sheet)

Die Wahldaten werden aus einem Google Sheet geladen (eine Zeile pro Wahl) und einmalig beim Build gelesen.

1. Sheet mit einer Kopfzeile und je einer Datenzeile pro Wahl anlegen (Spalten siehe Tabelle unten).
2. **Datei → Freigeben → Im Web veröffentlichen** und als CSV veröffentlichen.
3. Die veröffentlichte CSV-URL als `SHEET_CSV_URL` in `.env` (lokal) bzw. als Build-Umgebungsvariable (z.B. in Netlify) hinterlegen. Siehe `.env.example`.

Aus dem `Titel` jeder Zeile wird automatisch ein Slug erzeugt (z.B. „Bundestagswahl 2025“ → `/bundestagswahl-2025`). Da Google Sheets keine Änderungszeit pro Zeile speichert, wird die Spalte `Zuletzt geändert` manuell gepflegt.

### Spalten

| Spalte                       | Beispielwert                          | Beschreibung                                                                                                                    |
| ---------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `Titel`                      | `Bundestagswahl 2025`                 | Name der Wahl, wird für den Seitentitel und den Slug verwendet.                                                                 |
| `Wahlberechtigte`            | `60510631`                            | Absolute Anzahl der Wahlberechtigten.                                                                                           |
| `Wahlbeteiligung`            | `0,825`                               | Anteil der Wähler:innen an den Wahlberechtigten, als Anteil (`0,825`) oder Prozent (`82,5%`).                                   |
| `Union`                      | `0,286`                               | Stimmenanteil der Partei (Anteil oder Prozent, siehe oben).                                                                     |
| `SPD`                        | `0,164`                               | Stimmenanteil der Partei.                                                                                                       |
| `Grüne`                      | `0,116`                               | Stimmenanteil der Partei.                                                                                                       |
| `Linke`                      | `0,088`                               | Stimmenanteil der Partei.                                                                                                       |
| `AfD`                        | `0,208`                               | Stimmenanteil der Partei.                                                                                                       |
| `Sonstige`                   | `0,157`                               | Stimmenanteil aller übrigen Parteien zusammen. Am besten als Formel: `=0,043 + 0,02 + 0,094` für die jeweilige Zusammensetzung. |
| `Kein deutscher Pass`        | `10250000`                            | Absolute Anzahl der Personen ohne deutschen Pass.                                                                               |
| `Minderjährige`              | `14300000`                            | Absolute Anzahl der Minderjährigen.                                                                                             |
| `Quelle Parteien`            | `https://www.bundeswahlleiterin.de/…` | Quelle für die Partei-Ergebnisse (inkl. Sonstige und Nichtwähler:innen), erscheint als Fußnote „1“.                             |
| `Quelle Kein deutscher Pass` | `https://…`                           | Quelle für die Zahl ohne deutschen Pass, Fußnote „2“.                                                                           |
| `Quelle Minderjährige`       | `https://…`                           | Quelle für die Zahl der Minderjährigen, Fußnote „3“.                                                                            |
| `Zuletzt geändert`           | `2026-08-04 20:45:56`                 | Zeitpunkt der letzten Aktualisierung dieser Zeile (manuell pflegen), Format `JJJJ-MM-TT HH:mm:ss` oder `TT.MM.JJJJ HH:mm`.      |

Absolute Zahlen dürfen Tausendertrennzeichen enthalten (`.` oder `,`), Prozentspalten akzeptieren `,` oder `.` als Dezimaltrennzeichen sowie ein optionales `%`. Fehlt eine Quellenspalte, wird auf der Seite „Keine Quelle angegeben“ angezeigt.

## Developing

Once you've created a project and installed dependencies with `bun install`, start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```
