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

var city = "Chicago";// prompt("What city?", "");
var size = 20;
var state = "IL"; //prompt("What state code?", "");
var date = "2019-11-21 00:00:00";
var optionType = "Sports"; //prompt("Would you like to see Sports or Music", "");

cityFormat(city);
stateFormat(state);
optionFormat(optionType);

var queryURL = "https://app.ticketmaster.com/discovery/v2/events?localStartDateTime=" + date + "&stateCode=" + state + "&size=" + size + "&keyword=" + optionType + "&city=" + city + "&apikey=Si8AYzaqaeokY7Ehz9inIZMH5lR2XsNA";

function cityFormat(myCity) {
    city = upperLower(myCity);
    console.log(city);
};

function upperLower(myStr){
    tempStr = myStr;
    tempArray = tempStr.split(" ");
    tempStr = "";
    tempArray.forEach(word => {
        tempStr += word.charAt(0).toUpperCase() + word.substr(1).toLowerCase() + " ";
    });
    tempStr = tempStr.trim();
    return tempStr
}

function stateFormat(state) {
    state = state.charAt(0).toUpperCase() + state.charAt(1).toUpperCase()
    console.log(state);
};

function optionFormat(optionType) {
    optionType = optionType.charAt(0).toUpperCase() + optionType.substr(1).toLowerCase();
    console.log(optionType);
};

$('#dropdown2 option').on('click',(e)=>{
    state = e.target.value;
    console.log(state);
    $("#stateId").text(state);
});
$('#dropdown1 option').on('click',(e)=>{
    optionType = e.target.value;
    console.log(optionType);
    $("#eventId").text(optionType);
});



$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      console.log(response);
    // console.log(response._embedded.events);
    if (response) {
        for (var i = 0; i < response._embedded.events.length; i++) {
            var timeDisplay = moment(response._embedded.events[i].dates.start.localTime, "HH:mm:ss").format("h:mm a");
            var dateDisplay = moment(response._embedded.events[i].dates.start.localDate, "YYYY-MM-DD").format("MMMM DD YYYY")

            console.log("Event: ", response._embedded.events[i].name, "Location: ", response._embedded.events[i]._embedded.venues[0].address.line1,"Date: ", dateDisplay,"Time: ", timeDisplay,"Ticket Link: ", response._embedded.events[i].url);
        }
    }
  });
})