(function () {
    'use strict';

    angular
        .module('ionModule')
        .controller('ionTaskListCtrl', ionTaskListCtrl);

    ionTaskListCtrl.$inject = ['$scope', '$rootScope', '$route', 'layoutService', 'defService', 'taskService'];

    function ionTaskListCtrl($scope, $rootScope, $route, layoutService, defService, taskService) {

		$scope.taskStatus = $route.current.params["status"];
		
		$scope.taskDef = undefined;
		$scope.allTasks = [];
		$scope.currentTask = {};

		$scope.delete = function(task){
			task.status = "Deleted";
			$scope.save(task);
		}

		$scope.start = function(task){
			task.status = "Progress";
			$scope.save(task);
		}

		$scope.complete = function(task){
			task.status = "Completed";
			$scope.save(task);
		}

		$scope.save = function(task){
			taskService.save(task, function(data){
				//todo: what to do if failed?
			});
		}

		taskService.list(1, $scope.taskStatus, function(data){
			$scope.allTasks = data;
		});

    } // end of controller

})();