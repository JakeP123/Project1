$(document).ready(function () {

    //object from reddit
    function reddit(request) {

        $.ajax({
            url: "https://mighty-brook-95893.herokuapp.com/cors",
            method:"POST",
            data: {
                method:"POST",
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
                        var link = "https://www.reddit.com" + response.data.children[i].data.permalink
                        console.log(response.data.children[i].data.permalink);
                        console.log(response.data.children[i].data.title);
                        console.log(link);

                        var wellSection = $("<div>");
                        wellSection.addClass("well");
                        wellSection.attr("id", "articleWell-" + i);
                        $("#reddit-holder").append(wellSection);

                        $("#articleWell-" + i).append("<h5>" + response.data.children[i].data.title + "</h5");
                        $("#articleWell-" + i).append("<a href= " + link + " >" + link + "</a>");

                    }



                    // var titleReddit = $("<h2>").text(response.data.children[1].data.title);
                    // var linkReddit = $("<a>").("href=","https://www.reddit.com" + response.data.children[1].data.permalink)


                    // $("#reddit-holder").empty();
                    // $("#reddit-holder").append(titleReddit, linkReddit);



                })
        })

    }
    // reddit();

    // search button 
    $("#searchBtn").on('click', function (event) {
        event.preventDefault();
        var searchTerm = $("#search").val().trim();
        // console.log(searchTerm);
        // var newUrl = "https://oauth.reddit.com/r/subreddit/search?q=" + searchTerm;
        // console.log(newUrl);
        reddit(searchTerm);
    })







});