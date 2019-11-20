$(document).ready(function(){
    
    var proxy = "https://cors-anywhere.herokuapp.com/"

   var where = "nashville" //prompt("What city are you traveling to?", "")
    
//    function cityGet(str) {
 //     where = str.charAt(0).toUpperCase() + where.substr(1).toLowerCase();
 //     console.log(where);
 //    };
    var state = "tn" //prompt("what state?", "");
    var howMany = 20 //prompt("how many results?", "")

 //   cityGet(where);

    var queryURL="https://developers.zomato.com/api/v2.1/cities?q=" + where + "&count=" + howMany
   
    $('#dropdown2 option').on('click',(e)=>{
        state = e.target.value;
        console.log(state);
        $("#stateId").text(state);
    });
    console.log(queryURL);

    $.ajax({
        url:queryURL,
        method:'GET',
        headers: {"user-key": "54c293be0945b9ad43220c20c0194e91"}
    }).then(function(response){
        $('<div>').text(JSON.stringify(response));
        //console.log(response);
        
        var cityState = where.charAt(0).toUpperCase() + where.substr(1).toLowerCase() + ", " + state.toUpperCase();
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
                        console.log(i);
                        console.log(response.restaurants[i].restaurant.name && response.restaurants[i].restaurant.location.address);
                        var food = $("<a>" + (response.restaurants[i].restaurant.name ) + "</a>");   

                    $('#foodName').append(food);
                    }
                        for (var i=0; i < response.restaurants.length; i++){
                        var spotT = $("<a>").text(response.restaurants[i].restaurant.location.address)
                        $('#foodLocation').append(spotT);
                        }

                })
            }
        
        };
    })

})

