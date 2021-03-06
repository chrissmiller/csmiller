

"use strict";
var requestSki = new XMLHttpRequest();

function callbackSki(){
	if(requestSki.status >= 200 && requestSki.status < 400){
		processJSON(this.response);
	}
}

function buildCallURL(lat, long){
  const apiKEY = "843c3aa792814c9fa68211844182110";
  let url = `https://api.worldweatheronline.com/premium/v1/ski.ashx?key=${apiKEY}&q=${lat},${long}&format=json&includeLocation=yes`;
  return url;
}


function processJSON(jsonData){
  let weather = JSON.parse(jsonData);
  let currDate = new Date();
  let currHour = currDate.getHours();
  let hourIndex = Math.floor(currHour/3);
  let name = weather.data.nearest_area[0].areaName[0].value;
  let currTemp = weather.data.weather[0].hourly[hourIndex].bottom[0].tempF;
  let snowChance = weather.data.weather[0].chanceofsnow;
  let snowLvl = weather.data.weather[0].totalSnowfall_cm;


  setLoc(name);
  setTemp(currTemp);
  //setPrecip(snowChance);
  setChance(snowChance);
  setLvl(snowLvl);
}


function setLoc(name){
  let box = document.getElementById('locationText');
  box.innerHTML = name;
}


function setTemp(temp){
  let box = document.getElementById('tempText');
  box.innerHTML = temp + ' °F';
}
/*
function setPrecip(snowChance){
  let box = document.getElementById('precipText');
  if (snowChance > 50){
    box.innerHTML = 'Snow!';
  } else {
    box.innerHTML = 'No Snow';
  }
}*/

function setChance(chance){
  let box = document.getElementById('chanceText');
  box.innerHTML = chance + '% chance of snow';
}

function setLvl(snowLvl){
  const cmToIn = .3937;
  let box = document.getElementById('quantText');
  let inLvl = parseFloat(snowLvl * cmToIn);

  box.innerHTML = inLvl.toFixed(2) + ' inches';
}


//Calls the default snow checking behavior
function sysGetSnow(){
  let skiRes = {
    lat: 43.6776,
    long: -72.7798
  }

	let callURL = buildCallURL(skiRes.lat, skiRes.long);
	requestSki.open('GET', callURL, true);
	requestSki.onload = callbackSki;
	requestSki.send();
}
