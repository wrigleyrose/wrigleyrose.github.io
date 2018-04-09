var list = document.getElementById("navigation");
var main = document.getElementById("main-nav");
var prod = document.getElementById("products");
var index = document.getElementById("home");

//function to build template page

function mainBuid(acme) {
    console.log(acme.name);
    document.getElementById("name").innerHTML = acme.name;
    document.getElementById("description").innerHTML = acme.description;
    document.getElementById("path").src = acme.path;
    document.getElementById("manufacturer").innerHTML = "<b>Made by: </b>" + acme.manufacturer;
    document.getElementById("reviews").innerHTML = "<b>Reviews: </b>" + acme.reviews;
    document.getElementById("price").innerHTML = "$" + acme.price;
}

function getData(X) {

    console.log(X);

    fetch("/acme/js/acme.json")
        .then(response => response.json())
        .then(function (acme) {

            acme = acme[X];
            console.log(acme);
            pageBuild(acme);

        })
        // send acme to display function
        .catch(error => console.log('Error found: ', error))
}

/*build function pageBuild*/

function pageBuild() {

    event.preventDefault();

    let X = event.target.innerHTML;
    if (X.includes("home") || X == undefined) {
        return false;
    }

    getData(X);
    main.setAttribute("class", "hide");
    prod.setAttribute("class", "show");

}

function home() {
    main.setAttribute("class", "show");
    prod.setAttribute("class", "hide");
event.stopImmediatePropagation();
}

list.addEventListener("click", pageBuild, false);
index.addEventListener("click", home, true);