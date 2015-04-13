angularApp.factory('urlsRestCalls', ['urlsHandler','$http',function (urlsHandler,$http) {
  
  var urlsRestCalls = {};

  //Service method getUrls counts as the streaming is runing in backend
  urlsRestCalls.getUrlsInfo = function(callback){

  	 $http.get('/urlInfo').success(function(data, status, headers, config) {
        
        // this callback will be called asynchronously
        // when the response is available
        urlsHandler.mapUrlsIndex(data);
        callback(null,data);
    })
    .error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        callback("error",null);
    });
  }


  //Getting tweets for a specific url from database
  urlsRestCalls.getUrlTweets = function(url,callback){

     $http.get('/url/'+url+'/tweets').success(function(data, status, headers, config) {
        
        // this callback will be called asynchronously
        // when the response is available
        callback(null,data);
    })
    .error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        callback("error",null);
    });
  }

  

  //return Service instance - singleton 
  return urlsRestCalls;

}])