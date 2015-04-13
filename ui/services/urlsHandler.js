angularApp.factory('urlsHandler', function () {
  
  var urlsHandler = {};
  var indexMap = {

  }

  //Service method exposed to maps urls to index
  urlsHandler.mapUrlsIndex = function(data){
  	for(var i=0;i<data.length;i++){
  		indexMap[data[i].u] = i;
  	}
  }

  //get url Index
  urlsHandler.getUrlIndex = function(url){
  	return indexMap[url]?indexMap[url]:NaN;
  }

  // Map single url index 
  urlsHandler.setUrlIndex = function(url,index){
    indexMap[url] = index;
  }

  //return Service instance - singleton 
  return urlsHandler;

})