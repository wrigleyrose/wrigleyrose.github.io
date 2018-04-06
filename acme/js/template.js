$(document).ready(function () {

    var jsonData;

    document.getElementById("products").style.display = "none";

    $.getJSON("/acme/js/acme.json", function (data) {
        jsonData = data;
        console.log(jsonData);
        var output = '<ul>';
        output += '<li><a href="#" title="Home">Home</a></li>';
        $.each(data, function (key, value) {
            output += '<li>';
            output += '<a href="//google.com" title="' + key + '">' + key + '</a>';
            output += '</li>';
        });
        output += '</ul>';
        $("#nav").html(output);
    });

    $("#nav").on("click", "a", function (evt) {
        evt.preventDefault();
        var pageName = $(this).text();
        console.log("You clicked: " + pageName);

        if (pageName == "Home") {
            document.getElementById("home-content").style.display = "inline";
            document.getElementById("products").style.display = "none";
            document.getElementById("right-link").style.display = "inline";
            $("title").text("ACME");

        } else {

            document.getElementById("home-content").style.display = "none";
            document.getElementById("products").style.display = "inline";
            document.getElementById("right-links").style.display = "none";


            var name = jsonData[pageName].name;
            var path = jsonData[pageName].path;
            var description = jsonData[pageName].description;
            var manufacturer = jsonData[pageName].manufacturer;
            var price = jsonData[pageName].price;
            var reviews = jsonData[pageName].reviews;
            console.log(name);
            console.log(path);
            console.log(description);
            console.log(manufacturer);
            console.log(price);
            console.log(reviews);

            $("title").text("ACME " + pageName);
            $("#prodtitle").html(name);
            $("#product-name").text(name);
            $("#pimage").css("background-image", "url(" + path + ")");
            var output = '';
            output += "<li>" + description + "</li> <br>";
            output += '<li><strong>Made by: </strong>' + manufacturer + '</li>' + '<br>';
            output += '<li><strong>Reviews: </strong>' + reviews + '/5 stars</li>';
            output += '<li><h2>Price: $' + price + '</h2></li>';
            $("#description").html(output);
            $("#description h2").css("color", "#de2226");
        }

    });
})