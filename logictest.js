alert("TEST");
// SETUP VARIABLES
//==========================================================

var apiKey = "AIzaSyB1iL9inW_ZS71ILZyjrpM2w9vSbX0fL2s";
var queryTerm = "";
var queryURLBase = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" + apiKey;
var Finalsearch = "https://www.youtube.com/embed/";
var YouTubeSearch = "tutorial";


// FUNCTIONS
//==========================================================

$(document).ready(function() {



function runQuery(queryURL) {
    // AJAX Function
    $.ajax({ url: queryURL, method: "GET" })
        .done(function (YoutubeData) {

            for (var i = 0; i < 5; i++) {
                // console.log("====================================================");
                // console.log("VIDEO ID");
                // console.log(YoutubeData.items[i].id.videoId);
                // console.log("====================================================");
                // console.log("TITLE");
                // console.log(YoutubeData.items[i].snippet.title);
                // console.log("====================================================");
                // console.log("DESCRIPTION");
                // console.log(YoutubeData.items[i].snippet.description);
                // console.log("====================================================");
                // console.log("WORKING URL");
                // console.log(Finalsearch + YoutubeData.items[i].id.videoId);
                // console.log("====================================================");

                //Start Dumping to HTML Here
                var wellSection = $('<div>');
                wellSection.addClass("well");
                wellSection.attr('id', 'videoWell-' + i);
                $('#wellSection').append(wellSection);

                //Attach the content to the appropriate well
                $("#videoWell-" + i).append("<iframe src="+Finalsearch+YoutubeData.items[i].id.videoId+">" + "</iframe>");
                $("#videoWell-" + i).append("<h1>"+ YoutubeData.items[i].snippet.title +"</h1>");
                $("#videoWell-" + i).append("<h2>"+ YoutubeData.items[i].snippet.description +"</h2>");
            }

        })

    }

    //         function runQuery(queryURL) {
    //             // AJAX Function
    //             $.ajax({ url: queryURL, method: "GET" })
    //                 .done(function (YoutubeData) {
                        
    //                     for (var i = 1; i < 5; i++) {
    //                         // console.log("====================================================");
    //                         // console.log("VIDEO ID");
    //                         // console.log(YoutubeData.items[i].id.videoId);
    //                         // console.log("====================================================");
    //                         // console.log("TITLE");
    //                         // console.log(YoutubeData.items[i].snippet.title);
    //                         // console.log("====================================================");
    //                         // console.log("DESCRIPTION");
    //                         // console.log(YoutubeData.items[i].snippet.description);
    //                         // console.log("====================================================");
    //                         // console.log("WORKING URL");
    //                         // console.log(Finalsearch + YoutubeData.items[i].id.videoId);
    //                         // console.log("====================================================");
            
    //                         // Start Dumping to HTML Here
    //                         var firstVid = $('<div>');
    //                         firstVid.addClass("carousel-item active");
    //                         firstVid.attr('data-interval', '10000')
    //                         firstVid.attr('id', 'firstSlider')
    //                         var carouselVid = $('<div>');
    //                         carouselVid.addClass("carousel-item");
    //                         carouselVid.attr('data-interval', '2000');
    //                         carouselVid.attr('id', 'carouselSlider' + i);
                    
                            
    //                         $('#wellSection').append('.carousel slide')
    //                         $('.carousel-inner').prepend(carouselVid);
    //                         $('.carousel-inner').append(firstVid);

    //                         // Attach the content to the appropriate well
    //                         // $(".carousel-inner").append($("#carouselSlider"));
    //                         $("#carouselSlider" + i).append("<iframe src="+Finalsearch+YoutubeData.items[i].id.videoId+">" + "</iframe>");
    //                         $("#carouselSlider" + i).append("<h1>"+ YoutubeData.items[i].snippet.title +"</h1>");
    //                         $("#carouselSlider" + i).append("<h4>"+ YoutubeData.items[i].snippet.description +"</h4>");

    //                     }
                 

    //                         //First Video in Carousel with "active" asset
    //                         $("#firstSlider").append("<iframe src="+Finalsearch+YoutubeData.items[0].id.videoId+">" + "</iframe>");
    //                         $("#firstSlider").append("<h1>"+ YoutubeData.items[0].snippet.title +"</h1>");
    //                         $("#firstSlider").append("<h4>"+ YoutubeData.items[0].snippet.description +"</h4>");
                       

    //     })

    // }


    // MAIN PROCESSES
    //==========================================================

    $('#searchBtn').on('click', function (event) {
        $('.panel-body').empty();
        event.preventDefault();
      

        // Get search term
        var queryTerm = $('#search-input').val().trim();
        console.log(queryTerm);

        // Add in the Search Term
        var newURL = queryURLBase + "&q=" + encodeURIComponent(queryTerm) + "+" + YouTubeSearch;
        console.log(newURL);

        //Send the AJAX call the newly assembled URL

        runQuery(newURL);

        return false;
        
       
    })

})

// 1. Retrieve user inputs and convert to variables
// 2. Use variable to run an AJAX call to YouTube
// 3. Break down the YouTube API useable fields
// 4. Dynamically generate html content
// 5. Dealing with "edge cases" -- buds or situations that are not intuitive