'use strict';

//get the DOM element
const QUERY = document.getElementById('query');

//listen for user input, get matching location
QUERY.addEventListener('keyup', function() {
    let value = QUERY.value;
    
// create new script element
    const SCRIPT_ELEMENT = document.createElement('script');
    
// set script source to autocomplete api using jsonp
    //include value being typed and return results
    SCRIPT_ELEMENT.src = "https://autocomplete.wunderground.com/aq?query=" + value + "&cb=processJSON";
    
    //inject script element into the page <head> where it will be executed
    document.getElementsByTagName('head')[0].appendChild(SCRIPT_ELEMENT);
    
}); // ends the eventListener

// build list of matching locations
// Build the list of matching locations
function processJSON(json) {
 // Log what is returned
 console.log(json);

// Build an unordered list
// Use a for loop to include the results in list items
 let list = "<ul>";
 for (let i = 0, n = json.RESULTS.length; i < n; i++) {
  list += "<li><a data-location='zmw:"+ json.RESULTS[i].zmw +"' href='https://wunderground.com/" + json.RESULTS[i].l + "' title='See weather information for " + json.RESULTS[i].name + "' target='_blank'>" + json.RESULTS[i].name + "</a></li>";
 };
 list += "</ul>";

// Inject list into the searchResults section of the web page
searchResults.innerHTML = list;
} // ends the processJSON function
    
                       
// eventListener function that will detect a click in the searchResults list, capture the data, and send data in getData() function

const search = document.getElementById('searchResults');

search.addEventListener('click', function () {
    let locationCity = event.target.dataset.location;
    
    console.log(locationCity);
    
    getData(locationCity);
    
    document.getElementById('searchform').addEventListener('click', function() {
        document.getElementById('searchResults').style.display = 'block';
    })
})
    
