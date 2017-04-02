(function(){
  'use strict';

  angular
    .module('ingcoTools')
    .service('productService',productService);

    productService.$inject = ['$http','$q'];

    function productService($http,$q) {
       var deff = $q.defer();
       $http.get(storeJSON).then(function (data) {
         for(var i=0; i< data.data.products.length;i++){
           var p = data.data.products[i];
           if(p.id == deff.productId)
            deff.resolve(p);
         }
         deff.resolve(null);
       });

       this.getProduct = function(pId){
         deff.productId = pId;
         return deff.promise;
       }
     }

})();
