<?php

/**
 * Twitter API which searches for tweets including the hashtag "climatechange" and or "netzero" 
 * Filters out retweets, uses the UK's place id to get tweets in the UK and tweet_mode => extended
 * extends the tweets so the full text is displayed.
 * 
 * @author Graham Stoves - w19025672
 */

header('Content-type: application/json');

require './config.php';
require '../../vendor/autoload.php';

use Abraham\TwitterOAuth\TwitterOAuth;

try {
    $conn = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET);

    $content = $conn->get("/search/tweets", array("q" => "place:6416b8512febefc9 and(#climatechange OR #netzero) OR (#climatechange #netzero) -filter:retweets", "tweet_mode" => "extended", "count" => "100"));
    echo json_encode($content);
} catch (Exception $e) {
    echo $e;
}