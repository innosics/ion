
$(window).load(function () {
    $('#preloader').delay(350).fadeOut('slow', function () {
    });
});

$(document).ready(function () {

    'use strict';

    function homepageResponsive() {

        var windowsWidth = $(window).width(),
            windowsHeight = $(window).height();

        if (windowsWidth > 767) {

            $('.introduction , .menu').css({
                width: '50%',
                height: '100%'
            });

        } else {

            $('.introduction , .menu').css({
                width: '100%',
                height: '50%'
            });

        }

        var introWidth = $('.introduction').width(),
            introHeight = $('.introduction').height(),
            bgImage = $('.introduction').find('img'),
            menuBgImages = $('.menu > div img');

        if (introWidth > introHeight) {

            bgImage.css({
                width: '100%',
                height: 'auto'
            });
            menuBgImages.css({
                width: '100%',
                height: 'auto'
            });

        } else {

            bgImage.css({
                width: 'auto',
                height: '100%'
            });
            menuBgImages.css({
                width: 'auto',
                height: '100%'
            });

        }

    }

    $(window).on('load resize', homepageResponsive);

    function removeHash () {
        history.pushState("", document.title, window.location.pathname
            + window.location.search);
    }

    $('.menu').on('click', 'div.menu_button' , function(){
        var selectedPage = $(this).data('url_target');
        $('#'+selectedPage).fadeIn(1200);
        $(window).scrollTop(0);
    });


    $('.menu').on('click', 'div.profile-btn', function () {
        setTimeout(function(){
            $('.count').each(function () {
                $(this).prop('Counter',0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 1500,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
        }, 100);
    });

    $('.menu').on('click', 'div.portfolio-btn', function () {
        setTimeout(function(){
            $('#projects').mixItUp();
        }, 100);
    });

    $('body').on('click', '.close-btn', function () {
        window.location.hash="";
        $('.main-page').css({
            visibility: 'visible'
        });
        $('.introduction, .menu').animate({
            left: 0
        }, 1000, 'easeOutQuart');
        $('.page').fadeOut(800);
        removeHash ();
        $(window).scrollTop(0);
    });

    $('.intro-content .social-media [data-toggle="tooltip"]').tooltip({
        placement: 'bottom'
    });

    $('.contact-details .social-media [data-toggle="tooltip"]').tooltip();

        $("#sponsor-list").owlCarousel({

            autoPlay: 3000, 
            stopOnHover: true,
            items : 3,
            itemsDesktop: [1200,3],
            itemsDesktopSmall: [991,3],
            itemsTablet: [767,2],
            itemsTabletSmall: [625,2],
            itemsMobile: [479,1]
        });

    $(function () {
        $('.show-popup').popup({
            keepInlineChanges: true,
            speed: 500
        });
    });

    if(window.location.hash !== "" && window.location.hash) {
        var redirectPage = window.location.hash.slice(1);
        $('*[data-url_target="'+redirectPage+'"]').trigger('click');
    }

});
