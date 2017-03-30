// libraries
var express = require('express');
var app = express();
var twitter = require('twitter');
var fs = require("fs");
var json2csv = require('json2csv');

// twitter variable
var client = new twitter({
  consumer_key: 'SXKLh9EtM4zV8pm4sfl49mB0I',
  consumer_secret: '7DmhPfeVO1Foe4l1qXh7UWhY0b41rUzsFzOxz8DfZGKWPJRf8s',
  access_token_key: '836797738222256128-ofPAe1NjwQcfYTvSC1Xxef7TuEz8SoR',
  access_token_secret: 'b8b3gS5onCHMDNBmk5cYxX5PuSLJWPPryDO7mn80jn3cq'
});
var tweetsList = {};

var server = app.listen(3000, function () {
  console.log('Server listening on port 3000...');
})
var io = require('socket.io').listen(server);

// Express requests
// send homepage file
app.get('/', function(req, res){
  res.sendFile(__dirname + '/lab6.html');
});
// allows me to use local files in html page
app.use(express.static(__dirname));
// when someone presses a button, express reads that request and starts to search tweets with the specified query
// and up to the specified number
app.use("/query", function(req, res){
  var num = 0;
  var all_tweets = [];
  res.writeHead(200, {"Content-Type": "text/html"});
  console.log(`client id is ${req.query.id}`);
  var stream_filter = {track: req.query.query};
  if (!req.query.query){
    stream_filter = {locations: "-73.68,42.72,-73.67,42.73"};
  }
  client.stream('statuses/filter', stream_filter,  function(stream) {
    // upon receiving data, emit it to the socket and push to the list of tweets
    stream.on('data', function(tweet) {
      if (++num > Number(req.query.number)){
        // destroy the stream and end the response when we've reached the number of tweets
        stream.destroy();
        res.end();
        console.log("rejecting more tweets");
        tweetsList[req.query.id] = all_tweets;
        return;
      }
      res.write(tweet.text);
      all_tweets.push(tweet);
      io.emit('tweet', { text: tweet.text });
    });
    // write all the tweets to the json file
    stream.on('error', function(error) {
      console.log(error);
    });
  });
});

app.use("/export", function(req, res){
  var tweets = tweetsList[req.query.id];
  var filename = req.query.type === "JSON" ? "pierrg-tweets.json" : "pierrg-tweets.csv";
  fs.access(filename, (err) => {
    if (!err) {
      res.send("The file already existed. Overwriting file.");
    } else {
      res.send("The file did not exist.");
    }
    if(req.query.type === "JSON") {
      fs.writeFile(filename, JSON.stringify(tweets), {flag: 'w'});
    } else {
      var fields = ["created_at","id","text","user_id","user_name","user_screen_name","user_location",
        "user_followers_count","user_friends_count","user_created_at","user_time_zone","user_profile_background_color",
        "user_profile_image_url","geo","coordinates","place"];
      var csv = json2csv({data: tweets, fields: fields});
      fs.writeFile(filename, csv, {flag: 'w'});
    }
  });
});