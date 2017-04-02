(function ($) {
    "use strict";

    $(document).ready(function ($) {

        $('a[href^="#"]').on('click', function (e) {
            e.preventDefault();
        });
        //Menu Slide
        var windoWidth = $(window).width();

        if (windoWidth < 768) {
            $('.sub-menu a').on('click', function ($) {});

            $('.sub-menu').on('click', function () {

                $(this).toggleClass('menu-close');
                $(this).find('a').siblings('.dropdown-menu').slideToggle(500);
            });
        }

        //Mobile Menu

        if ($.fn.owlCarousel) {
            var sliderwrapper = $('.sliderwrapper');
            $('.slider-wrapper').owlCarousel({
                loop: true,
                items: 1,
                margin: 0,
                animateIn: "zoomInCustom",
                animateOut: "fadeOut",
            });

            sliderwrapper.on('translate.owl.carousel', function () {
                $('.slide-content h2').removeClass('bounceIn animated').hide();
                $('.slide-content span').removeClass('slideInLeft animated').hide();
                $('.slide-content a').removeClass('slideInUp animated').hide();
            });

            sliderwrapper.on('translated.owl.carousel', function () {
                $('.slide-content h2').addClass('bounceIn animated').show();
                $('.slide-content span').addClass('slideInLeft animated').show();
                $('.slide-content a').addClass('slideInUp animated').show();
            });


            $('.service-slider').owlCarousel({
                items: 1,
                loop: true,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                navs: true,
            });



            $('.project-slide').owlCarousel({
                items: 4,
                loop: true,
                nav: true,
                loop: true,
                dots: false,
                autoplayHoverPause: true,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    480: {
                        items: 2,
                    },
                    768: {
                        items: 3,
                    },
                    991: {
                        items: 4,
                    }
                }
            });

            //    client-area

            $('.partner-slide').owlCarousel({
                items: 5,
                loop: true,
                margin: 0,
                loop: true,
                autoplay: true,
                dots: false,
                autoplayHoverPause: true,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 2,
                    },
                    480: {
                        items: 3,
                    },
                    768: {
                        items: 4,
                    },
                    991: {
                        items: 5,
                    }
                }
            });

            //Project_Area

            //    More porject slide
            $('.more-project-slide').owlCarousel({
                items: 3,
                loop: true,
                nav: true,
                margin: 30,
                loop: true,
                dots: false,
                autoplayHoverPause: true,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    480: {
                        items: 2,
                    },
                    768: {
                        items: 3,
                    },
                }
            });

            // client-area
            $('.client-slide').owlCarousel({
                dots: false,
                items: 3,
                loop: true,
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                nav: true,
                center: true,
                margin: 10,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                        center: true,
                        singleItem: true,
                        itemsScaleUp: true,
                    },
                    768: {
                        items: 3,
                        center: true,
                        singleItem: false,
                        itemsScaleUp: false,
                    },
                    960: {
                        items: 3,
                        center: true,
                        singleItem: false,
                        itemsScaleUp: false,
                    }
                }
            });
        }

        if ($.fn.magnificPopup) {
            $('.proudct-hover a').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                },
            });
        }

        //Project_Area

        // Plus Isotope
        if ($.fn.isotope) {
            $('.porject-list ul li').on('click', function () {
                $(".porject-list ul li").removeClass("active");
                $(this).addClass("active");

                var selector = $(this).attr('data-filter');
                $(".project-area").isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        }


    });


    $(window).on('load', function () {
      //  jQuery(".factorian-slide-preloader-wrap, .factorian-site-preloader-wrap").fadeOut(500);
    });

})(jQuery);
