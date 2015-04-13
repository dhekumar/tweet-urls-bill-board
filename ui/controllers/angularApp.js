var angularApp = angular.module('angularApp', ['ui.router','btford.socket-io']);


angularApp.config(['$stateProvider', function ($stateProvider) {

	// console.log('--angularApp COnfig--');
  	$stateProvider
  		.state(angularAppState)
  }]);

angularApp.controller( 'angularAppController', [ '$scope','$http','$filter','$state',function($scope,http,$filter,$state){
	console.log("your are in angular App controller");
	$state.transitionTo('angularAppMain');
}]);


var angularAppState = {
	name : 'angularAppMain'	
	,url : '/angularAppMain'
	// ,template:'<div>Hello</div>'
	,templateUrl :'views/angularApp.html'
	,controller: ['$scope','socket','urlsHandler','urlsRestCalls',function($scope,socket,urlsHandler,urlsRestCalls){
		console.log("your are in angular App");

		$scope.urlsCount = [];

		
		//Listening to event url emitted by backend server when the tweet with url comes
		socket.on('url',function(event){
			
			// console.log("event",event);
			
			for(var i=0;i<event.result.length;i++){

				//Event emitted contains url
				var url = event.result[i].u;
				var tweet = event.result[i].tweet; 

				//get the index of the url in urlsCount to increment by 1
				var index = urlsHandler.getUrlIndex(url);

				//if index does not exist - push to urlsCount
				if(isNaN(index)){
					$scope.urlsCount.push({n:1,u:url})
					urlsHandler.setUrlIndex(url,$scope.urlsCount.length-1);
				}
				else{ 	

					//increment the count by 1
					$scope.urlsCount[index].n++;

				}
				if($scope.url && $scope.url == url){
					$scope.tweets[tweet.twid] = tweet;
					$scope.pagination.currentPage = 0;
					evaluateMaxPages($scope.tweets);
				}
			}
			
		})


		//Server AJAX Call to fetch the urls counts
		urlsRestCalls.getUrlsInfo(function(err,result){
			if(!err)
				$scope.urlsCount = result;	
		});

		$scope.getUrlTweets = function(url){
			urlsRestCalls.getUrlTweets(url,function(err,tweets){
				if(!err){
					$scope.url = url;
					$scope.tweets = tweets;
					$scope.pagination.currentPage = 0;
					evaluateMaxPages(tweets);
				}
			})
		}
		

		//Pagination
		$scope.pagination = {
			currentPage : 0,
			pageSize : 15
		}
		
		//Evaluates total number of pages
		$scope.numberOfPages=function(){
	        return Math.ceil($scope.tweets.length/$scope.pageSize);
	    }

	    //Evaluates maximum number of pages for the pagination
	    var evaluateMaxPages = function (tweets){
    		var length = Object.keys(tweets).length;
    		$scope.pagination.maxCurrentPage = Math.ceil(length/$scope.pagination.pageSize - 1);
		}

		$scope.prevPage = function(){
	  		if($scope.pagination.currentPage>0)
	  			$scope.pagination.currentPage = $scope.pagination.currentPage - 1;
	  	}


	}]
}

