/*
	This program uses the OpenWeatherMap API to access the temperature in Lebanon, and
	tells the user if it is a good skiing/snowboarding temperature (defined as between -10 and 40 degrees Fahrenheit).

	It also allows the user to check the temperature at their own location and provides the same functionality.
	Sorry for any sloppy styling here - I haven't used JS before but it was fun to learn this bit!

	Due to free API limitations - may be slow if user makes a lot of calls in rapid succession
*/
"use strict";
var request = new XMLHttpRequest();

function callback(){
	if(request.status >= 200 && request.status < 400){
		setHTML(this.response);
	}
}

//Sets HTML for default onload behavior (parses data and assigns to the initial text node)
function setHTML(response){
	let weatherData = JSON.parse(response);
	let msg = `Temperature in Lebanon, NH: ${weatherData.main.temp} °F. `;
	msg += howCold(weatherData.main.temp);
	let weatherText = document.createTextNode(msg);
	document.getElementById('weatherNode').appendChild(weatherText);
}

//Returns the API call URL for Lebanon
function getDefaultCallURL(){
	const APIKEY = "6cc0896b2cbd9c679194b07bb6fabfbb";
	let cityID = 5088597;
	return `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${APIKEY}&units=imperial`
}

//Gets a user location and calls the userCallURL function
//Sets button to "working" since the call takes a moment
function getUserLocation(){
	let weatherButton = document.getElementById('weatherButton');
	weatherButton.innerHTML = "Working...";
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(userCallURL);
	}
}

//Gets the API call URL for the user's location
function userCallURL(position){
	const APIKEY = "6cc0896b2cbd9c679194b07bb6fabfbb";
	let callURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${APIKEY}&units=imperial`;

	request.open('GET', callURL, true);
	request.onload = userCallback;
	request.send();
}

//Parses user location weather data and amends the weather reporting text to provide it.
function userCallback(){
	let weatherNode = document.getElementById("weatherNode");
	let msg;

	if(request.status >= 200 && request.status < 400){
		let userWeatherData = JSON.parse(this.response);
		msg = `Temperature in ${userWeatherData.name}: ${userWeatherData.main.temp} °F. `
		msg += howCold(userWeatherData.main.temp);
	} else {
		msg = "Unable to access the weather at your location."
	}
	let weatherText = document.createTextNode(msg);
	if (weatherNode.hasChildNodes()){
		weatherNode.removeChild(weatherNode.lastChild);
	}
	weatherNode.appendChild(weatherText);

	let weatherButton = document.getElementById('weatherButton');
	weatherButton.innerHTML = "Get your weather!";
}

//Reports if it is too cold or too warm for snowboarding
function howCold(temp){
	let upperBound = 40;
	let lowerBound = -10;

	if (temp > upperBound){
		return 'Too warm for snowboarding!'
	} else if (temp < lowerBound){
		return 'Too cold for snowboarding!'
	} else {
		return 'Looks like great weather for snowboarding!'
	}
}

//Calls the default weather checking behavior
function sysGetWeather(){
	let callURL = getDefaultCallURL();
	request.open('GET', callURL, true);
	request.onload = callback;
	request.send();
}
