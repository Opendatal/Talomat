// OUTPUT.JS
// Ausgabe der Daten
// Lizenz: GPL 3
// Mathias Steudtner www.medienvilla.com

function fnStart()
{

	// alte Inhalte loeschen
	$("#heading").empty();
	$("#explanation").empty();
	$("#headingContent").empty();
	$("#content").empty();
	$("#headingResults").empty();
	$("#results").empty();
	$(".social").hide();	
	
	// TEXTE
	// Anzeige der Überschriften und Begleittexte
	$("#heading").append("<h1><a href='index.html'>"+heading1+"</a></h1>").append("<h2>"+heading2+"</h2>");			
	$("#explanation").append(explainingText);

	// Wenn Datenschutzerklärung vorhanden UND Auswertung gewünscht ...
	if ((imprintPrivacyUrl.length > 0) && (statsRecord) )
	{
		$("#keepStatsQuestion").append("Siehe <a href='http://"+imprintPrivacyUrl+"' target='_blank'>Datenschutzerkl&auml;rung.");
//		$("#keepStatsCheckbox").attr("checked",true); // OptIn erzwingen - ist aber rechtlich bedenklich. 
		$("#keepStats").fadeIn(1000);
	}
	else
	{
		$("#keepStatsCheckbox").attr("checked",false);	// Falls jmd. bauernschlau in der INDEX.HTML checked="checked" eingetragen hat
	}

	// FRAGEN UND ANTWORTEN in Arrays einlesen
	fnReadCsv("data/"+fileQuestions,fnShowQuestions)

	for (i = 0; i <= arPartyFiles.length-1; i++)
	{
		// Zeitversetzt starten, damit Reihenfolge auch garantiert stimmt. 500, 750, 1000, 1250ms, ... später
		window.setTimeout("fnReadCsv('data/"+arPartyFiles[i]+"',"+fnReadPositions+")",500+i*250);	
	}

}


// Anzeige von Frage Nummer XY
function fnShowQuestionNumber(questionNumber)
{
	// Nummer der Frage im Array um eins erhöhen
	questionNumber++;
	
	$("#votingPro").unbind("click");
	$("#votingNeutral").unbind("click");
	$("#votingContra").unbind("click");
	$("#votingSkip").unbind("click");


//	if (arPersonalPositions.length < arQuestionsLong.length)
	if (questionNumber < arQuestionsLong.length) 
	{
		// Aufbau der Liste zum Vor/Zurückgehen bei den Fragen
		fnJumpToQuestionNumber(questionNumber);
	
		bodyTextSize = $("#headingContent").css("font-size");
		bodyTextSize = parseInt(bodyTextSize)

		// Alten Inhalt des DIVs loeschen
		$("#headingContent").empty();
		$("#content").fadeOut(500).empty().hide();
		$("#voting").fadeOut(500).hide();
		
		// Neuen Inhalt schreiben	
		$("#headingContent").append("<p>")
			.append("<canvas id='pieChart' width='"+bodyTextSize+"' height='"+bodyTextSize+"'></canvas> ")
			.append("Frage "+(questionNumber+1)+"/"+arQuestionsLong.length)
			.append(" - "+arQuestionsShort[questionNumber])
			.append("</p>");
		$("#content").append("<p>"+arQuestionsLong[questionNumber]+"</p>");

		var percent = fnPercentage((questionNumber+1),arQuestionsLong.length);
		fnCalculatePieChart(Math.floor(bodyTextSize/2),percent,"pieChart");
		
		$("#content").fadeIn(500);
		$("#voting").fadeIn(500);
		
		
		
		// Klick-Funktion auf Bilder legen.
	   $("#votingPro").click(function () {
		arPersonalPositions[questionNumber] = 1;
	   	fnShowQuestionNumber(questionNumber);
	   });

	   $("#votingNeutral").click(function () { 
	   	arPersonalPositions[questionNumber] = 0;
	   	fnShowQuestionNumber(questionNumber);
	   });

	   $("#votingContra").click(function () { 
	   	arPersonalPositions[questionNumber] = -1;
	   	fnShowQuestionNumber(questionNumber);
	   });

	   $("#votingSkip").click(function () { 
	   	arPersonalPositions[questionNumber] = 99;
	   	fnShowQuestionNumber(questionNumber);
	   });

	}
	// Alle Fragen durchgelaufen -> Auswertung
	else
	{
		$("#jumpToQuestion").empty();
		fnEvaluation();
	} 
	
}


