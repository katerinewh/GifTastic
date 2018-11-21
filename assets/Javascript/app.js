// giphy function request
var giphy=[];
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

    //giphy search 
    $.ajax({
        url: queryUrlWithParams,
        method: "GET"
    }).then(function (response) {
        var imagesArr = response.data;
        console.log(imagesArr);
        $("#gif-container").empty();
    //    adding attributes for the pause/animate
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
    // giphy = $(this).attr("data-image");
}

// pause & animate functions
$(document).on("click", ".gif-image", function (e) {
    e.preventDefault();
    var state = $(this).attr("data-state");
    var animateUrl = $(this).attr("data-animate");
    var stillUrl = $(this).attr("data-still");
    if (state === "still") {
        // animates image
        $(this).attr("src", animateUrl);
        // set the data-state value to "animate"
        $(this).attr("data-state", "animate");

    } else {
        // makes image still
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

});
// form input...adding a button
$("#add-giphy").on("click", function (event) {
    event.preventDefault()
    var inputValue = $("#giphy-input").val();
    console.log(inputValue);
    giphy.push(inputValue);
    var button= document.createElement("button");
      
})
//  clicking on an existing button
$(document).on("click", ".giphy", function () {
    // $("button").on("click", function () {
    var inputValue = $(this).text();
    getGiphy(inputValue);
});
function renderButton(){

};