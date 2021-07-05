//URL pull for user data "change car oil https://www.googleapis.com/youtube/v3/videos?part=snippet&videoCategoryId=change+car+oil&key={YOUR_API_KEY}
//Example with API //URL pull for user data "change car oil https://www.googleapis.com/youtube/v3/videos?part=snippet&videoCategoryId=change+car+oil&key=AIzaSyB1iL9inW_ZS71ILZyjrpM2w9vSbX0fL2s
// URL template https://www.googleapis.com/youtube/v3/videos?part=snippet&videoCategoryId=[USER INPUT]={YOUR_API_KEY}

//API KEY AIzaSyB1iL9inW_ZS71ILZyjrpM2w9vSbX0fL2s

// sample ajax call GET https://www.youtube.com/search?part=snippet&topicId=/m/05z1_&type=video&key=AIzaSyB1iL9inW_ZS71ILZyjrpM2w9vSbX0fL2s



            //Will need to call video ID and paste into this URL         https://www.youtube.com/results?search_query=+"videoId"





// SETUP VARIABLES
//==========================================================

var apiKey =  "AIzaSyB1iL9inW_ZS71ILZyjrpM2w9vSbX0fL2s";
// var numVideos= 6;
var queryTerm = "";
var queryURLBase = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=plumbing&key=AIzaSyB1iL9inW_ZS71ILZyjrpM2w9vSbX0fL2s";
var Finalsearch = "https://www.youtube.com/results?search_query=";
var YouTubeSearch = "tutorial";
var i = 0;
// FUNCTIONS
//==========================================================

for (i=0; i < 6; i++) {
function runQuery(numVideos, queryURL) {
    // AJAX Function
    $.ajax({url: queryURLBase, method: "GET"})
    .done(function(YoutubeData) {
        console.log(YoutubeData);
        var video = YoutubeData.items[0].id.videoId

    // checking info
        console.log(video)
        console.log(Finalsearch+video)
        console.log(queryURL)
        $('#video-title').text(YoutubeData.items[0].snippet.title)
        $('#video-url').html(queryURL)

    })


}
}
// MAIN PROCESSES
//==========================================================

$('#searchBtn').on('click', function(event) {
    event.preventDefault();

    var queryTerm = $('#search').val().trim();
    console.log(queryTerm)
    runQuery(3, Finalsearch+queryTerm);
    console.log("lookingforthisclick")
    return false;
})

// 1. Retrieve user inputs and convert to variables
// 2. Use variable to run an AJAX call to YouTube
// 3. Break down the YouTube API useable fields
// 4. Dynamically generate html content
// 5. Dealing with "edge cases" -- buds or situations that are not intuitive

