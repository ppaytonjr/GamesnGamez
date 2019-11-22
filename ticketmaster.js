$(document).ready(function(){
    //var wrapper;

    function buildTemplate(obj) {
        
        // <div class="row deep-purple darken-3" class="eventItem"> //
        //     <div class="col s12" class="eventName">obj.name</div>
        //     <div class="col s5" class="eventLocation">obj.location</div>
        //     <div class="col s5" class="eventDate">obj.date</div>
        //     <div class="col s5" class="eventTime">obj.time</div>
        //     <a class="col s5" href="obj.link" class="eventLink">Link</a>
        // </div>
        var wrapper = $('<div>').addClass('row eventItem').css({'border-top': '10px solid black'});
        var eventName = $('<div>').addClass('col s12 eventName').text(obj.name);
        var eventLocation = $('<div>').addClass('col s5 eventLocation').text(obj.location);
        var eventDate = $('<div>').addClass('col s5 eventDate').text(obj.date);
        var eventTime = $('<div>').addClass('col s5 eventTime').text(obj.time);
        var eventLink = $('<a>').addClass('col s5 eventLink').attr('href', obj.link).text("Get Tickets");
        var image = $('<img>').addClass('col s5 image').attr('src', obj.image);//added code
        wrapper.append(eventName);
        wrapper.append(eventLocation);
        wrapper.append(eventDate);
        wrapper.append(eventTime);
        wrapper.append(eventLink);
        wrapper.append(image); //added code
        $('#eventDivId').append(wrapper);
    }
var sportEventEl = $("#sportEvent");
var sportLocationEl = $("#sportLocation");
var sportDateEl = $("#sportDate");
var sportTimeEl = $("#sportTime");
var ticketLinkEl = $("#ticketLink");
// var musicLocationEl = $("#musicLocation");
// var musicDateEl = $("#musicDate");
// var musicTimeEl = $("#musicTime");
// var musicPriceEl = $("#musicPrice");

var city;// prompt("What city?", "");
var size = "200";
var state; //prompt("What state code?", "");

var optionType; //prompt("Would you like to see Sports or Music", "");

$("#setVar").on("click", function() {
    
    city = $("#city-search").val().trim();
    cityFormat(city);
    console.log(city);
    // state = $("#dropdown2 option").val();
    console.log(state);
    console.log(optionType);

    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.JSON?stateCode=" + state + "&size=" + size + "&keyword=" + optionType + "&city=" + city + "&apikey=Si8AYzaqaeokY7Ehz9inIZMH5lR2XsNA";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response);
        // console.log(response._embedded.events);
        if (response) {
            $("#eventDivId").empty();
            for (var i = 0; i < response._embedded.events.length; i++) {
                var responseEventEl = response._embedded.events[i].name;
                var responseLocationEl = response._embedded.events[i]._embedded.venues[0].address.line1;
                var responseDateEl = dateDisplay;
                var responseTimeEl = timeDisplay;
                var responseTicketEl = response._embedded.events[i].url;
                var timeDisplay = moment(response._embedded.events[i].dates.start.localTime, "HH:mm:ss").format("h:mm a");
                var dateDisplay = moment(response._embedded.events[i].dates.start.localDate, "YYYY-MM-DD").format("MMMM DD YYYY")
                var imageDisplay = response._embedded.events[i].images[4].url; //added code
              //var imageDisplayMusic = response._embedded.events[i].images[0];
                // console.log("Event: ", response._embedded.events[i].name, "Location: ", response._embedded.events[i]._embedded.venues[0].address.line1,"Date: ", dateDisplay,"Time: ", timeDisplay,"Ticket Link: ", response._embedded.events[i].url);

                console.log(responseEventEl);
                
                //sportLocationEl.append(responseLocationEl);
                // sportEventEl.append(responseEventEl);
                // sportLocationEl.append(responseLocationEl);
                // sportDateEl.append(responseDateEl);
                // sportTimeEl.append(responseTimeEl);
                // ticketLinkEl.append(responseTicketEl);
                var obj = {
                    name: responseEventEl,
                    location: responseLocationEl,
                    date: responseDateEl,
                    time: responseTimeEl,
                    link: responseTicketEl,
                    image: imageDisplay  //added code
                };

                buildTemplate(obj);
            }
        }
      });
    

})


// stateFormat(state);
// optionFormat(optionType);

function cityFormat(myCity) {
    city = upperLower(myCity);
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

// function stateFormat(state) {
//     state = state.charAt(0).toUpperCase() + state.charAt(1).toUpperCase()
//     console.log(state);
// };

// function optionFormat(optionType) {
//     optionType = optionType.charAt(0).toUpperCase() + optionType.substr(1).toLowerCase();
//     console.log(optionType);
// };

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




})