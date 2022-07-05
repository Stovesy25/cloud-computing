/*********************************************
******************************************
* Title: JQuery
* Author: OpenJS Foundation
* Date: 24th March 2022
* Code version: 3.6.0
* Availability: https://releases.jquery.com/
*
**********************************************
*****************************************/

/**
 *
 * Handles all of the events related to the map, including directions and markers
 * 
 * @author Graham Stoves - w19025672
 */

/**
 * Initialises the Google map using the Google map API
 */
function initialise() {
    //Lat and lon of the HQ
    let myLatlng = new google.maps.LatLng(54.976917999070814, -1.6075839987636935);
    //Map options
    let mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: true,
        overviewMapControl: false,
        rotateControl: false,
        scaleControl: false,
        panControl: false,
    };

    //Creates the map and pushes to the #map element in the page
    let map = new google.maps.Map(document.getElementById("map"),
        mapOptions);
    //Sets the maps bounds
    let bounds = new google.maps.LatLngBounds();

    /**
    * Uses Google's directions API to calculate the distance between a users
    * lat and lon and the HQ of Sustainable North East 
    * 
    * @param {*} lat 
    * @param {*} lon 
    */
    function getDirectionsToPlace(lat, lon) {
        //Request options
        let request = {
            origin: new google.maps.LatLng(lat, lon),
            destination: myLatlng,
            travelMode: google.maps.TravelMode.DRIVING
        };

        //Resets the directions text to blank and weather to the HQ location
        $("#reset-directions").click(function () {
            directionsDisplay.setMap(null);
            changeWeather(54.976917999070814, -1.6075839987636935);
            $("#directions-header").text(``);
            $("#directions-info").text(``);
            $("#distance-info").text(``);
        });

        let directionsService = new google.maps.DirectionsService();
        let directionsDisplay = new google.maps.DirectionsRenderer();

        //Directions request, the reponse is passed into #directions-info and displayed to the client
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setMap(map);
                $("#directions-header").text(`Directions`);
                directionsDisplay.setPanel(document.getElementById("directions-info"));
                directionsDisplay.setDirections(response);
            }
        });
    }

    /**
     * 
     * Function that creates the map markers based on the tweeters geo location which is 
     * pulled from the tweet. Type param is used to to select a marker image depending on what
     * the hashtag is in the tweet.
     * 
     * @param {*} lat 
     * @param {*} lon 
     * @param {*} name 
     * @param {*} type 
     * @param {*} content 
     */
    function createMapMarker(lat, lon, name, type, content) {
        //Marker options
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            map: map,
            title: name,
            icon: type,
        });

        bounds.extend(new google.maps.LatLng(lat, lon))
        //Info window content
        let infowindow = new google.maps.InfoWindow({
            content: `<h1>Tweeter: ${name}</h1>
				<p>${content}</p>`
        });

        //Handles mouseover event - opens marker
        google.maps.event.addListener(marker, 'mouseover', function (e) {
            infowindow.open(map, marker);
        });

        //Handles mouseout event - closes marker
        google.maps.event.addListener(marker, 'mouseout', function (e) {
            infowindow.close(map, marker);
        });

        //Handles click event - changes weather to be for that location, also works out direction by going to direction function
        google.maps.event.addListener(marker, 'click', function (e) {
            changeWeather(lat, lon)
            getDirectionsToPlace(lat, lon)
            getDistanceToPlace(lat, lon)

        })
        map.fitBounds(bounds);
    }

    //Calls the twitter api to receive the twitter information
    $.getJSON("/assets/php/call_twitter_api.php", function (tweetdata) {
        $.each(tweetdata.statuses, function (key, objTweet) {
            if (objTweet.place) {
                //Gets that lat and lon and uses bounding_box to create a square to allow the user to get the location of where they click
                let twitterLat = objTweet.place.bounding_box.coordinates[0][0][1];
                let twitterLon = objTweet.place.bounding_box.coordinates[0][0][0];
                let twitterUserName = objTweet.user.name;
                let tweetText = objTweet.full_text;
                const markerType = {
                    climateChange: '../assets/images/climatechange.png',
                    netZero: '../assets/images/netzero.png',
                    both: '../assets/images/combined.png'
                }

                //Chooses the right image to include depending on what the hashtag is in the tweet
                let currentHashtag = objTweet.entities.hashtags;
                let climateChange = false;
                let netZero = false;
                for (let i = 0; i < currentHashtag.length; ++i) {
                    if (currentHashtag[i].text === 'climatechange') {
                        climateChange = true;
                    } else if (currentHashtag[i].text === 'netzero') {
                        netZero = true;
                    }
                }

                if (climateChange === true && netZero === false) {
                    createMapMarker(twitterLat, twitterLon, twitterUserName, markerType.climateChange, tweetText);
                    climateChange = false;
                } else if (netZero === true && climateChange === false) {
                    createMapMarker(twitterLat, twitterLon, twitterUserName, markerType.netZero, tweetText);
                    netZero = false;
                } else {
                    createMapMarker(twitterLat, twitterLon, twitterUserName, markerType.both, tweetText);
                    climateChange = false
                    netZero = false
                }
            }
        });
    });

    //Displays a default marker for Sustainable North East HQ 
    let marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: "Sustainable North East"
    });

    let infowindow = new google.maps.InfoWindow({
        content: `<h1>Sustainable North East HQ</h1>`
    });

    google.maps.event.addListener(marker, 'mouseover', function (e) {
        infowindow.open(map, marker);
    });

    google.maps.event.addListener(marker, 'mouseout', function (e) {
        infowindow.close(map, marker);
    });
    marker.setMap(map);
}

/**
 * Function that uses the google distance matrix to calculate the distance between HQ and the users 
 * lat and lon they select. 
 * 
 * @param {*} lat 
 * @param {*} long 
 */
function getDistanceToPlace(lat, lon) {
    //Sustainable North East HQ location
    let origin1 = new google.maps.LatLng(54.976917999070814, -1.6075839987636935);
    //Passed in destination lat and lon
    let destinationA = new google.maps.LatLng(lat, lon);
    let service = new google.maps.DistanceMatrixService();
    //Service options
    service.getDistanceMatrix({
        origins: [origin1],
        destinations: [destinationA],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
    }, callback);

    //Displays the response to the client if the status is OK
    function callback(response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK) {
            let origins = response.originAddresses;
            $.each(origins, function (originIndex) {
                let results = response.rows[originIndex].elements;
                $.each(results, function (resultIndex) {
                    let element = results[resultIndex];
                    let distance = element.distance.text;
                    let duration = element.duration.text;
                    $("#distance-info").text(`Driving distance to Sustainable North East HQ is ${distance} and will take approximately ${duration}`);
                });
            });
        }
    }
}

/**
 * Function to change the weather info in the header depending on where the client clicks on the map
 *  
 * @param {*} lat 
 * @param {*} long 
 */
function changeWeather(lat, lon) {
    $.getJSON(`http://api.geonames.org/findNearByWeatherJSON?lat=${lat}&lng=${lon}&username=*`, function (result) {
        let myObj = result.weatherObservation;
        $("#loc").text(`Location: ${myObj.stationName}`);
        $("#temp").text(`Temperature: ${myObj.temperature}°C`);
        $("#humidity").text(`Humidity: ${myObj.humidity}%`);
        $("#windspeed").text(`Wind Speed: ${myObj.windSpeed}mph`);
        $("#clouds").text(`Clouds: ${myObj.clouds}`);
    })
}

google.maps.event.addDomListener(window, 'load', initialise);