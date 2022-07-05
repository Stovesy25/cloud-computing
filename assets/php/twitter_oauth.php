<?php

/**
 * Handles when the user logs in using Twitter and authenticates the application
 * 
 * @author Graham Stoves - w19025672
 */

require './config.php';
require '../../vendor/autoload.php';

use Abraham\TwitterOAuth\TwitterOAuth;

//Starts the session
session_start();

//Creates an instance of the TwitterOAuth class
$conn = new TwitterOAuth(
    CONSUMER_KEY,
    CONSUMER_SECRET,
    ACCESS_TOKEN,
    ACCESS_SECRET
);

//Sets the API version to 2
$conn->setApiVersion(2);

//The temporary request token is used to obtain the access_token to give to the user to allow them to log in
try {
    $access_token = $conn->oauth(
        "oauth/access_token",
        [
            "oauth_token" => $_REQUEST['oauth_token'],
            "oauth_verifier" => $_REQUEST['oauth_verifier']
        ]
    );
} catch (Exception $e) {
    echo $e;
}

echo json_encode($access_token);