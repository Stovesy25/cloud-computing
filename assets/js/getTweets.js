/*********************************************
******************************************
* Title: JQuery
* Author: OpenJS Foundation
* Date: 24th March 2022
* Code version: 3.6.0
* Availability: https://releases.jquery.com/
*
**********************************************
*****************************************/

/**
 * Twitter API call to display the timeline of tweets including the date and place they were posted
 * 
 * @author Graham Stoves - w19025672
 */

function relTime(time_value) {
    time_value = time_value.replace(/(\+[0-9]{4}\s)/ig, "")
    var parsed_date = Date.parse(time_value);
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
    var timeago = parseInt((relative_to.getTime() - parsed_date) / 1000);
    if (timeago < 60) return 'less than a minute ago';
    else if (timeago < 120) return 'about a minute ago';
    else if (timeago < (45 * 60)) return (parseInt(timeago / 60)).toString() + ' minutes ago';
    else if (timeago < (90 * 60)) return 'about an hour ago';
    else if (timeago < (24 * 60 * 60)) return 'about ' + (parseInt(timeago / 3600)).toString() + ' hours ago';
    else if (timeago < (48 * 60 * 60)) return '1 day ago';
    else return (parseInt(timeago / 86400)).toString() + ' days ago';
}

$(document).ready(function () {
    //Get request to the twitter api
    $.getJSON("assets/php/call_twitter_api.php", function (tweetdata) {
        $.each(tweetdata.statuses, function (key, objTweet) {
            if (objTweet.place) {
                $("#tweet-list").append("<li class='tweet-item'>" + objTweet.full_text + " – " + relTime(objTweet.created_at) + " (Tweeted from " + objTweet.place.name + ")" + "</li>");
            } else {
                $("#tweet-list").append("<li class='tweet-item'>" + objTweet.full_text + " – " + relTime(objTweet.created_at) + "</li>");
            }
        });
    });
})