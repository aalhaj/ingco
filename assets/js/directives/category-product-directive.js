(function(){
  'use strict';
  angular
    .module('ingcoTools')
    .directive('categoryProductDirective',categoryProductDirective);
    categoryProductDirective.$inject = ['$rootScope'];
    function categoryProductDirective($rootScope){
      return {
        restrict: 'EA',
        templateUrl:'templates/category-products.html',
        scope: {
          product: '='
        },
        link: function(scope, element,attrs) {
          var settings = {
            margin: 5,
            nav: true,
            smartSpeed: 900,
            dots: false,
            navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
            responsive: {

                0: {
                    items: 2
                },
                480: {
                    items: 3
                },
                678: {
                    items: 4
                }
            }
          };


          if(scope.$parent.$last && attrs.place == 'home-category-product'){
            $('div[data-category="'+element.parent().attr('data-category')+'"]').owlCarousel(settings);
          }else if(scope.$parent.$last && attrs.place == 'home-latest-product'){
            settings.responsive[960] = { items: 5};
            settings.responsive[1160] = {items: 6};
            $('#latest-products').owlCarousel(settings);
          }else if(scope.$parent.$last && attrs.place == 'product-page'){
            settings.responsive[960] = { items: 5};
            settings.responsive[1160] = {items: 6};

            $('#like-products').owlCarousel(settings);
          }
       }
      };
    }
})();
