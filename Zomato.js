$(document).ready(function(){
    
    var proxy = "https://cors-anywhere.herokuapp.com/"

    
//    function cityGet(str) {
 //     where = str.charAt(0).toUpperCase() + where.substr(1).toLowerCase();
 //     console.log(where);
 //    };
    var state = ""
    var howMany = 20 //prompt("how many results?", "")

 //   cityGet(where);

    var queryURL="https://developers.zomato.com/api/v2.1/cities?q="// + where + "&count=" + howMany
   
    $('#dropdown2 option').on('click',(e)=>{
        state = e.target.value;
        console.log(state);
        $("#stateId").text(state);
    });
    console.log(queryURL);

     $(".waves-light").on("click", function(event) {
        $("#foodName").empty();
         var cityChoice = $("#city-search").val().trim();
        console.log(cityChoice);
        $.ajax({
        url:queryURL + cityChoice + "&count" + howMany,
        method:'GET',
        headers: {"user-key": "54c293be0945b9ad43220c20c0194e91"}
    }).then(function(response){
        $('<div>').text(JSON.stringify(response));
        console.log(response);
        
        var cityState = cityChoice.charAt(0).toUpperCase() + cityChoice.substr(1).toLowerCase() + ", " + state.toUpperCase();
        console.log(cityState);
        for (var i = 0; i < response.location_suggestions.length; i++) {

            if(response.location_suggestions[i].name === cityState ){

                console.log(response.location_suggestions[i])

                var cityId = response.location_suggestions[i].id
                
                var queryURL2 ="https://developers.zomato.com/api/v2.1/search?entity_id=" + cityId + "&entity_type=city&count=&sort=cost&order=asc" 

                
             
                $.ajax({
                    url:queryURL2,
                    method:'GET',
                    headers: {"user-key": "54c293be0945b9ad43220c20c0194e91"}
                }).then(function(response){
                    $('<div>').text(JSON.stringify(response));
                    console.log(response);
                    for (var i=0; i < response.restaurants.length; i++){
                       //  var food = $("<a>" + (response.restaurants[i].restaurant.name ) + "</a>");   
                        //var spotT = $("<a>" + (response.restaurants[i].restaurant.location.address) + "</a>");
                        var img = $('<img src=" '+ response.restaurants[i].restaurant.thumb + '">');
                        console.log(img); 
                        $("#foodName").append(img);
                        var oTc = ("<br>" + "Hours" + ":" + ""+ response.restaurants[i].restaurant.timings +"<br>")
                        var menuUrl = response.restaurants[i].restaurant.menu_url;
                        var menu= $("<br>" + '<a href=" ' + menuUrl +'"> Menu' + "</a>")
                        console.log(menu);
                        $("#foodName").append(menu);
                        $("#foodName").append(oTc);
                        var nameLocal = $("<br>" + ("Name" +":" + "" + response.restaurants[i].restaurant.name) +"</br>" + "<br>" + ("Address" + ":" + "" + response.restaurants[i].restaurant.location.address) + "</br>");
                        console.log(nameLocal);
                        var divElement = $('<div>');
                        $("#foodName").append(nameLocal);
                        $(divElement).append("<br>");
                    }
                        

                })
            }
        
        };
    })

    })
})

