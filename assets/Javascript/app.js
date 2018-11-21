// make a function that make a request to giphy
function makeAPICallToGiphy(queryItem) {
    var queryUrl = "https://api.giphy.com/v1/gifs/search";
    var apiKey = "yYDt1ePPYlkEs6RxWknbyssj8azDK2NH";
    var params = "?" + $.param({
        api_key: apiKey,
        q: queryItem,
        limit: 25,
        offset: 0,
        rating: "G",
        lang: "en"
    });

    var queryUrlWithParams = queryUrl + params;

    console.log("Our request url is " + queryUrlWithParams);

    // make a request to the giphy search API
    $.ajax({
        url: queryUrlWithParams,
        method: "GET"
    }).then(function (response) {
        var imagesArr = response.data;
        console.log(imagesArr);
        $("#gif-container").empty();
        // take all the fixed_height images from the response 
        // and display on the page
        for (var i = 0; i < imagesArr.length; i++) {
            var img = $("<img>");
            img.addClass("gif-image");
            img.attr("src", imagesArr[i].images.fixed_height_still.url);
            img.attr("data-still", imagesArr[i].images.fixed_height_still.url);
            img.attr("data-animate", imagesArr[i].images.fixed_height.url);
            img.attr("data-state", "still");
            $("#gif-container").append(img);
        }
    });
}

// when I click on one 
// of the gifs it will go from still to animate 
// and from animate to still
$(document).on("click", ".gif-image", function (e) {
    e.preventDefault();
    var state = $(this).attr("data-state");
    var animateUrl = $(this).attr("data-animate");
    var stillUrl = $(this).attr("data-still");
    if (state === "still") {
        // lets animate the img
        // switch the src attribute to the value of data-animate
        $(this).attr("src", animateUrl);
        // set the data-state value to "animate"
        $(this).attr("data-state", "animate");
    } else {
        // lets make it still
        // switch the src attribute to the value of data-still
        $(this).attr("src", stillUrl);
        // set the data-state value to "still"
        $(this).attr("data-state", "still");
    }
});

makeAPICallToGiphy("");

$(document).on("click", ".gif-button", function (e) {
    e.preventDefault();
    var btnValue = $(this).attr("data-name");
    makeAPICallToGiphy(btnValue);
});

$("#submit-form").on("click", function (e) {
    e.preventDefault();
    var userName = $("#user-name").val().trim();
    console.log(userName);
    $("#user-name-local").text(userName);

    // setting an item in localStorage setItem
    localStorage.setItem("username", userName);
});

// getting an item from localStorage with getItem
var localUserName = localStorage.getItem("username");
$("#user-name-local").text(localUserName);