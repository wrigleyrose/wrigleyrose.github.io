/* *********************************
these functions work together to get weather info for the current location and put the data on the web page
********************************** */

'use strict';

// call the function to get our location

getGeoLocation();

// gets longtude and latitude of current location
function getGeoLocation() {
    
    // get status element and display message so viewer knows something is happening
    const STATUS = document.getElementById('status');
    STATUS.innerHTML = 'Getting Location...';

    // asks browser if it supports the API and is so, use it to find location. If not, display an error.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const LAT = position.coords.latitude;
            const LONG = position.coords.longitude;
            
            // combine values
            const LOCALE = LAT + ", " + LONG;
            console.log(`Lat and Long are: ${LOCALE}.`);
            
        })
    } else {
        STATUS.innerHTML = "Your browser does not support Geolocation or it is not enabled!"
    } //end else
} // end getGeoLocation