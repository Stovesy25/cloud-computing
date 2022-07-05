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
 * Weather API (using geonames) to get the current weather and displays it to the client
 * 
 * @author Graham Stoves - w19025672
 */

$(document).ready(function () {
    $.getJSON("http://api.geonames.org/findNearByWeatherJSON?lat=54.977&lng=-1.607&username=*", function (result) {
        var myObj = result.weatherObservation;
        $("#loc").text(`Location: ${myObj.stationName}`);
        $("#temp").text(`Temperature: ${myObj.temperature}°C`);
        $("#humidity").text(`Humidity: ${myObj.humidity}%`);
        $("#windspeed").text(`Wind Speed: ${myObj.windSpeed}mph`);
        $("#clouds").text(`Clouds: ${myObj.clouds}`);
    })
})