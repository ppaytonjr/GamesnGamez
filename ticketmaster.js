$(document).ready(function(){
//var searchCityEl = $("#locoSearch");
// var sportLocationEl = $("#sportLocation");
// var sportDateEl = $("#sportDate");
// var sportTimeEl = $("#sportTime");
// var sportPriceEl = $("#sportPrice");
// var musicLocationEl = $("#musicLocation");
// var musicDateEl = $("#musicDate");
// var musicTimeEl = $("#musicTime");
// var musicPriceEl = $("#musicPrice");
// var restaurantLocationEl = $("#restaurantLocation");
// var restaurantDateEl = $("#restaurantDate");
// var restaurantTimeEl = $("#restaurantTime");
// var restaurantPriceEl = $("#restaurantPrice");

var city = prompt("What city?", "");
var size = 50;
var state = prompt("What state code?", "");
var optionType = prompt("Would you like to see Sports or Music", "");

var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + city + "&stateCode="+ state + "&size=" + size + "&apikey=Si8AYzaqaeokY7Ehz9inIZMH5lR2XsNA";

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response._embedded.events);
    for (var i = 0; i < response._embedded.events.length; i++) {

        // console.log("Event: " + response._embedded.events[i].name, "Type: " + response._embedded.events[i].classifications[0].segment.name);

    if (optionType === response._embedded.events[i].classifications[0]      .segment.name) {
        console.log("Event: ", response._embedded.events[i].name, "Location: ", response._embedded.events[i]._embedded.venues[0].address.line1,"Date: ", response._embedded.events[i].dates.start.localDate,"Time: ", response._embedded.events[i].dates.start.localTime,"Ticket Link: ", response._embedded.events[i].url);
        }
    } 

  });
})