/*
Author: Rosy Yang <rosy.yang@gmail.com> | MIT Licensed
*/
(function () {
    'use strict';

    angular
        .module('ionModule')
        .controller('layoutCtrl', layoutCtrl);

    layoutCtrl.$inject = ['$scope', '$rootScope', '$route', '$location', 'layoutService'];

    function layoutCtrl($scope, $rootScope, $route, $location, layoutService) {

		$scope.page = {};

		$scope.create = function(){
			$scope.page.class = "create-page";
			$scope.page.name = "Create";

			$location.path('/create');

			layoutService.hideMenu();
		}
		$scope.planned = function(){

			$scope.page.class = "planned-page";
			$scope.page.name = "Planned";

			$location.path('/list/Planned');

			layoutService.hideMenu();
		}
		$scope.progress = function(){

			$scope.page.class = "progress-page";
			$scope.page.name = "Progress";

			$location.path('/list/Progress');

			layoutService.hideMenu();
		}
		$scope.completed = function(){

			$scope.page.class = "completed-page";
			$scope.page.name = "Completed";

			$location.path('/list/Completed');

			layoutService.hideMenu();
		}

    } // end of controller

})();