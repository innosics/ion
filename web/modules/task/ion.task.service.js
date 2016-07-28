/*
Author: Rosy Yang <rosy.yang@gmail.com> | MIT Licensed
*/
(function () {
    'use strict';

    angular
        .module('ionModule')
        .factory('taskService', taskService);

    taskService.$inject = ['dataService', '$rootScope'];

    function taskService(dataService, $rootScope) {
        var service = {
            list: list,
            save: save,
            fetch: fetch
        };

        return service;

        function fetch(_id, callBack) {
			dataService.getDataFromServer('OBJ_FETCH', _id, '', function(data){
					callBack(data);
				}
			);
        }

        function list(defId, status, callBack) {
			dataService.getDataFromServer('OBJ_LIST', '', 'defId=' + defId + '&status=' + status, function(data){
					callBack(data);
				}
			);
        }

        function save(obj, callBack) {
			dataService.postDataToServer('OBJ_SAVE', '', obj, function(data){
					callBack(data);
				}
			);
        }
    }
})();
