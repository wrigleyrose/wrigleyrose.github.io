/* ************************************************
* Weather Site Javascript Functions
*********************************************** */


// Variables for Function Use
const temp = 31;
const speed = 5;

buildWC(speed, temp);

const direction = "NNE"; //set your own value

windDial(direction);

let currentWeather = "clear";
let weatherKeyword = getCondition(currentWeather);

changeSummaryImage(weatherKeyword);


/* This function will calculate the wind chill. */
function buildWC(speed, temp) {
    const feelTemp = document.getElementById('feelTemp');
    
    // compute wind chill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);
    
    // round the answer down to an integer
    wc = Math.floor(wc);
    
    // if chill is greater than temp, return temp
    wc = (wc > temp)?temp:wc;
    
    //display the wind chill
    console.log(wc);
    wc = 'Feels like ' + wc + '&deg;F';
    feelTemp.innerHTML = wc;
}

// wind chill function
function windDial(direction){
    
    //get the wind dial container
    const dial = document.getElementById("dial");
    console.log(direction);
    
    // determine the dial class
    switch (direction){
        case "North":
        case "N":
        dial.setAttribute("class","n"); //"n" is the CSS rule selector
        break;
        case "NE":
        case "NNE":
        case "ENE":
        dial.setAttribute("class", "ne");
        break;
        case "NW":
        case "NNE":
        case "WNW":
        dial.setAttribute("class","nw");
        break;
        case "South":
        case "S":
        dial.setAttribute("class", "s");
        break;
        case "SE":
        case "SSE":
        case "ESE":
        dial.setAttribute("class", "se");
        break;
        case "SW":
        case "SSW":
        case "WSW":
        dial.setAttribute("class", "sw");
        break;
        case "East":
        case "E":
        dial.setAttribute("class", "e");
        break;
        case "West":
        case "W":
        dial.setAttribute("class", "w");
        break;
    }
}


function getCondition(currentWeather) {
    
    currentWeather = currentWeather.toLowerCase();
    
    // check for clouds
    if(currentWeather.includes("cloud") || currentWeather.includes("overcast")) {
        return "cloud"
        
        //check for clear
    } else if (currentWeather.includes("clear") || currentWeather.includes("sunny")) {
        return "clear";
        
        //check for fog
    } else if (currentWeather.includes("rain") || currentWeather.includes("downpour")) {
        return "rain";
    
        //check for snow
    } else if (currentWeather.includes("snow") || currentWeather.includes("white")) {
        return "snow";
        
        //return clear if n/a
    } else {
        return "clear";
    }
}

// Change Summary Image function

function changeSummaryImage(weatherKeyword){

    //Identify HTML element for which CSS rule will be used.
    const curWeather = document.getElementById('curWeather');


    // Change html element so correct CSS rule will change background image to reflect current weather.
    switch(weatherKeyword){
        case "cloud":
            curWeather.setAttribute("class", "cloud");
            console.log(weatherKeyword);
            break;

        case "rain":
            curWeather.setAttribute("class","rain");
            console.log(weatherKeyword);
            break;

        case "clear":
            curWeather.setAttribute("class","clear");
            console.log(weatherKeyword);
            break;

        case "snow":
            curWeather.setAttribute("class","snow");
            console.log(weatherKeyword);
            break;

        case "fog":
            curWeather.setAttribute("class","fog");
            console.log(weatherKeyword);
            break;

    }
}


// call getData function and send locale
            getData(LOCALE);
            
            // get data from API
            function getData(LOCALE) {
                const WU_API_KEY = '08769fdf6efff4ca';
                const URL = "https://api.wunderground.com/api/" + WU_API_KEY + "/conditions/q/" + LOCALE + ".json";
                fetch(URL)
                .then(response => response.json())
                .then(function (data ){
                    console.log('Json object from getData function:');
                    console.log(data);
                    displayData(data);
                })
                .catch(error => console.log('There was an error: ', error))
            } // end getData function


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

// populate the current location weather page
function displayData() {
    
    // feed data to wind chill, dial, and image functions
    
    // populate location info
    
    // populate weather ino (wunderground logo and text in footer)
    
    // hide status and show main
}

