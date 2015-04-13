var TweetUrl = require('./modules/tweetHandlers/tweetService');

module.exports = {

  index: function(req, res) {
    // Call model method to get tweets in the db
    TweetUrl.getUrlsCount(function(err,urlsCount) {

      console.log("urlsCount",urlsCount);
      
      // Render our 'home' template
      res.render('home', {
        urlsCount: JSON.stringify(urlsCount) // Pass current state to client side
      });

    });
  },

  urlInfo: function(req, res) {
    // Fetch count for all the urls for current day - to see is who is leading the board
    TweetUrl.getUrlsCount(function(err,urlsCount) {
        res.send(urlsCount);
    });
  },

  urlTweets : function(req,res){

    //url is part of the params
    var url = req.params.url;

    // Fetch tweets for a url
    TweetUrl.getUrlTweets(url,function(err,tweets) {
        res.send(tweets);
    });

  }


}