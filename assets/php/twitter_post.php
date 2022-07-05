<?php

/**
 * Handles when the user posts to Twitter
 * 
 * @author Graham Stoves - w19025672
 */

require './oauth_config.php';
require '../../vendor/autoload.php';

use Abraham\TwitterOAuth\TwitterOAuth;

//Creates an instance of the TwitterOAuth class using the oauth_token and token_secret 
$conn = new TwitterOauth(CONSUMER_KEY, CONSUMER_SECRET, $_REQUEST['oauth_token'], $_REQUEST['oauth_token_secret']);

//Gets the tweet from the textarea and uploads it to Twitter
$tweet_string = $_REQUEST['tweet'];

try {
    $status = $conn->post("statuses/update", [
        "status" => $tweet_string
    ]);
} catch (Exception $e) {
    echo $e;
}