$(document).ready(function () {
    // SETUP VARIABLES
    var apiKey = "AIzaSyB1iL9inW_ZS71ILZyjrpM2w9vSbX0fL2s";
    var queryURLBase = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" + apiKey;
    var Finalsearch = "https://www.youtube.com/embed/";
    var YouTubeSearch = "tutorial";

    //object from youtube
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

                    // Start Dumping to HTML Here
                    var wellSection = $('<div>');
                    wellSection.addClass("well");
                    wellSection.attr('id', 'videoWell-' + i);
                    $('#wellSection').append(wellSection);

                    //Attach the content to the appropriate well
                    $("#videoWell-" + i).append("<h3>" + YoutubeData.items[i].snippet.title + "</h3>");
                    $("#videoWell-" + i).append("<iframe src=" + Finalsearch + YoutubeData.items[i].id.videoId + ">" + "</iframe>");
                    $("#videoWell-" + i).attr( 'hieght','1000px' );
                    //Video Description
                    // $("#videoWell-" + i).append("<h5>"+ YoutubeData.items[i].snippet.description +"</h5>");
                }

            })

    }
    //object from reddit
    function reddit(request) {

        $.ajax({
            url: "https://mighty-brook-95893.herokuapp.com/cors",
            method: "POST",
            data: {
                method: "POST",
                url: "https://oq488FZ4f3dkqg:2ClpQsQfmILsjhw_KIsm37Wr4Yo@www.reddit.com/api/v1/access_token?grant_type=client_credentials",
                key: "efd92cf6cc5e7649916c4e73939e6281"
            },
        }).then(function (response) {
            $.ajax({
                type: "GET",
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", "bearer " + response.access_token);
                },
                url: "https://oauth.reddit.com/r/subreddit/search?q=" + request,
            })
                .then(function (response) {
                    $("#reddit-holder").empty();
                    for (var i = 0; i < 5; i++) {
                        var link = "https://www.reddit.com" + response.data.children[i].data.permalink + "tutorial";
                        // console.log(response.data.children[i].data.permalink);
                        // console.log(response.data.children[i].data.title);
                        // console.log(link);

                        // Start Dumping to HTML Here
                        var wellSection = $("<div>");
                        wellSection.addClass("well");
                        wellSection.attr("id", "articleWell-" + i);
                        $("#reddit-holder").append(wellSection);
                        $("#articleWell-" + i).append("<h3>" + response.data.children[i].data.title + "</h3>");
                        $("#articleWell-" + i).html("<a href= " + link + " >" + response.data.children[i].data.title + "</a>");
                        $("a").attr("target", "_blank");



                    }
                    // var titleReddit = $("<h2>").text(response.data.children[1].data.title);
                    // var linkReddit = $("<a>").("href=","https://www.reddit.com" + response.data.children[1].data.permalink)

                    // $("#reddit-holder").empty();
                    // $("#reddit-holder").append(titleReddit, linkReddit);



                })
        })

    }
    // function test() {
    //     var access_token = ' odAkDHat8MW-Tw7llxWOZW4UsLy2luuvrAzByMpO6B4rlRMcU296KQvzMrV9PPi2i61ukpuZ8NBHA7y5elvCNF2h8zjWrBUuMlv0Z7CyDnaRgRMbbYuC0wpWNZXAXHYx';
    //     jQuery.ajax({
    //         url: "https://api.yelp.com/v3/businesses/search?term=massage&Client=-88nLvzaEro38uwZu5fNIg&location=07304",
    //         type: 'POST',
    //         data: { content: 'testing testing' },
    //         beforeSend: function (xhr) {
    //             xhr.setRequestHeader('Authorization', 'BEARER ' + access_token);
    //         },
    //         success: function (response) {
    //             console.log(response)
    //         }
    //     });
    // }
    // test();


    //object from yelp
    function yelp() {
        $.ajax({
            url: "https://api.yelp.com/v3/businesses/search?term=massage&Client=-88nLvzaEro38uwZu5fNIg&location=07304",
            type: "POST",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "bearer odAkDHat8MW-Tw7llxWOZW4UsLy2luuvrAzByMpO6B4rlRMcU296KQvzMrV9PPi2i61ukpuZ8NBHA7y5elvCNF2h8zjWrBUuMlv0Z7CyDnaRgRMbbYuC0wpWNZXAXHYx");
            },

        })
            .then(function (response) {
                // $("#yelp-holder").empty();
                // for (var f = 0; f < 5; f++) {
                console.log(response);
                // }
            })
    }

    yelp();

    //local storage
    var list = JSON.parse(localStorage.getItem("searchTermList"));
    if (!Array.isArray(list)) {
        list = [];
    }
    function putOnPage() {
        $("#search-history").empty();
        var insideList = JSON.parse(localStorage.getItem("searchTermList"));
        if (!Array.isArray(insideList)) {
            insideList = [];
        }
        for (var k = 0; k < insideList.length; k++) {
            var p = $("<p>").text(insideList[k]);
            var b = $("<button class='delete'>").text("x").attr("data-index", k);
            b.addClass("delete-button");
            p.prepend(b);
            $("#search-history").prepend(p);
        }
    }
    putOnPage();

    $(document).on("click", "button.delete", function() {
        var  searchTermList = JSON.parse(localStorage.getItem("searchTermList"));
        var currentIndex = $(this).attr("data-index");
        // Deletes the item marked for deletion
        searchTermList.splice(currentIndex, 1);
        list = searchTermList;
        localStorage.setItem("searchTermList", JSON.stringify(searchTermList));
        putOnPage();
      });


    // search button 
    $("#searchBtn").on('click', function (event) {
        $('.panel-body').empty();
        event.preventDefault();
        //modal pops up in 4 secs
        // setTimeout(modalPopUp, 4000);

        // Get search term (youtube)
        var queryTerm = $('#search').val().trim();
        // console.log(queryTerm);

        // Add in the Search Term
        var newURL = queryURLBase + "&q=" + encodeURIComponent(queryTerm) + "+" + YouTubeSearch;
        // console.log(newURL);

        //Send the AJAX call the newly assembled URL

        runQuery(newURL);

        //Get search term (reddit)
        var searchTerm = $("#search").val().trim();
        // console.log(searchTerm);
        // var newUrl = "https://oauth.reddit.com/r/subreddit/search?q=" + searchTerm;
        // console.log(newUrl);
        reddit(searchTerm);

        //Get search term (yelp)  
        // var yelpTerm = $("#search").val().trim();
        // yelp(yelpTerm)


//push searching term into array list (for local storage)
        list.push(searchTerm);
        localStorage.setItem("searchTermList", JSON.stringify(list));
        putOnPage();
        return false;
    })




    //functon to call modal 
    function modalPopUp() {
        $("#myModal").modal();
    }





});