"use strict";
let x = document.cookie;

if (x != "visited") {
  let head = document.createElement('h1');
  let subhead = document.createElement('h4');
  let headText = document.createTextNode("Hi.");
  let subheadText = document.createTextNode("Welcome to my webpage.");
  head.appendChild(headText);
  subhead.appendChild(subheadText);
  document.getElementById('mainIntro').appendChild(head);
  document.getElementById('mainIntro').appendChild(subhead);

  document.cookie = "visited";

} else {

  let head = document.createElement('h1');
  let subhead = document.createElement('h4');
  let headText = document.createTextNode("Welcome back.");
  let subheadText = document.createTextNode("Good to see you again.");
  head.appendChild(headText);
  subhead.appendChild(subheadText);
  document.getElementById('mainIntro').appendChild(head);
  document.getElementById('mainIntro').appendChild(subhead);

}
