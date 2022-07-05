<?php

/**
 * Handles when the user logs in using Twitter and authenticates the application
 * 
 * @author Graham Stoves - w19025672
 */

require './oauth_config.php';
require '../../vendor/autoload.php';

use Abraham\TwitterOAuth\TwitterOAuth;

session_start();

//Creates an instance of the TwitterOAuth class
$conn = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);

//Requests the authentication tokens and passes in the parameter to the oauth_callback 
try {
    $request_token = $conn->oauth(
        'oauth/request_token',
        array('oauth_callback' => OAUTH_CALLBACK)
    );

    //Saves the oauth token into the session
    $_SESSION['oauth_token'] = $request_token['oauth_token'];

    //Saves the oauth token secret into the session
    $_SESSION['oauth_token_secret'] =
        $request_token['oauth_token_secret'];

    //Generates the URL and redirects the user to the page
    $url = $conn->url('oauth/authorize', ['oauth_token'
    => $request_token['oauth_token']]);
    header('Location: ' . $url);
} catch (Exception $e) {
    echo "Error" . $e->getMessage();
}