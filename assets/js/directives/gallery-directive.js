(function(){
  'use strict';
  angular
    .module('ingcoTools')
    .directive('galleryDirective',galleryDirective);
    galleryDirective.$inject = ['$rootScope'];
    function galleryDirective($rootScope){
      return {
        controller: 'mainController',
        restrict: 'EA',
        templateUrl:function(tElement, tAttrs) {
          if(tAttrs.place == 'grid'){
            return 'templates/gallery-grid.html';
          }else{
            return 'templates/gallery-details.html';
          }

        },
        scope: {
          gallery: '=',
          lang: '@'
        },
        link: function(scope, element) {
         if(scope.$parent.$last) loadGrid();
       }
      };
    }
    function loadGrid() {
      if(document.readyState === "complete"){
        new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
      }else{
        setTimeout(function () {
          loadGrid();
        },300);
      }

    }
})();
