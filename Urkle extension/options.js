function declareVariables(){
	chrome.storage.sync.get(function(data) {
		window.status = "";
		window.domain = "";
		window.dataStorage = {};
		window.enabled = "";
		window.fontFamilyVal = "opendyslexic";
		window.fontSizeVal = "16";
		window.wordspacingenVal = "1";
		window.wordspacingVal = "5";
		window.linespacingenVal = "1";
		window.linespacingVal = "17";
		window.ReadingrulerVal = "1";
		dataStorage = data;
		window.dataStorage = data;

		setValues();
	});
}

function loadValues(){
	chrome.storage.sync.get(function(data){
		dataStorage = data;
		window.dataStorage = data;
		setValues();

	});
}

function setValues(){
	$("#fontFamily").val(dataStorage["fontFamilyVal"]);
	$("#fontSize").val(dataStorage["fontSizeVal"]);
	$("#linespacing").val(dataStorage["linespacingVal"]);
	$("#linespacingen").val(dataStorage["linespacingenVal"]);
	$("#wordspacing").val(dataStorage["wordspacingVal"]);
	$("#wordspacingen").val(dataStorage["wordspacingenVal"]);
	$("#Readingruler").val(dataStorage["ReadingrulerVal"]);
}

function partA(){
	dataStorage["fontFamilyVal"] = $("#fontFamily").val();
	dataStorage["fontSizeVal"] = $("#fontSize").val();
	dataStorage["linespacingVal"] = $("#linespacing").val();
	dataStorage["linespacingenVal"] = $("#linespacingen").val();
	dataStorage["wordspacingVal"] = $("#wordspacing").val();
	dataStorage["wordspacingenVal"] = $("#wordspacingen").val();
	dataStorage["Readingruler"] = $("#Readingruler").val();
	
}

function partB(){
	chrome.storage.sync.set(dataStorage, function(){
		partA();
		loadValues();
	});
}

function saveOptions(){
	partA();
	partB();
}

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById("fontFamily").addEventListener("blur", saveOptions);
	document.getElementById("fontSize").addEventListener("blur", saveOptions);
	document.getElementById("linespacing").addEventListener("blur", saveOptions);
	document.getElementById("linespacingen").addEventListener("blur", saveOptions);
	document.getElementById("wordspacing").addEventListener("blur", saveOptions);
	document.getElementById("wordspacingen").addEventListener("blur", saveOptions);
	document.getElementById("Readingruler").addEventListener("blur", saveOptions);
	declareVariables();
});


chrome.storage.sync.get(function(data) {
	dataStorage = data;
	window.dataStorage = data;
	displayData();
});


function resetPref(){
	dataStorage["fontFamilyVal"] = "opendyslexic";
	dataStorage["fontSizeVal"] = "16";
	dataStorage["linespacingVal"] = "17";
	dataStorage["linespacingenVal"] = "1";
	dataStorage["wordspacingVal"] = "5";
	dataStorage["wordspacingenVal"] = "1";
	dataStorage["readingruler"] = true;
	dataStorage.firstRun = false;
	chrome.storage.sync.set(dataStorage);
	setValues();
};


function displayData(){
	var enabledSites = "";
	var disabledSites = "";
	for (var key in dataStorage) {
		if(dataStorage[key] == "Enabled"){
			enabledSites += key + ", ";
		};
		if(dataStorage[key] == "Disabled"){
			disabledSites += key + ", ";
		}
	}

	enabledSites = "<strong>Always enabled on: </strong>" + enabledSites.slice(0,-2);
	disabledSites = "<strong>Always disabled on: </strong>" + disabledSites.slice(0,-2);

	if(enabledSites == "<strong>Always enabled on: </strong>" || enabledSites == ""){
		enabledSites = "No always-enabled websites";
	}
	if(disabledSites == "<strong>Always disabled on: </strong>" || disabledSites == ""){
		disabledSites = "No always-disabled websites";
	}

	$("#enabledSites").html(enabledSites);
	$("#disabledSites").html(disabledSites);
}

$(document).ready(function(){
	document.getElementById('resetPref').addEventListener('click', resetPref);
});
