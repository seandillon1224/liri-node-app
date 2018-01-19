require("dotenv").config();

var keys = require("./keys.js");
var request = require('request');
// console.log(keys)

var Twitter = require("twitter");
var Spotify = require("node-spotify-api")
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);




if (process.argv[2] == "my-tweets") {
    var params = {
        screen_name: 'seandillon1224'
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 6; i++) {
                console.log("Tweet Body: " + tweets[i].text)
                console.log("Created at :" + tweets[i].created_at + "\n")

            }

        }
    });
} else if (process.argv[2] == "spotify-this-song") {
    var songEntered = process.argv[3];
    spotify.search({
        type: 'track',
        query: songEntered
    }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            console.log("Artist: " + data.tracks.items[0].artists[0].name)
            console.log("Album: " + data.tracks.items[0].album.name)
            console.log("Track: " + data.tracks.items[0].name)
            console.log("Preview URL: " + data.tracks.items[0].preview_url)



        }

        // Do something with 'data' 
    });
} else if (process.argv[2] == "movie-this") {
    var movie = ""
    if (process.argv[3] !== undefined) {
        movie = process.argv[3];
    } else {
        movie = "Mr. Nobody";
    }
    request('http://www.omdbapi.com/?apikey=trilogy&t=' + movie, function(error, response, body) {
        if (error) {
            console.log("error: ", error);
        } else {
            // console.log(response)
            var responseLog = (JSON.parse(body));
            // console.log(responseLog)
            console.log("Title: " + responseLog.Title)
            console.log("Release Year: " + responseLog.Released)
            console.log("IMDB Rating: " + responseLog.imdbRating)
            console.log("Rotten Tomatoes: " + responseLog.Ratings[1].Value)
            console.log("Origin Country: " + responseLog.Country)
            console.log("Language: " + responseLog.Language)
            console.log("Plot: " + responseLog.Plot)
            console.log("Actors: " + responseLog.Actors)

        }




    });
} else if (process.argv[2] == "do-what-it-says") {
    fs.readFile("./random.txt", "utf8", function(error, data) {
        var dataSplit = data.split(',')
        var dataSlice = dataSplit[1].slice(1, 19)

        spotify.search({
            type: 'track',
            query: dataSlice
        }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            } else {
                console.log("Artist: " + data.tracks.items[0].artists[0].name)
                console.log("Album: " + data.tracks.items[0].album.name)
                console.log("Track: " + data.tracks.items[0].name)
                console.log("Preview URL: " + data.tracks.items[0].preview_url)

            }
        });


    });

}