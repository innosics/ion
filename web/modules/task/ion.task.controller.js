/*
Author: Rosy Yang <rosy.yang@gmail.com> | MIT Licensed
*/
(function () {
    'use strict';

    angular
        .module('ionModule')
        .controller('ionTaskCtrl', ionTaskCtrl);

    ionTaskCtrl.$inject = ['$scope', '$rootScope', '$route', '$location', 'layoutService', 'defService', 'taskService'];

    function ionTaskCtrl($scope, $rootScope, $route, $location, layoutService, defService, taskService) {

		$scope.taskDef = undefined;
		$scope.currentTask = {status: 'Planned'};

		$scope.save = function(){
			$scope.currentTask.defId = $scope.taskDef.defId;
			
			taskService.save($scope.currentTask, function(data){

				$scope.$parent.page.class = "planned-page";
				$scope.$parent.page.name = "Planned";

				$location.path('/list/Planned');
			});
		}

		defService.def(1, function(def){
			if (def){
				$scope.taskDef = def;
			}else{
				$scope.taskDef =
				{
					defId: 1,
					category: "obj",
					masterDefId: 0,
					title: "Task",
					key: "defId",
					sections:
					[
						{
							title: "Task Details",
							index: 0,
							fields:
							[
								{index: 1, element: "input", type: "text", title: "Name", model: "name"},
								{index: 2, element: "input", type: "date", title: "Due Date", model: "duedate"},
								{index: 3, element: "select", title: "Status", model: "status", options: ['Planned', 'Progress', 'Completed']},
								{index: 4, element: "textarea", type: "text", title: "Description", model: "desc"}
							]
						}
					]
				};
				
				defService.save($scope.taskDef, function(def){
					$scope.taskDef = def;
				});
			}
		});

    } // end of controller

})();