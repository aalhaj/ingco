(function(){
  'use strict';

  angular
    .module('ingcoTools')
    .service('categoriesService',categoriesService);

    categoriesService.$inject = ['$http','$q'];

    function categoriesService($http,$q) {
       var deff = $q.defer();
       $http.get(storeJSON).then(function (data) {
         deff.resolve(data);
       });

       this.getCategories = function(){
         return deff.promise;
       }
     }

})();
