(function () {

    angular
        .module('ionModule')
	.service('localStorageService', ['$rootScope', '$location', function($rootScope, $location){
		var vm = this;

		vm.loadLocalStorage = function() {
			if (localStorage) {
				var iOnTaskLocalStorageStr = localStorage.getItem("iOnTaskLocalStorage");
				if (iOnTaskLocalStorageStr){
					var iOnTaskLocalStorage = JSON.parse(iOnTaskLocalStorageStr);
					$rootScope.access_token = iOnTaskLocalStorage.access_token;
					$rootScope.refresh_token = iOnTaskLocalStorage.refresh_token;

					$rootScope.apiURL=iOnTaskLocalStorage.apiURL;

					$rootScope.space=iOnTaskLocalStorage.space;
					$rootScope.spaceName=iOnTaskLocalStorage.spaceName;
					$rootScope.userName=iOnTaskLocalStorage.userName;
					
					if ($rootScope.access_token){
						$rootScope.authenticated = true;

						if (iOnTaskLocalStorage.last_location){
							$location.path( iOnTaskLocalStorage.last_location );
						}
					}
				}
			}
		};

		vm.saveAccessTokenToLocalStorage = function() {
			if (localStorage) {

				var iOnTaskLocalStorage = {};

				var iOnTaskLocalStorageStr = localStorage.getItem("iOnTaskLocalStorage");
				if (iOnTaskLocalStorageStr){
					iOnTaskLocalStorage = JSON.parse(iOnTaskLocalStorageStr);
				}

				iOnTaskLocalStorage.access_token = $rootScope.access_token;
				iOnTaskLocalStorage.refresh_token = $rootScope.refresh_token;
				iOnTaskLocalStorage.apiURL = $rootScope.apiURL;

				localStorage.setItem('iOnTaskLocalStorage', JSON.stringify(iOnTaskLocalStorage));
			}
		};

		vm.saveSpaceInfoToLocalStorage = function() {
			if (localStorage) {

				var iOnTaskLocalStorage = {};

				var iOnTaskLocalStorageStr = localStorage.getItem("iOnTaskLocalStorage");
				if (iOnTaskLocalStorageStr){
					iOnTaskLocalStorage = JSON.parse(iOnTaskLocalStorageStr);
				}

				iOnTaskLocalStorage.space = $rootScope.space;
				iOnTaskLocalStorage.spaceName = $rootScope.spaceName;
				iOnTaskLocalStorage.userName = $rootScope.userName;

				localStorage.setItem('iOnTaskLocalStorage', JSON.stringify(iOnTaskLocalStorage));
			}
		};

		vm.saveCurrentLocationToLocalStorage = function() {
			if (localStorage) {

				var iOnTaskLocalStorage = {};

				var iOnTaskLocalStorageStr = localStorage.getItem("iOnTaskLocalStorage");
				if (iOnTaskLocalStorageStr){
					iOnTaskLocalStorage = JSON.parse(iOnTaskLocalStorageStr);
				}
				iOnTaskLocalStorage.last_location = $location.path();

				localStorage.setItem('iOnTaskLocalStorage', JSON.stringify(iOnTaskLocalStorage));

			}
		};

		vm.loadLocalStorage();
	}]);

})();