// Springe zu Frage Nummer XY (wird in fnShowQuestionNumber() aufgerufen)
function fnJumpToQuestionNumber(questionNumber)
{
	// alten Inhalt ausblenden und loeschen
	$("#jumpToQuestion").fadeOut(500).empty().hide();

	// "Mittelfarbe" aus Hintergrund und Text bestimmen.
	var middleColor = fnCreateMiddleColor();

	// Wenn mehr als XY Fragen vorhanden, dann erstelle eine zweite/dritte/... Zeile
	if (arQuestionsLong.length >= 16)
	{
		var tableRows = arQuestionsLong.length / 16;	// nicht mehr als 16 Fragen pro Zeile
			 tableRows = Math.ceil(tableRows);	// 17 Fragen / 16 = 1,06 ### 31 Fragen / 16 = 1,9 -> 2 Zeilen
		var questionsPerLine = arQuestionsLong.length / tableRows;		// 23 Fragen / 2 Zeilen = 12 & 11 Fragen/Zeile
			 questionsPerLine = Math.ceil(questionsPerLine);
	}
	else
	{
		questionsPerLine = 16;
	}

	// Tabelle aufbauen	
	var tableContent = "<table width='100%'>";
	for (i = 1; i <= arQuestionsLong.length; i++)
	{
		var modulo = i % questionsPerLine;
		// neue Zeile
		if (modulo == 1) { tableContent += "<tr>"; }
		tableContent += "<td align='center' id='jumpToQuestionNr"+i+"' title='"+arQuestionsShort[(i-1)]+"'>"; 
		tableContent += "<a href='javascript:fnShowQuestionNumber("+(i-2)+")' style='display:block;'>"+i+" </a>"; 
		tableContent += "</td>";
		if (modulo == 0) { tableContent += "</tr>"; }
	}
	tableContent += "</table>";
	$("#jumpToQuestion").append(tableContent).fadeIn(500);

	// alte Meinungen farblich hervorheben und aktuelle Frage markieren
	for (i = 1; i <= arQuestionsLong.length; i++)
	{
		// beantwortete Fragen farblich markieren
		var positionColor = fnTransformPositionToColor(arPersonalPositions[(i-1)]);
	   $("#jumpToQuestionNr"+i+"").css("background-color", positionColor);
	   $("#jumpToQuestionNr"+i+"").css("border-color", "#ffffff");
   
	   // aktuelle Frage markieren
	   if ((i-1) <= questionNumber)
	   {
	   	$("#jumpToQuestionNr"+i+"").css("border-color", "#888888");	   	
	   }	   	
	}	
	
}

// Anzeige der Ergebnisse - zusammengefasst
function fnEvaluationShort(arResults)
{

	// Alten Inhalt des DIVs loeschen
	$("#headingContent").empty().hide();	
	$("#content").empty().hide();
	$(".social").fadeIn(1000);	
	
	// Anzeige der Ergebnisse
	$("#headingContent").append("<h3>&Uuml;bereinstimmung mit den Positionen</h3>").fadeIn(500);

	var numberOfQuestions = arQuestionsLong.length;		// 3 Fragen
	
	var tableContent = "<table class='partyresults'>"	
	
	for (i = 0; i <= (arPartyFiles.length-1); i++)
	{
		var percent = fnPercentage(arResults[i],numberOfQuestions)
		var barImage = fnBarImage(percent);
		
//		$("div#content")
		tableContent += "<tr>"
		tableContent += "<td class='partycheck'>"
//			tableContent += "<input type='checkbox' id='party"+i+"' name='party"+i+"' value='"+i+"' /> "
			tableContent += "<input type='checkbox' name='party"+i+"' id='party"+i+"' onclick='fnStartToggleTableRow("+numberOfQuestions+")' value='0' /> "
		tableContent += "</td>"
		tableContent += "<td class='partyimg'>"
			tableContent += "<img src='data/"+arPartyLogosImg[i]+"' width='90' height='auto' alt='"+arPartyNamesLong[i]+"' title='"+arPartyNamesLong[i]+"' /> "
		tableContent += "</td>"
		tableContent += "<td class='partyname'>"
			tableContent += "<a href='http://"+arPartyInternet[i]+"' target='_blank' title='"+arPartyNamesLong[i]+"'>";		
			tableContent += arPartyNamesShort[i];
			tableContent += "</a>";
		tableContent += "</td>"
		tableContent += "<td class='partynumber'>"
			tableContent += " "+arResults[i]+"/"+numberOfQuestions
		tableContent += "</td>"
		tableContent += "<td class='partybar'>"
			tableContent += " <img src='img/"+barImage+"' height='20' width='"+percent+"' alt='"+percent+"%' title='"+percent+"%' />"
		tableContent += "</td>"
		tableContent += "</tr>";
	
	} // end for
	
	tableContent += "</table>";
	$("#content").append(tableContent).fadeIn(750); 


	// Anzeigen der detaillierten Tabelle
	$("#headingResults").append("<p>&raquo; Klicken Sie hier um <b>Details</b> f&uuml;r oben ausgew&auml;hlte Parteien ein-/auszublenden</p>")
	.css("cursor", "pointer")
	.click(function () { 
		fnStartToggleTableRow(numberOfQuestions);
		$("#results").toggle();
	});
	
	

}


