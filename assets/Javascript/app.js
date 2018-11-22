// giphy function request
var giphy = [];
function makeAPICallToGiphy(queryItem) {
    var queryUrl = "https://api.giphy.com/v1/gifs/search";
    var apiKey = "yYDt1ePPYlkEs6RxWknbyssj8azDK2NH";
    var params = "?" + $.param({
        api_key: apiKey,
        q: queryItem,
        limit: 15,
        offset: 0,
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
            //create a div
            var gifDiv = $("<div class='gif-div'>");
            
            //create a p tag and give it the rating text
            var pRating = $("<p>");
            pRating.text("Rating:" + imagesArr[i].rating);
            //create image
            var img = $("<img>");
            img.addClass("gif-image");
            img.attr("src", imagesArr[i].images.fixed_height_still.url);
            img.attr("data-still", imagesArr[i].images.fixed_height_still.url);
            img.attr("data-animate", imagesArr[i].images.fixed_height.url);
            img.attr("data-state", "still");

            //append p tag to the gifDiv we created
            gifDiv.append(pRating);
            //append the image to the gifDiv we created
            gifDiv.append(img);
            //append the dive we created to gif container
            $("#gif-container").append(gifDiv);
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
    // console.log(btnValue)
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
    //inputValue === "dog"
    console.log(inputValue);
    giphy.push(inputValue);
    // console.log(giphy) =>  ["dog"]

    renderButton()

})
//  clicking on an existing button
$(document).on("click", ".giphy", function () {
    // $("button").on("click", function () {
    var inputValue = $(this).text();
    getGiphy(inputValue);
});
function renderButton() {
    $(".custom-button").empty()
    //iterate over the array and create buttons
    for (var i = 0; i < giphy.length; i++) {

        var button = $("<button class='gif-button'>")
        button.attr("data-name", giphy[i])
        button.text(giphy[i])
        // append to html
        $(".custom-button").append(button)
    }
};