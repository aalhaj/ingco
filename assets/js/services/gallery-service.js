(function(){
  'use strict';

  angular
    .module('ingcoTools')
    .service('galleryService',galleryService);

    galleryService.$inject = ['$http','$q'];

    function galleryService($http,$q) {
       var deff = $q.defer();
       $http.get(storeJSON).then(function (data) {
         deff.resolve(data);
       });

       this.getGallery = function(){
         return deff.promise;
       }
     }

})();
