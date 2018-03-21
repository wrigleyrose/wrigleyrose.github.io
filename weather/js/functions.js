//Weather Site JavaScript Functions
"use strict";



//This function will calculate a wind chill temperature
function buildSmallWC(speed, temp) {
    //feelTemp is a const because the value will not change
    const feelTemp = document.getElementById("small-feels");
    //Compute the windchill
    //wc is a let because the value is subject to change
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc + " is the calculated windchill (small screens)");
    //Round the answer down to integer
    wc = Math.floor(wc);
    //If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;
    //Display the windchill
    console.log(wc + " has been confirmed to be correct (small screens)");
    wc = "Feels like " + wc + "&deg;F";
    feelTemp.innerHTML = wc;
}


function buildWC(speed, temp) {
    //feelTemp is a const because the value will not change
    const feelTemp = document.getElementById("feels");
    //Compute the windchill
    //wc is a let because the value is subject to change
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc + " is the calculated windchill (large screens)");
    //Round the answer down to integer
    wc = Math.floor(wc);
    //If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;
    //Display the windchill
    console.log(wc + " has been confirmed to be correct (large screens)");
    wc = "Feels like " + wc + "&deg;F";
    feelTemp.innerHTML = wc;
}

//Wind Dial Function for small screens
function windDialSmall(direction) {
    //Get the wind dial container
    const dial = document.getElementById("small-wind-pointer");
    console.log(direction + " is the direction that has been given and needs to be translated (small screens)");
    //Determine the dial class
    switch(direction) {
        case "North":
        case "N":
            dial.setAttribute("class", "n"); //"n" is the CSS rule
            break;
        case "NE":
        case "NNE":
        case "ENE":
            dial.setAttribute("class", "ne");
            break;
        case "NW":
        case "NNW":
        case "WNW":
            dial.setAttribute("class", "nw");
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

//Wind Dial Function for large screens
function windDial(direction) {
    //Get the wind dial container
    const dial = document.getElementById("wind-pointer");
    console.log(direction + " is the direction that has been given and needs to be translated (large screens)");
    //Determine the dial class
    switch(direction) {
        case "North":
        case "N":
            dial.setAttribute("class", "n"); //"n" is the CSS rule
            break;
        case "NE":
        case "NNE":
        case "ENE":
            dial.setAttribute("class", "ne");
            break;
        case "NW":
        case "NNW":
        case "WNW":
            dial.setAttribute("class", "nw");
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


function getCondition(wCond) {
    console.log(wCond + " is the weather condition that needs to be analyzed for keywords");
    wCond = wCond.toLowerCase();
    if (wCond.search("sun")) {
        return "clear";
    }
    else if (wCond.search("cloud")) {
        return "cloudy";
    }
    else if (wCond.search("fog") || wCond.search("haz")) {
        return "fog";
    }
    else if (wCond.search("rain") || wCond.search("storm")) {
        return "rain";
    }
    else if (wCond.search("snow")) {
        return "snow";
    }
}


function changeSummaryImage(rCond) {
    const weather = document.getElementById("curWeather");
    console.log(rCond + " is the weather condition that was recieved");
    if(rCond == "clear") {
        weather.setAttribute("class", "clear");
        console.log("Picture has been set to clear");
    }
    else if(rCond == "cloudy") {
        weather.setAttribute("class", "cloudy");
        console.log("Picture has been set to cloudy");
    }
    else if(rCond == "fog") {
        weather.setAttribute("class", "fog");
        console.log("Picture has been set to fog");
    }
    else if(rCond == "rain") {
        weather.setAttribute("class", "rain");
        console.log("Picture has been set to rain");
    }
    else if (rCond == "snow") {
        weather.setAttribute("class", "snow");
        console.log("Picture has been set to snow");
    }
}

// Get Data from API
function getData(LOCALE) {
    const WU_API_KEY = '4e4748cb1eeb2437 ';
    const URL = "https://api.wunderground.com/api/" + WU_API_KEY + "/conditions/forecast/q/" + LOCALE + ".json";
    fetch(URL)
        .then(response => response.json())
        .then(function (data) {
        console.log('Json object from getData function:');
        console.log(data);
        displayData(data);
    })
        .catch(error => console.log('There was an error: ', error))
} // end getData function

// Populate the current location weather page
function displayData(data){
    // Task 1 - Feed data to WC, Dial and Image functions

    // Get the data from the JSON, put it in variables when needed, and inject it into the webpage
    let temp = data.current_observation.temp_f;
    temp = roundValue(temp);
    let speed = data.current_observation.wind_mph;
    speed = roundValue(speed);
    const direction = data.current_observation.wind_dir;
    const gusts = data.current_observation.wind_gust_mph;
    const condition = data.forecast.simpleforecast.forecastday[0].conditions;
    document.getElementById("small-cur-temp").innerHTML = temp + "&#176;F";
    document.getElementById("cur-temp").innerHTML = temp + "&#176;F";
    document.getElementById("small-hi").innerHTML = data.forecast.simpleforecast.forecastday[0].high.fahrenheit + "&#176;F";
    document.getElementById("hi").innerHTML = data.forecast.simpleforecast.forecastday[0].high.fahrenheit + "&#176;F";
    document.getElementById("small-lo").innerHTML = data.forecast.simpleforecast.forecastday[0].low.fahrenheit + "&#176;F";
    document.getElementById("lo").innerHTML = data.forecast.simpleforecast.forecastday[0].low.fahrenheit + "&#176;F";
    document.getElementById("small-wind-speed").innerHTML = speed + "mph";
    document.getElementById("wind-speed").innerHTML = speed + "mph";
    buildSmallWC(speed, temp);
    buildWC(speed, temp);
    windDialSmall(direction);
    windDial(direction);

    //Get the weather condition and change the background image as needed
    const cond = document.getElementById("curWeather");
    cond.setAttribute("class", condition);
    const recievedCondition = getCondition(condition);
    changeSummaryImage(recievedCondition);

    //Set the condition container information using the recievedCondition variable declared earlier
    const condHeadingSmall = document.getElementById("small-cond-heading");
    condHeadingSmall.innerHTML = recievedCondition;
    const condHeading = document.getElementById("cond-heading");
    condHeading.innerHTML = recievedCondition;
    const condIconSmall = document.getElementById("small-icon-pos");
    const condIcon = document.getElementById("icon-pos");
    if(recievedCondition == "clear") {
        condIconSmall.innerHTML = "<img src='https://icons.wxug.com/i/c/a/sunny.gif' alt='clear'>";
        condIcon.innerHTML = "<img src='https://icons.wxug.com/i/c/a/sunny.gif' alt='clear'>";
    }
    else if(recievedCondition == "cloudy") {
        condIconSmall.innerHTML = "<img src='https://icons.wxug.com/i/c/a/mostlycloudy.gif' alt='cloudy'>";
        condIcon.innerHTML = "<img src='https://icons.wxug.com/i/c/a/mostlycloudy.gif' alt='cloudy'>";
    }
    else if(recievedCondition == "fog") {
        condIconSmall.innerHTML = "<img src='https://icons.wxug.com/i/c/a/hazy.gif' alt='foggy'>";
        condIcon.innerHTML = "<img src='https://icons.wxug.com/i/c/a/hazy.gif' alt='foggy'>";
    }
    else if (recievedCondition == "rain") {
        condIconSmall.innerHTML = "<img src='https://icons.wxug.com/i/c/a/rain.gif' alt='rainy'>";
        condIcon.innerHTML = "<img src='https://icons.wxug.com/i/c/a/rain.gif' alt='rainy'>";
    }
    else if(recievedCondition == "snow") {
        condIconSmall.innerHTML = "<img src='https://icons.wxug.com/i/c/a/snow.gif' alt='snow'>";
        condIcon.innerHTML = "<img src='https://icons.wxug.com/i/c/a/snow.gif' alt='snow'>";
    }

    // Task 2 - Populate location information
    const location = document.getElementById("full-location");
    const latlong = document.getElementById("location");
    const zip = document.getElementById("zip");
    let elevation = data.current_observation.display_location.elevation;
//    let elevation = parseFloat(document.getElementById("elevation");
    elevation = parseFloat(elevation);
    elevation = convertMToFt(elevation);
    elevation = roundValue(elevation);

    location.innerHTML = data.current_observation.display_location.full;
    latlong.innerHTML = data.current_observation.display_location.latitude + "&#176; N, " + data.current_observation.display_location.longitude + "&#176; W";
    zip.innerHTML = data.current_observation.display_location.zip + " | ";
//    elevation.innerHTML = data.current_observation.display_location.elevation + "ft. | ";
    document.getElementById("elevation").innerHTML = elevation + "ft. | ";


    // Task 3 - Populate weather information (including the wunderground logo and text in footer)
    const windDirSm = document.getElementById("small-wind-dir");
    windDirSm.innerHTML = "<b>Direction:</b> " + direction;
    const windDir = document.getElementById("wind-dir");
    windDir.innerHTML = "<b>Direction:</b> " + direction;
    const windGustSm = document.getElementById("small-gusts");
    windGustSm.innerHTML = "<b>Gusts:</b> " + gusts + "mph";
    const windGust = document.getElementById("gusts");
    windGust.innerHTML = "<b>Gusts:</b> " + gusts + "mph";

    const footer = document.getElementById("page-footer");



    // Task 4 - Hide status and show main
    const status = document.getElementById("status");
    status.setAttribute("class", "hide");
    const main = document.getElementById("main");
    main.setAttribute("class", "show");
}

function roundValue(initial) {
    console.log(initial + " is the received value");
    var rounded = Math.round(initial);
    console.log(rounded + " is the rounded value");
    return rounded;
}

function convertMToFt(meters) {
    console.log(meters + " is the received value in meters");
    var feet = meters * 3.28084;
    feet = Math.round(feet);
    console.log(feet + " is the converted, rounded value in feet")
    return feet;
}