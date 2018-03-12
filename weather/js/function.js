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







