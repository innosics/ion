/*
Author: Rosy Yang <rosy.yang@gmail.com> | MIT Licensed
*/
(function(angular) {
	'use strict';

	angular.module('ionModule', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
    
	.value('apiProvider', '') // empty for local host, or production "http://api-innosics.rhcloud.com"
    
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/list/:status',{ templateUrl: 'modules/task/templates/ion.template.task.list.html', controller: "ionTaskListCtrl"})
		.when('/create',      { templateUrl: 'modules/task/templates/ion.template.task.create.html', controller: "ionTaskCtrl"})

		.otherwise({ redirectTo: '/' });
	})
	.factory('apiUrlService', ['$rootScope', function($rootScope){
		var service = {
			getURL: getURL
		};

		return service;

		function getURL(key, api, space){
			var apiUrls = {
				OBJ_DEF_FIND: api + '/data/list/' + space + '/odef',
				OBJ_DEF_SAVE: api + '/data/save/' + space + '/odef',
				DEF_FETCH: api + '/data/fetch/' + space + '/def',
				DEF_FIND: api + '/data/list/' + space + '/def',
				DEF_LIST: api + '/data/list/' + space + '/def',
				DEF_SAVE: api + '/data/save/' + space + '/def',

				OBJ_FETCH: api + '/data/fetch/' + space + '/obj',
				OBJ_LIST: api + '/data/list/' + space + '/obj',
				OBJ_SAVE: api + '/data/save/' + space + '/obj',

				SPACE_LIST: api + '/data/list/api/spaces',
				SPACE_CHANGE: api + '/account/space/set',

				MENU_FIND: api + '/data/list/' + space + '/def',
				MENU_SAVE: api + '/data/save/' + space + '/def'
			};
			var url = apiUrls[key];
			
			return url;
		}
	}])
	;

})(window.angular);
