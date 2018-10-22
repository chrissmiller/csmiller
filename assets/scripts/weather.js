/*
	This program uses the OpenWeatherMap API to access the temperature in Lebanon, and
	tells the user if it is a good skiing/snowboarding temperature (defined as between -10 and 40 degrees Fahrenheit).

	It also allows the user to check the temperature at their own location and provides the same functionality.
	Sorry for any sloppy styling here - I haven't used JS before but it was fun to learn this bit!

	Due to free API limitations - may be slow if user makes a lot of calls in rapid succession
*/
"use strict";
var request = new XMLHttpRequest();

//Returns the API call URL for Lebanon
function sysWeatherCheck(){
	const APIKEY = "6cc0896b2cbd9c679194b07bb6fabfbb";
	let cityID = 5088597;
	let callURL = `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${APIKEY}&units=imperial`;
	sendRequest(callURL);
}

//Gets a user location and calls the userCallURL function
//Sets button to "working" since the call takes a moment
function userWeatherCheck(){
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
	sendRequest(callURL);
}


//Parses weather data and amends the weather reporting text to provide it.
function callbackWeather(){
	let weatherNode = document.getElementById("weatherNode");
	let msg;

	if(request.status >= 200 && request.status < 400){
		let weatherData = JSON.parse(this.response);
		msg = `Temperature in ${weatherData.name}: ${weatherData.main.temp} °F. `
		msg += howCold(weatherData.main.temp);
	} else {
		msg = "Load your weather!"
		console.log("Weather request error. Request status: " + request.status)
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
function sendRequest(callURL){
	request.open('GET', callURL, true);
	request.onload = callbackWeather;
	request.send();
}
