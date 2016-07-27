(function () {
    'use strict';

    angular
        .module('ionModule')
        .service('layoutService', layoutService);

	function layoutService() {

		var vm = this;

		vm.hideMenu = function ()
		{
			var introWidth = $('.introduction').width(),
				menuWidth = $('.menu').width();

			$('.introduction').animate({
				left: '-' + introWidth
			}, 1000, 'easeOutQuart');
			$('.menu').animate({
				left: menuWidth
			}, 1000, 'easeOutQuart', function () {
				$('.main-page').css({
					visibility: 'hidden'
				});
			});
		}

	}; //end of service

})();
