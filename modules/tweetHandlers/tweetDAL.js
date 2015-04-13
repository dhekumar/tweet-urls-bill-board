var TweetModel = require('../../models/TweetUrl');

exports.addTweet = function(timeBucket,url,tweet,callback){

	// Mongo Query
	var query = { "t" : timeBucket , "u" : url }

	//Mongo Update
	var update = {
		$set : {  }
		,$inc : { n : 1}
	}

	var key = 'tw.'+tweet.twid;
	update['$set'][key] = tweet;

	//Mongo Option - creates the tweets if not there
	var options = {upsert:true};

	// console.log("query",query);
	// console.log("update",update);
	// console.log("tweet",tweet);
	TweetModel.update(query,update,options).exec(function(err,result){
		if(!err)
			callback(null,{u:url,tweet:tweet})
		else
			callback(err,null);
	}); 
}

exports.getUrlsCount = function(timeBucket,callback){

	// Mongo Query
	var query = { "t" : timeBucket }

	//Mongo Projection
	var projection = { "n" : 1 , "u" : 1 , "_id" : -1 , "t" :1 }

	TweetModel.find(query,projection).exec(callback); 

}

exports.getUrlTweets = function(timeBucket,url,callback){

	// Mongo Query
	var query = { "t" : timeBucket , "u" : url}

	//Mongo Projection
	var projection = { "tw" :1 }

	console.log("query",query);
	console.log("projection",projection);
	
	TweetModel.find(query,projection).exec(callback); 

}
