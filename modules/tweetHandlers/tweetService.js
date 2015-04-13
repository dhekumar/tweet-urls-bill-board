var async = require('async');
var TweetUrlDAL = require('./TweetDAL');
var fetchUrl = require('../utils/fetchTweetUrl');
var evaluateTimeBucket = require('../utils/evaluateTimeBucket');

exports.saveTweet = function(tweet,callback){

	//Urls in the tweet body
	var urls = fetchUrl(tweet.body);

	//Asynchrnous calls for each urls for the tweet
    async.map(urls,save.bind({tweet:tweet}),callback);
}

exports.getUrlsCount = function(callback){
	var timeBucket = evaluateTimeBucket();
	TweetUrlDAL.getUrlsCount(timeBucket,function(err,result){
        if(err)
          callback(err,null);
        else
          callback(null,result);
    });
}

exports.getUrlTweets = function(url,callback){
  var timeBucket = evaluateTimeBucket();
  TweetUrlDAL.getUrlTweets(timeBucket,url,function(err,result){
        if(err)
          callback(err,null);
        else{
          var tweets = result.length?result[0].tw:{};
          callback(null,tweets);
        }
    });
}


var save = function(url,callback){

	//Calculating the timebucket in which url is saved with the tweet
	var timeBucket = evaluateTimeBucket();
    
	TweetUrlDAL.addTweet(timeBucket,url,this.tweet,function(err,result){
        if(err)
          callback(err,null);
        else
          callback(null,result);
    });
}