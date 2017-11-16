$(document).ready(
    function() {
        var totalCharacters = 140;
        $("#postForm").keyup(function (event) {
            var inputText = event.target.value;
            $("#charRemaining").html(totalCharacters - inputText.length);
        });
    }
);

/**
 * When the page loads (or is refreshed) we request all
 comments from the server
 */
function getComments() {
    $.get("/getComments", function (data) {
        var posts = "";

        for (var i = 0; i < data.length; i++) {

            posts += "<div class='well'>" +
                data[i].comment + "</div>";
        }
        $("#feedPosts").html(posts);
    });
}

