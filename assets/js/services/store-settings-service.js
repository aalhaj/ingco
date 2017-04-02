(function(){
  'use strict';

  angular
    .module('ingcoTools')
    .service('storeSettingsService',storeSettingsService);

    storeSettingsService.$inject = ['$http','$q'];

    function storeSettingsService($http,$q) {
       var deff = $q.defer();
       $http.get(storeSettingsJSON).then(function (data) {
         deff.resolve(data);
       });

       this.getSettings = function(){
         return deff.promise;
       }
     }

})();