// Anzeige der Ergebnisse - detailliert
function fnEvaluationLong(arResults)
{
	$("#results").hide();

	var tableContent = "<table>"
		
	// Kopfzeile der Tabelle
	tableContent += "<tr>";
	for (i = -2; i <= (arPartyFiles.length-1); i++)
	{
		if (i == -2)
		{ var picName = ""; }	// erste Zelle
		else if (i == -1)
		{ var picName = "Sie"; }	// zweite Zelle
		else
		{
			var picName = "<img src='data/"+arPartyLogosImg[i]+"' width='80%' height='auto' alt='"+arPartyNamesLong[i]+"' title='"+arPartyNamesLong[i]+"' /> ";
		}
		
		tableContent += "<th id='partyNameCell"+i+"'>";
			tableContent += picName; 
		tableContent += "</th>";
	}
	tableContent += "</tr>";

	// Inhalt
	var cellId = -1;	// cellId ist für das Ausblenden der Spalten wichtig.
	for (i = 0; i <= (arQuestionsLong.length-1); i++)
	{
		var positionImage = fnTransformPositionToImage(arPersonalPositions[i]);
		var positionColor = fnTransformPositionToColor(arPersonalPositions[i]);	// eigene Meinung - wird unten auch wieder genutzt als Rahmen für Parteipositionsbild
		var positionText  = fnTransformPositionToText(arPersonalPositions[i]);
		
		cellId++;	// erste Spalte - Beschreibung
		cellId++;	// zweite Spalte - eignene Meinung 1/0/-1
	
		tableContent += "<tr>";
			tableContent += "<td title='"+arQuestionsShort[i]+" - "+arQuestionsLong[i]+"'>";
				tableContent += arQuestionsLong[i];
			tableContent += "</td>";
			tableContent += "<td align='center'>";
				tableContent += "<img src='img/icons/"+positionImage+"' height='20' width='20' alt='"+positionText+"' title='"+positionText+"' style='border:2px solid "+positionColor+"' />";
			tableContent += "</td>";

			// Parteipositionen anzeigen
			for (j = 0; j <= (arPartyFiles.length-1); j++)
			{
				cellId++;
				var partyPositionsRow = j * arQuestionsLong.length + i;
				var positionImage = fnTransformPositionToImage(arPartyPositions[partyPositionsRow]);
                                var positionText = fnTransformPositionToText(arPartyPositions[partyPositionsRow]);

				// Inhalt der Zelle
				// tableContent += "<td title='" + arPartyNamesShort[j] + ": " + positionText + ( arPartyOpinions[partyPositionsRow] === "" ? "" : ": " + arPartyOpinions[partyPositionsRow] ) + "' align='center' id='partyPositionCell" + cellId + "'>";
				tableContent += "<td align='center' id='partyPositionCell" + cellId + "'>";

// VER 0.2.1 			tableContent += "<td title='"+arPartyNamesShort[j]+": "+arPartyOpinions[partyPositionsRow]+"' align='center' id='partyPositionCell"+cellId+"'>";
					tableContent += "<span><img src='img/icons/"+positionImage+"' height='20' width='20' alt='"+arPartyOpinions[partyPositionsRow]+"' style='border:2px solid "+positionColor+"' /><span>"+ arPartyNamesShort[j] + ": " + positionText + ( arPartyOpinions[partyPositionsRow] === "" ? "" : ": " + arPartyOpinions[partyPositionsRow] ) +"</span></span>";
				tableContent += "</td>";
			}

		tableContent += "</tr>";
	}
		
	tableContent += "</table>";

	$("#results").append(tableContent);
	
	var middleColor = fnCreateMiddleColor()
	$("tr:odd").css("background-color", middleColor);


	// Markieren der ersten XY Parteien in der SHORT-Tabelle und Verstecken der übrigen Spalten in der LONG-Tabelle
	if (intPartyDefaultShow <= 0)
	{ intPartyDefaultShow = arPartyFiles.length; }
	 
	// erste XY Parteien markieren
	for (i = 0; i <= (intPartyDefaultShow - 1); i++)
	{
		$("#party"+i+"").attr("checked",true);		
	}
	
	// restliche Parteien nicht markieren - eigentlich sinnlos :-/
	for (i = intPartyDefaultShow; i <= (arPartyFiles.length - 1); i++)
	{
		$("#party"+i+"").attr("checked",false);
	}
	
}
