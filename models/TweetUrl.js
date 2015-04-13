var mongoose = require('mongoose');

// Create a new schema for our tweet data
var schema = new mongoose.Schema({
    t       : Number      //time bucket, you can easily shorten it going forward
  , n       : Number      //Number Tweets for this url
  , u       : String      //Url
  , tw      :  Object           // Tweets key value pair - key being twitter id
});


//Tweet Schema
var tweet = {
    twid       : String
  , active     : Boolean
  , author     : String
  , avatar     : String
  , body       : String
  , date       : Date
  , screenname : String
}

// Return a TweetUrl model based upon the defined schema
module.exports = Tweet = mongoose.model('TweetUrl', schema);