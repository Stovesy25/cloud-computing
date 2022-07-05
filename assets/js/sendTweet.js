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
 * Script to send a tweet to Twitter by verifying the tokens after a user logs in using Twitter
 * 
 * @author Graham Stoves - w19025672
 */

//Total number of characters allowed in a tweet
const total_chars = 280;

//When a user logs in this is loaded straightaway
$(document).ready(() => {
    getClientToken()
})

//getParam const allows the tokens to be obtained from URL
const getParam = name => {
    let params = new URLSearchParams(window.location.search)
    return params.get(name)
}

//Allows a string to be encoded to pass to an endpoint
const encode = string => encodeURIComponent(string)

//Gets the users token and verifier from the URL and puts them into local storage
const getClientToken = async () => {
    const endpoint = "/assets/php/twitter_oauth.php"
    const token = "?oauth_token=" + getParam("oauth_token")
    const verify = "&oauth_verifier=" + getParam("oauth_verifier")
    await $.getJSON(endpoint + token + verify, (res) => {
        localStorage.setItem("oauth_token", res.oauth_token);
        localStorage.setItem("oauth_token_secret", res.oauth_token_secret);
    });
}

//Passes the tokens and tweet content through to the twitter post endpoint
const sendTweet = tweetString => {
    const endpoint = "/assets/php/twitter_post.php"
    const tweet = "?tweet=" + encode(tweetString)
    const token = "&oauth_token=" + localStorage.getItem("oauth_token")
    const verify = "&oauth_token_secret=" + localStorage.getItem("oauth_token_secret")
    const url = endpoint + tweet + token + verify

    $.getJSON(url, () => { })

    //Displays some text for 3 seconds once tweet is posted
    setTimeout(hideElement, 3000)
    function hideElement() {
        $("#posted").hide()
    }
}

//Handles send-tweet button click
$("#send-tweet").click(event => {
    event.preventDefault()
    sendTweet($("#tweet-box").val())
    $("#tweet-box").val("")
    $("#posted").show()
    $("#char").text(total_chars)
    $("#char").hide()
})

//Handles textarea input 
$("#tweet-box").on("input", () => {
    $("#char").show()
    let chars = $("#tweet-box").val()
    let charsLeft = total_chars - chars.length
    //Countsdown characters
    $("#char").text(charsLeft + " characters left")

    //If characters less than 15, display the text in red
    if (charsLeft <= 15) {
        $("#char").css("color", "red")
        $("#char").css("fontSize", "25px");
    }
    else {
        $("#char").css("color", "white")
        $("#char").css("fontSize", "17px");
    }

    //If characters is equal 0, show user there is none left
    if (charsLeft == 0) {
        $("#char").text("No more characters left")
    }
})