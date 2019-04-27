$(document).ready(function () {
    var searchTerm = 'dogs';

    $.ajax(
        "https://www.reddit.com/subreddits/search.json",
        {
            data: { q: searchTerm },
            success: function (responseData) {
                if (responseData.data.children.length > 0) {
                    console.log('# of results: ' + responseData.data.children.length);
                    $.each(responseData.data.children, function (idx, searchResult) {
                        console.log("--- Title of Subreddit: " + searchResult.data.title);
                    });
                } else {
                    console.log("No subreddits match the search query!");
                }
            },
            error: function () {
                alert("Something didn't work!");
            }
        }
    )
});