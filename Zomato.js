$(document).ready(function(){
    var proxy = "https://cors-anywhere.herokuapp.com/"

    var city = prompt("What city are you traveling to?", "")

    var queryURL="https://developers.zomato.com/api/v2.1/cities?q=" + city + "&count=20"
    
    console.log(queryURL);

    $.ajax({
        url:queryURL,
        method:'GET',
        headers: {"user-key": "54c293be0945b9ad43220c20c0194e91"}
    }).then(function(response){
        $('body').text(JSON.stringify(response));
        console.log(response);
        
        
        for (var i = 0; i < response.location_suggestions.length; i++) {

            if(response.location_suggestions[i].name ==="Nashville, TN"){

                console.log(response.location_suggestions[i].id)

                var cityId = response.location_suggestions[i].id
                
                var queryURL2 ="https://developers.zomato.com/api/v2.1/search?entity_id=" + cityId + "&entity_type=city&count=20&sort=cost&order=asc" 

                
             
            $.ajax({
                url:queryURL2,
                method:'GET',
                headers: {"user-key": "54c293be0945b9ad43220c20c0194e91"}
            }).then(function(response){
                $('body').text(JSON.stringify(response));
                console.log(response);
            })
        }
        
        };
    })

})

