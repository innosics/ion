/*
Author: Rosy Yang <rosy.yang@gmail.com> | MIT Licensed
*/
(function () {
    'use strict';

    angular
        .module('ionModule')
        .factory('dataService', dataService);

    dataService.$inject = ['$http', '$location', '$rootScope', 'authService', 'apiUrlService'];

    function dataService($http, $location, $rootScope, authService, apiUrlService) {
        var service = {
            getDataFromServer: getDataFromServer,
            postDataToServer: postDataToServer
        };

        return service;

        function getDataFromServer(urlKey, urlAppend, params, callBack) {
			
			if (! $rootScope.access_token){
				reAuthenticate(function(){
					getDataFromServer(urlKey, urlAppend, params, callBack);
				});
			}else{
				var url = apiUrlService.getURL(urlKey, $rootScope.apiURL, $rootScope.space);

				var getHeaders = {
					'Authorization':'Bearer ' + $rootScope.access_token,
					'Content-Type': 'application/json; charset=UTF-8'
				}

				if (urlAppend){
					url += '/' + urlAppend;
				}
				if (params){
					url += '?' + params;
				}
                
				$http.get(url, {headers: getHeaders})
				.then(
					function(responseData){
						$rootScope.authenticated = true;
						callBack(responseData.data);
					},
					function(responseData){
						processError(responseData, function(){
							getDataFromServer(urlKey, urlAppend, params, callBack);
						});
					}
				);
			}
        }

        function postDataToServer(urlKey, urlAppend, dataPost, callBack) {
			if (! $rootScope.space){
				reAuthenticate(function(){
					postDataToServer(urlKey, urlAppend, dataPost, callBack);
				});
			}else{

				var url = apiUrlService.getURL(urlKey, $rootScope.apiURL, $rootScope.space);

				var postHeaders = {
					'Authorization':'Bearer ' + $rootScope.access_token,
					'Content-Type': 'application/json; charset=UTF-8'
				}

				if (urlAppend){
					url += '/' + urlAppend;
				}

				$http.post(url, dataPost, {headers: postHeaders})
				.then(
					function(responseData){
						$rootScope.authenticated = true;
						callBack(responseData.data);
					},
					function(responseData){
						processError(responseData, function(){
							postDataToServer(urlKey, urlAppend, dataPost, callBack);
						});
					}
				);
			}
        }

        function processError(errorData, callBackFunc){
			if (errorData.data = "Unauthorized" || errorData.data.error == "invalid_token" || errorData.data.error == "unauthorized"){
				reAuthenticate(callBackFunc);
			}
		}
		function reAuthenticate(callBackFunc){
			$rootScope.authenticated = false;
			authService.refreshAuthentication(callBackFunc);
		}
    }

})();
