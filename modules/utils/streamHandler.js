var Tweet = require('../../models/Tweet');
var tweetService = require('../tweetHandlers/tweetService');
var twitterHandler = require('./twitterHandler');

module.exports = function(stream, io){

  // When tweets get sent our way ...
  stream.on('data', function(data) {

    // Construct a new tweet object
    var tweet = {
      twid: data['id'],
      active: false,
      author: data['user']['name'],
      avatar: data['user']['profile_image_url'],
      body: data['text'],
      date: data['created_at'],
      screenname: data['user']['screen_name']
    };

    // Save the url and tweet with count in db
    tweetService.saveTweet(tweet,function(err,result){
      
      //Emit event if there is a tweet with a url saved
      if(!err && result.length){
        console.log("cool",result);
        io.emit('url',{result:result});
      }else{
        console.log("no url");
      }
    });

  });

  stream.on('error',function(error){
    console.log('error',error);
    this.destroy();
    twitterHandler.streamTweets(io);
  })

};