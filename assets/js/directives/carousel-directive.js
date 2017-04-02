(function(){
  'use strict';
  angular
    .module('ingcoTools')
    .directive('carouselDirective',carouselDirective);
    carouselDirective.$inject = ['$rootScope'];
    function carouselDirective($rootScope){
      return {
        restrict: 'EA',
        templateUrl:'templates/carousel-item.html',
        scope: {
          carousel: '='
        },
        link: function(scope, element) {
          if(scope.$parent.$last) {
            var settings = {
              nav: false,
              autoplay:true,
              smartSpeed: 900,
              dots: true,
              items:1,
              animateOut: 'fadeOut ',
              animateIn: 'flipInX',
              rewind:true,
              rewindNav:true,
              onChanged : function () {
                if(this._current == this._items.length-1){
                  setTimeout(function () {
                    var owl = $('#welcome-carousel').data('owlCarousel');
                    owl.to(0);
                  },4000);
                }
              }
            };

            $('#welcome-carousel').owlCarousel(settings);
            $('#welcome-carousel .item:first-child').addClass('active');
            $('.carousel-indicators li:first-child').addClass('active');
          }
       }
      };
    }
})();
