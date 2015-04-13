var twitter = require('twitter'),
config = require('../../config'),
streamHandler = require('./streamHandler');


// Create a new twitter instance
var twit = new twitter(config.twitter);


exports.streamTweets = function(io){

	// Set a stream listener for tweets matching tracking keywords
	twit.stream('statuses/filter',{ track: 'facebook'}, function(stream){
		streamHandler(stream,io);
	});
}