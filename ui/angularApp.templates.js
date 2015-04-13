angular.module('angularApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/angularApp.html',
    "<div><div>Tags Editor</div><div><div ng-repeat=\"tag in tags\" style=\"{  display: inline-block;margin: 20px;  background: rgb(234, 205, 205);  padding: 40px;  width: 60px;}\"><span ng-show=!tag.edit>{{tag.name}}</span> <span ng-show=!tag.edit ng-click=enableEdit(tag.name,$index)>Edit</span><div ng-show=tag.edit><input style=\"{  width: 60px}\" focus-me=tag.focus ng-model=tag.name ng-enter=editTag(tag.name,$index)></div></div><div ng-show=addTagModel><input focus-me=focus ng-init=\"tagModel='';\" ng-model=tagModel ng-enter=addTag(tagModel)></div><span><a ng-click=\"focus=true;showAddTag()\">Add tag</a></span></div></div>"
  );

}]);
