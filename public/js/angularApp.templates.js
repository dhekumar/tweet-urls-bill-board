angular.module('angularApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/angularApp.html',
    "<div class=container><div class=\"panel panel-default\"><div class=panel-heading>Tweets Url Count Today - Leader Board</div><div class=panel-body><div ng-repeat=\"url in urlsCount |orderBy:'-n'\"><div class=urlName>{{url.u}}</div><div class=urlCount ng-click=getUrlTweets(url.u)>{{url.n}}</div></div></div></div><div class=\"panel panel-default\" ng-if=tweets><div class=panel-heading>Tweets For Url {{url}} - {{pagination.currentPage + 1 }} of {{pagination.maxCurrentPage + 1}}<div><div class=next ng-class=\"{disabled :pagination.currentPage >= pagination.maxCurrentPage}\" ng-click=\"pagination.currentPage=pagination.currentPage+1\">NEXT</div><div class=prev ng-class=\"{disabled:pagination.currentPage == 0}\" ng-click=prevPage()>PREV</div></div></div><div class=panel-body><div ng-repeat=\"tweet in tweets | objectToArray| orderBy : '-twid' | startFrom:pagination.currentPage*pagination.pageSize | limitTo:pagination.pageSize\"><li class=tweet ng-class=\"{'active':tweet.active}\"><img ng-src={{tweet.avatar}} class=avatar><blockquote><cite><a ng-href=\"{{'http://www.twitter.com/' + tweet.screenname}}\">{{tweet.author}}</a> <span class=screen-name>@{{tweet.screenname}}</span></cite> <span class=content>{{tweet.body}}</span></blockquote></li></div></div></div></div>"
  );

}]);
