(function(){
  'use strict';

  angular
    .module('ingcoTools')
    .service('carouselService',carouselService);

    carouselService.$inject = ['$http','$q'];

    function carouselService($http,$q) {
       var deff = $q.defer();
       $http.get(storeJSON).then(function (data) {
         deff.resolve(data);
       });

       this.getCarouselItems = function(){
         return deff.promise;
       }
     }

})();
