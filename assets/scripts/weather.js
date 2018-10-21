"use strict";
var request = new XMLHttpRequest();

function callback(){
	if(request.status >= 200 && request.status < 400){
		setHTML(this.response);
	}
}

function setHTML(response){
	let weatherData = JSON.parse(response);
	let msg = `Temperature in Lebanon, NH: ${weatherData.main.temp} °F. `;
	if (weatherData.main.temp > 32){
		msg += 'Too warm for snowboarding!'
	} else if (weatherData.main.temp < -10){
		msg += 'Too cold for snowboarding!'
	} else {
		msg += 'Looks like great weather for snowboarding!'
	}
	let weatherNode = document.createElement('h4');
	let weatherText = document.createTextNode(msg);
	weatherNode.appendChild(weatherText);
	document.getElementById('weatherSection').appendChild(weatherNode);
}

const APIKEY = "6cc0896b2cbd9c679194b07bb6fabfbb";
let cityID = 5088597;
let callURL = `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${APIKEY}&units=imperial`
request.open('GET', callURL, true);
request.onload = callback;

request.send();
//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}
