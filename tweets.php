<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Includes style sheet and scripts -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="http://maps.googleapis.com/maps/api/js?key=*">
    </script>
    <script src="assets/js/getMap.js" defer></script>
    <script src="assets/js/getWeather.js" defer></script>
    <script src="assets/js/getTweets.js" defer></script>
    <script src="assets/js/sendTweet.js" defer></script>
    <title>Sustainable North East</title>
</head>

<body>
    <!-- Header and navbar -->
    <header>
        <h1>Sustainable North East</h1>
        <nav id="nav" class="nav">
            <ul>
                <li><a href="http://20.115.25.179/index.php">Home</a></li>
                <li><a href="http://20.115.25.179/about.php">About</a></li>
                <li><a href="http://20.115.25.179/assets/php/logout.php">Log Out</a></li>
            </ul>
        </nav>
    </header>

    <!-- Weather section -->
    <div class="current-weather">
        <h2 class="sub-header">Current Weather</h2>
        <div>
            <a class="weather-text" id="loc"></a>
            <a class="weather-text" id="temp"></a>
            <a class="weather-text" id="clouds"></a>
            <a class="weather-text" id="humidity"></a>
            <a class="weather-text" id="windspeed"></a>
        </div>
    </div>

    <!-- Twitter feed section -->
    <div class="twitter-feed">
        <h2 class="twitter-header">Latest Climate Tweets</h2>
        <div class="twitter-text">
            <ul id="tweet-list">
            </ul>
        </div>
        <div class="twitter-bottom">
            <form id="tweet-form">
                <textarea id="tweet-box" name="tweet" placeholder="Write your tweet here" maxlength="280"></textarea>
                <input type="submit" value="Tweet" id="send-tweet" />
                <p id="char"></p>
                <h2 id="posted" style="display: none">Tweet posted!</h2>
            </form>
        </div>
    </div>

    <!-- Map section -->
    <section class="map">
        <aside id="map"></aside>
    </section>

    <!-- Directions section -->
    <section class="directions">
        <button id="reset-directions" type="button">Reset Direction Routes</button>
        <h2 id="directions-header"></h2>
        <div id="distance-info"></div>
        <div id="directions-info"></div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <h3>Sustainable North East</h3>
        <h4>Graham Stoves - w19025672</h4>
    </footer>
</body>

</html>