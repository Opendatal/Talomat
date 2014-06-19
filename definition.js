// DEFINITIONEN


///////////////////////////////////////////////////////////////////////
// ALLGEMEINE/EINFACHE EINSTELLUNGEN:


// FRAGENKATALOG
var fileQuestions = "Fragen.csv";


// LISTE DER PARTEIEN/KANDIDATEN (bitte mit Komma trennen, Reihenfolge beachten und mit "" umschliessen)
// Liste der Parteipositionen und Begruendungen
var strPartyFiles = "CDU.csv,SPD.csv,GRUENE.csv,LINKE.csv,FDP.csv,WfW.csv,REP.csv,PIRATEN.csv,AfD.csv,proNRW.csv";
// Liste der Parteinamen - kurz 
var strPartyNamesShort = "CDU,SPD,GRÜNE,DIE LINKE,FDP,WfW,REP,PIRATEN,AfD,PRO NRW";
// Liste der Parteinamen - lang
var strPartyNamesLong = "Christlich Demokratische Union Deutschlands, Sozialdemokratische Partei Deutschlands, BÜNDNIS 90/DIE GRÜNEN, DIE LINKE, Freie Demokratische Partei, Wählergemeinschaft für Wuppertal, Die Republikaner, Piratenpartei Deutschland, Alternative für Deutschland, Bürgerbewegung pro Nordrhein-Westfalen";
// Logos der Parteien (sollten im Format 50x25px sein)
var strPartyLogosImg = "CDU.png,SPD.png,GRUENE.png,LINKE.png,FDP.png,WfW.png,REP.png,PIRATEN.png,AfD.png,proNRW.png";
// Internetseiten der Parteien/Kandidaten ohne http://
var strPartyInternet = "www.cdu-wuppertal.de, www.spd-wuppertal.de, www.gruene-wuppertal.de, www.die-linke-wuppertal.de, www.fdpwuppertal.de, www.wfw-wuppertal.de, www.rep-wuppertal.de, blog.piratenpartei-nrw.de/wuppertal, www.nrw-alternativefuer.de, wuppertal.pro-nrw.net";
// Anzahl der Parteien, die in der detaillierten Auswertung sofort angezeigt werden sollen. 0 = alle 
var intPartyDefaultShow = 3


// UeBERSCHRIFTEN UND TEXTE
// Hauptueberschrift
var heading1 = "Talomat";
// zweite Ueberschrift
var heading2 = "Informationen zur Kommunalwahl in Wuppertal 2014";
// Kurzer Text um was es bei der Wahl geht
var explainingText = "Am 25. Mai 2014 findet die Wahl des Rates und der Bezirksvertretungen der Stadt Wuppertal statt. In 92 Wahlbezirken haben die BürgerInnen die Möglichkeit ihre Stimme abzugeben und so einen neuen Stadtrat zu wählen. Der Talomat ist keine Wahlempfehlung, sondern ein Informationsangebot zu Wahlen!"; 


// IMPRESSUM, KONTAKT
// (optional) Redaktion: Person(en), die die Fragen ausgearbeitet hat
var imprintEditorialNames = "Jan Niko Kirschbaum, Ann-Cathrin Klappert, Sam Zeini, Ralf Glörfeld, Christopher Reinbothe";
// (optional) Redaktion: Kontakt-E-mail
var imprintEditorialEmail = "info@opendatal.de";
 // (optional) Technik: Person(en), die das System aufgesetzt hat
var imprintTechnicsNames = "Ralf Glörfeld, Christopher Reinbothe";
 // (optional) Technik: Kontakt-E-mail
var imprintTechnicsEmail = "info@opendatal.de";
// (optional) Quellenangaben zu den Bildern
var imprintPictures = "Alle auf dieser Website abgebildete Logos sind Eigentum der jeweiligen Rechteinhaber."; 
// (optional) Link zu einer Datenschutzerklaerung ohne http:// - erlaubt die anonyme Statistik
var imprintPrivacyUrl = "";



///////////////////////////////////////////////////////////////////////
// ERWEITERTE EINSTELLUNGEN:

// Trennzeichen fuer die CSV-Dateien (Excel benutzt haeufig Semikolon, OpenOffice/LibreOffice ein Komma)
var separator = ";";

// Designvorlage (CSS) im Ordner /styles 
var design = "opendatal";

// (To Do) Sprache
// var language = "de";



///////////////////////////////////////////////////////////////////////
// PROFESSIONELLE EINSTELLUNGEN:


// STATISTIK
// Anonyme Auswertung zulassen: true/1 oder false/0 
// Die Einwilligung des Nutzers und eine Datenschutzerklaerung (s.o.) werden benoetigt!
// Als Ergebnis erhaelt man die Liste mit der persoenlichen Auswahl in der Variablen "mowpersonal" (-1,0,1) 
// und die Liste mit der Anzahl der Uebereinstimmungen mit den Parteien als "mowparties" (5,1,0,2) zurueck.
// Als Trennzeichen fuer die Werte dient wieder ein Komma ;-)
// Das Skript und der Mat-O-Wahl sollten auf der gleichen Domain liegen. 
var statsRecord = 0;
var statsServer = "http://localhost/Test/vote.php";
