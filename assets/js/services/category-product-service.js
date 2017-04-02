(function(){
  'use strict';

  angular
    .module('ingcoTools')
    .service('categoryProductService',categoryProductService);

    categoryProductService.$inject = ['$http','$q'];

    function categoryProductService($http,$q) {
       var deff = $q.defer();
       $http.get(storeJSON).then(function (data) {
         deff.resolve(data);
       });

       this.getProducts = function(){
         return deff.promise;
       }
     }

})();
