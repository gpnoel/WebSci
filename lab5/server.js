// libraries
var express = require('express');
var app = express();
var twitter = require('twitter');
var fs = require("fs");

// twitter variable
var client = new twitter({
  consumer_key: 'SXKLh9EtM4zV8pm4sfl49mB0I',
  consumer_secret: '7DmhPfeVO1Foe4l1qXh7UWhY0b41rUzsFzOxz8DfZGKWPJRf8s',
  access_token_key: '836797738222256128-ofPAe1NjwQcfYTvSC1Xxef7TuEz8SoR',
  access_token_secret: 'b8b3gS5onCHMDNBmk5cYxX5PuSLJWPPryDO7mn80jn3cq'
});

var server = app.listen(3000, function () {
  console.log('Server listening on port 3000...');
})
var io = require('socket.io').listen(server);

// Express requests
// send homepage file
app.get('/', function(req, res){
  res.sendFile(__dirname + '/lab5.html');
});
// allows me to use local files in html page
app.use(express.static(__dirname));
// big chunk of the lab5
// when someone presses a button, express reads that request and starts to search tweets with the specified query
// and up to the specified number
app.use("/query", function(req, res){
  var num = 0;
  var all_tweets = [];
  res.writeHead(200, {"Content-Type": "text/html"});
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
        // write all the tweets to the file
        fs.writeFileSync("pierrg-tweets.json", JSON.stringify(all_tweets), {flag: 'w'});
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