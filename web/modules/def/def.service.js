(function () {
    'use strict';

    angular
        .module('ionModule')
        .factory('defService', defService);

    defService.$inject = ['dataService', '$rootScope'];

    function defService(dataService, $rootScope) {
        var service = {
            list: list,
            save: save,
            fetch: fetch,
            def: findDef,
            objDef: findObjDef,
            saveObjDef: saveObjDef
        };

        return service;

        function findObjDef(objId, defId, callBack) {
			dataService.getDataFromServer('OBJ_DEF_FIND', '', 'objId=' + objId + '&defId=' + defId, function(data){
					callBack(data[0]);
				}
			);
        }

        function saveObjDef(obj, def, callBack) {
			//check if the def is an obj def or global def
			//if it is an obj def, nothing to do
			if (! def.objId){
				//there is no objId in def, so it is a global def, have to make a copy and save as obj def
				//to do that, simply remove _id from def and add objId
				if (def._id){
					delete def._id;
					def.key = "objId";
				}

				def.objId = obj._id;

				dataService.postDataToServer('OBJ_DEF_SAVE', '', def, function(data){
						callBack(data);
					}
				);
			}else{
				callBack(def);
			}
        }

        function fetch(_id, callBack) {
			dataService.getDataFromServer('DEF_FETCH', _id, '', function(data){
					callBack(data);
				}
			);
        }

        function findDef(defId, callBack) {
			dataService.getDataFromServer('DEF_FIND', '', 'defId=' + defId, function(data){
					callBack(data[0]);
				}
			);
        }

        function list(category, callBack) {
			dataService.getDataFromServer('DEF_LIST', '', 'category=' + category, function(data){
					callBack(data);
				}
			);
        }

        function save(def, callBack) {
			dataService.postDataToServer('DEF_SAVE', '', def, function(data){
					callBack(data);
				}
			);
        }
    }
})();
