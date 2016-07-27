(function () {
    'use strict';

    angular
        .module('ionModule')
        .controller('AuthCtrl', AuthCtrl);

    AuthCtrl.$inject = ['$scope', 'authService', '$location', '$rootScope'];

    function AuthCtrl($scope, authService, $location, $rootScope) {
        $scope.title = 'Login';

		$scope.user = {};

		$scope.authenticationMessage = "";

		$rootScope.breadCrumb =
			[
				{name: "Login", link: "#/auth", icon: "fa fa-dashboard"}
			]
		;

		$rootScope.globalToolBars = {enabled: false, toolBars: []
		}

		$scope.login = function (){

			authService.login($scope.user.username, $scope.user.password, function(isSuccess){
				if (isSuccess){
					$('#globalLoginModal').trigger('loginSucess');
					$('#globalLoginModal').modal('hide');
				}else{
					$scope.authenticationMessage = "Login failed, please verify your email and password and try again!";
				}
			});
		}
    }

})();