const weatherCal = {

  // Initialize shared properties.
  initialize(name, iCloudInUse) {
    this.name = name
    this.fm = iCloudInUse ? FileManager.iCloud() : FileManager.local()
    this.bgPath = this.fm.joinPath(this.fm.libraryDirectory(), "dp-widget-" + this.name)
    this.prefPath = this.fm.joinPath(this.fm.libraryDirectory(), "dp-widget-preferences-" + name)
    // this.widgetUrl = "https://raw.githubusercontent.com/mzeryck/Weather-Cal/main/weather-cal.js"
    this.now = new Date()
    this.data = {}
    this.initialized = true
  },

  // Determine what to do when Weather Cal is run.
  async runSetup(name, iCloudInUse, codeFilename, gitHubUrl) {
    if (!this.initialized) this.initialize(name, iCloudInUse)
    const backgroundSettingExists = this.fm.fileExists(this.bgPath)

    // if (!this.fm.fileExists(this.fm.joinPath(this.fm.libraryDirectory(), "weather-cal-setup"))) return await this.initialSetup(backgroundSettingExists)
    // if (backgroundSettingExists) return await this.editSettings(codeFilename, gitHubUrl)
    await this.generateAlert("Dienstplan Script funktioniert.",["Continue"])
    // return await this.setWidgetBackground() 
  }
}
	
module.exports = weatherCal

/*
 * Detect the current module
 * by Raymond Velasquez @supermamon
 * -------------------------------------------- */
 
const moduleName = module.filename.match(/[^\/]+$/)[0].replace(".js","")
if (moduleName == Script.name()) {
  await (async () => {
    // Comment out the return to run a test.
    return
    const layout = `
    row
      column
    `
    const name = "Weather Cal Widget Builder"
    await weatherCal.runSetup(name, true, "Weather Cal code", "https://raw.githubusercontent.com/mzeryck/Weather-Cal/main/weather-cal-code.js")
    const w = await weatherCal.createWidget(layout, name, true)
    w.presentLarge()
    Script.complete()
  })() 
}


