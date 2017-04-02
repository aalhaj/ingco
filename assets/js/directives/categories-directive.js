(function(){
  'use strict';
  angular
    .module('ingcoTools')
    .directive('categoriesDirective',categoriesDirective);
    categoriesDirective.$inject = ['$rootScope'];
    function categoriesDirective($rootScope){
      return {
        restrict: 'EA',
        templateUrl:function(tElement, tAttrs) {
          if(tAttrs.place == 'categoriesPage'){
            return 'templates/categories-page.html';
          }
          return 'templates/home-categories.html';
        },
        scope: {
          category: '='
        },
        link: function(scope, element) {

       }
      };
    }
})();
