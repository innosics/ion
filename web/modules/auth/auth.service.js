/*
Author: Rosy Yang <rosy.yang@gmail.com> | MIT Licensed
*/
(function () {
    'use strict';

    angular
        .module('ionModule')
        .service('authService', authService);

    authService.$inject = ['$http', '$rootScope', '$location', 'localStorageService', 'apiProvider'];

    function authService($http, $rootScope, $location, localStorageService, apiProvider) {
		var vm = this;
        
		vm.authURL = apiProvider + "/auth/token";

        $rootScope.accountURL = apiProvider + "/account";
        $rootScope.apiURL = apiProvider + "/api";

		vm.login = function (username, password, callBackFunc){

			var authData =
			{
				"grant_type":"password",
				"username":username,
				"password":password
			};
            
			$http.post(vm.authURL, authData).success(function(responseData) {
				if (responseData){
					if (responseData.access_token){
						resetRootScope(responseData, function(){
							callBackFunc(true);
						});
					}else{
						callBackFunc(false);
					}
				}else{
					callBackFunc(false);
				}

			}).error(function(responseData) {
				callBackFunc(false);
			});
		}
		function resetRootScope(responseData, callback){

			var getHeaders = {
				'Authorization':'Bearer ' + responseData.access_token,
				'Content-Type': 'application/json; charset=UTF-8'
			}

			$http.get($rootScope.accountURL + '/space', {headers: getHeaders})
			.then(
				function(spaceData){
					if (spaceData.data){
						$rootScope.space=spaceData.data.space;
						$rootScope.spaceName=spaceData.data.spaceName;
						$rootScope.userName=spaceData.data.name;

                        $rootScope.access_token = responseData.access_token;
                        $rootScope.refresh_token = responseData.refresh_token;
                        $rootScope.token_type = responseData.token_type;
                        $rootScope.authenticated = true;
                        
                        localStorageService.saveAccessTokenToLocalStorage();
            
						localStorageService.saveSpaceInfoToLocalStorage();

						callback();
					}
				},
				function(spaceDataError){
					console.log("Space Data Error: " + JSON.stringify(spaceDataError));
                    alert("Account info error, access denied!");
				}
			);
		}

		vm.askForNewLogin = function(callBackFun){
			$('#globalLoginModal').modal({backdrop: 'static',keyboard: false, show: true});
			$('#globalLoginModal').on('loginSucess', function(){
				if (callBackFun){
					callBackFun();
				}
			});
		}
		vm.refreshAuthentication = function (callBackFunc){
		    if (! $rootScope.refresh_token){
		        vm.askForNewLogin(callBackFunc);
		    }else{
		        var authData =
		        {
		            "grant_type":"refresh_token",
		            "refresh_token":$rootScope.refresh_token
		        };

		        $http.post(vm.authURL, authData).success(function(responseData) {
		            if (! responseData.error){
		                resetRootScope(responseData, function(){
					
		                    callBackFunc();
		                });
		            }else{
		                vm.askForNewLogin(callBackFunc);
		            }

		        }).error(function(responseData) {
		            vm.askForNewLogin(callBackFunc);
		        });
		    }
		}
	}
})();