/*
async function testOutput2(url) {
	console.log("Test2");
	console.log(url);
}

async function testOutput3(url) {
	console.log("Test3");
	console.log(url);
}


// Funktion zum Abrufen und Verarbeiten des JSON-Inhalts
async function fetchAndDisplayContent(url) {
	// Widget-Konfiguration
	const widget = new ListWidget();
	widget.backgroundColor = new Color("#ffffff"); // Hintergrundfarbe des Widgets
	// Setze den Randabstand: oben, links, unten, rechts
	// widget.setPadding(2, 8, 2, 8);

	// Google Drive Freigabelink zur JSON-Datei
	const fileURL = url;
	
	
    try {
        // Prüfen, ob eine Internetverbindung besteht
        if (!(await isOnline())) {
            // console.log("Keine Internetverbindung vorhanden.");
            return;
        }

        // Aktuelles Datum und Uhrzeit ermitteln
        const currentDate = new Date();
        const dateYesterday = new Date();
        dateYesterday.setDate(dateYesterday.getDate() - 1); // Einen Tag zurückgehen, um den gestrigen Tag zu erhalten
        const currentHour = currentDate.getHours();
        const currentDay = currentDate.getDay(); // Sonntag = 0, Montag = 1, ..., Samstag = 6

        // HTTP-Anfrage erstellen
        const request = new Request(fileURL);

        // JSON-Datei abrufen
        const jsonData = await request.loadJSON();
		// console.log(jsonData);
		
		
		
		
		
			"startDate": {
		        "day": startDay,
		        "month": startMonth,
		        "year": startYear
		      },
		      "endDate": {
		        "day" : endDay,
		        "month" : endMonth,
		        "year" : endYear,
		      },
		      "printedDate": printedDate,
		      "analysedDate": aktuellesDatumUndZeit('datum'),
		      "analysedTime" : aktuellesDatumUndZeit('zeit'),
		      "personalnummer": employeeNumber,
		      "MaxSeitenZahl": maxPageNumber,
		      "Widget" : {
		        "Color" : {
		          "Background" : "",
		          "RWLeutkirch" : "",
		          "Tagdienst" : "",
		          "Nachtdienst" : "",
		          "Text" : "",
		          "refreshed" : ""
		        },
		        "TextSize" : {
		          "Wache" : "",
		          "Dienstzeit" : "",
		          "Text" : "",
		          "refreshed" : ""
		        },
		        "Spacer" : {
		          "nachUeberschrift" : "",
		          "vorFahrzeug" : "",
		          "vorBesatzung" : "",
		          "nachRettungsmittel" : "",
		          "nachKTW" : "",
		        },
		        "Zeiten" : {
		          "Tagdienst" : "",
		          "Nachtdienst" : "",
		          "KTW" : ""
		        }
		      }
		
		
		
		

        // Pfade für JSON-Abfragen definieren
        const basePfad = ["FahrzeugBesatzung", currentDate.getFullYear(),String(currentDate.getMonth() + 1).padStart(2, '0'), String(currentDate.getDate()).padStart(2, '0'), "LTK"];
        const basePfadYesterday = ["FahrzeugBesatzung", dateYesterday.getFullYear(),String(dateYesterday.getMonth() + 1).padStart(2, '0'), String(dateYesterday.getDate()).padStart(2, '0'), "LTK"];
        
        const pfadKTW01 = currentDay !== 0 ? [...basePfad, "KTW 01 _ 15/85-01", "Früh"] : null; // Nur Montag bis Samstag

    if (currentHour < 7) {
			basePfad = basePfadYesterday;
		}
        
        const pfadNEF01T = [...basePfad, "NEF 01 _ 15/82-01", "Tag"];
        const pfadNEF01N = [...basePfad, "NEF 01 _ 15/82-01", "Nacht"];
        const pfadRTW01T = [...basePfad, "RTW 01 _ 15/83-01", "Tag"];
        const pfadRTW01N = [...basePfad, "RTW 01 _ 15/83-01", "Nacht"];
        const pfadRTW02T = [...basePfad, "RTW 02 _ 15/83-02", "Tag"];
        const pfadRTW02N = [...basePfad, "RTW 02 _ 15/83-02", "Nacht"];
		const pfadPrintedDate = ["printedDate"]

        // JSON-Inhalte abrufen
        const contentObjNEF01T = getNestedValue(jsonData, pfadNEF01T);
        const contentObjNEF01N = getNestedValue(jsonData, pfadNEF01N);
        const contentObjRTW01T = getNestedValue(jsonData, pfadRTW01T);
        const contentObjRTW01N = getNestedValue(jsonData, pfadRTW01N);
        const contentObjRTW02T = getNestedValue(jsonData, pfadRTW02T);
        const contentObjRTW02N = getNestedValue(jsonData, pfadRTW02N);
        const contentObjKTW01 = pfadKTW01 ? getNestedValue(jsonData, pfadKTW01) : '';
		const contentObjPrintedDate = getNestedValue(jsonData, pfadPrintedDate);


        // Textbausteine definieren
		const sp1 = '  ';
		const sp2 = '     ';
        const text01Tag = `${sp1}NEF:\n${sp2}${contentObjNEF01T}\n${sp1}RTW 1:\n${sp2}${contentObjRTW01T}\n${sp1}RTW 2:\n${sp2}${contentObjRTW02T}`;
        const text01Nacht = `${sp1}NEF:\n${sp2}${contentObjNEF01N}\n${sp1}RTW 1:\n${sp2}${contentObjRTW01N}\n${sp1}RTW 2:\n${sp2}${contentObjRTW02N}`;
        const text02KTW = pfadKTW01 ? `${sp1}KTW:\n${sp2}${contentObjKTW01}` : '';


        // Text basierend auf der aktuellen Zeit und dem Wochentag zusammenstellen
		
	    // Inhalt im Widget anzeigen
		
		let ueberschrift = '';
		let textDienstZeit = '';
		const sp3 = '                                        ';
        if (currentHour >= 7 && currentHour < 19) { ueberschrift = `RW Leutkirch${sp3}Tagdienst`; textDienstZeit = 'Tagdienst' } // Montag bis Sonntag zwischen 07:00 und 19:00 Uhr
		if (currentHour >= 19 || currentHour < 7) { ueberschrift = `RW Leutkirch${sp3}Nachtdienst`; textDienstZeit = 'Nachtdienst' } // Montag bis Sonntag zwischen 19:00 und 07:00 Uhr
		
		
		// Erstelle einen horizontalen Stack für die Ausrichtung
		let hStackUeberschrift = widget.addStack();
		hStackUeberschrift.layoutHorizontally();
		
		let textDieWache = hStackUeberschrift.addText('RW Leutkirch');
		textDieWache.textColor = new Color("#000000"); // Schriftfarbe
		textDieWache.font = new Font("San Francisco", 11); // Schriftgröße
		

		// Füge einen flexiblen Spacer hinzu, um den Text nach rechts zu schieben
		hStackUeberschrift.addSpacer();
		
		let textDZeit = hStackUeberschrift.addText(textDienstZeit);
		textDZeit.textColor = new Color("#888888"); // Schriftfarbe
		textDZeit.font = new Font("San Francisco", 9); // Schriftgröße

// hStackUeberschrift.addSpacer();
		
		widget.addSpacer(4); // Abstand zwischen den Textelementen
		
		
		
		const widgetTextoben = widget.addText(ueberschrift);
		widgetTextoben.textColor = new Color("#000000"); // Schriftfarbe im Widget
		widgetTextoben.font = new Font("San Francisco", 11); // Schriftgröße im Widget
	    widget.addSpacer(4); // Abstand zwischen den Textelementen
		
		
		
		let text = '';
		
		// Montag bis Sonntag zwischen 07:00 und 19:00 Uhr
        if (currentHour >= 7 && currentHour < 19) {
			text = text01Tag;
		}
		
		// Montag bis Sonntag zwischen 19:00 und 07:00 Uhr
		if (currentHour >= 19 || currentHour < 7) {
			text = text01Nacht;
		}
		
	    const widgetText = widget.addText(text);
	    widgetText.textColor = new Color("#000000"); // Schriftfarbe im Widget
	    widgetText.font = new Font("San Francisco", 9); // Schriftgröße im Widget
		widget.addSpacer(4); // Abstand zwischen den Textelementen
		
		// Montag bis Samstag zwischen 06:00 und 16:00 Uhr
		if (currentDay !== 0 && (currentHour >= 6 && currentHour < 16)) {
			
		    const widgetTextKTW = widget.addText(text02KTW);
		    widgetTextKTW.textColor = new Color("#000000"); // Schriftfarbe im Widget
		    widgetTextKTW.font = new Font("San Francisco", 9); // Schriftgröße im Widget
		    
		}
		
		widget.addSpacer(4); // Abstand zwischen den Textelementen
		

		// Erstelle einen horizontalen Stack für die Ausrichtung
		let hStack = widget.addStack();
		hStack.layoutHorizontally();

		// Füge einen flexiblen Spacer hinzu, um den Text nach rechts zu schieben
		hStack.addSpacer();

		// Datum und Uhrzeit der letzten Aktualisierung im Stack anzeigen
		const lastUpdateTime = currentDate.toLocaleString();
		// let updateTimeText = hStack.addText(`refreshed: ${lastUpdateTime}`);
		let updateTimeText = hStack.addText(`Datenstand: ${contentObjPrintedDate}`);
		updateTimeText.textColor = new Color("#888888"); // Schriftfarbe für Datum/Uhrzeit
		updateTimeText.font = new Font("San Francisco", 8); // Schriftgröße für Datum/Uhrzeit

		// Widget anzeigen
		if (config.runsInWidget) {
			Script.setWidget(widget);
		} else {
			widget.presentMedium();
		}
	} catch (error) {
		console.log(`Fehler: ${error}`);
	}
}

// Funktion zum Extrahieren eines Werts aus einem verschachtelten Objekt
function getNestedValue(obj, path) {
    return path.reduce((acc, key) => (acc && acc[key] !== 'undefined') ? acc[key] : undefined, obj);
}

// Funktion zum Prüfen der Internetverbindung
async function isOnline() {
    try {
        const url = "https://www.google.com";
        const request = new Request(url);
        request.timeoutInterval = 5;
        await request.loadString();
        return true;
    } catch (e) {
        return false;
    }
}

// Funktion zum Aktualisieren des Widgets
async function updateWidget() {
    await fetchAndDisplayContent();
    // Zeitplan für erneute Aktualisierung in 30 Minuten festlegen
    const nextUpdate = new Date();
    nextUpdate.setMinutes(nextUpdate.getMinutes() + 10);
    Script.setWidget(widget);
    Script.complete();
}

// Überprüfe, ob das Skript im Widget-Modus ausgeführt wird
if (config.runsInWidget) {
    // Wenn im Widget-Modus, aktualisiere das Widget
    updateWidget();
} else {
    // Wenn im Script-Modus, führe das Skript aus
    fetchAndDisplayContent();
}
*/
