(function(){
  'use strict';

  angular
    .module('ingcoTools')
    .controller('CategoryController',CategoryController)
    .filter('getCategoryProducts',getCategoryProducts);

    CategoryController.$inject = ['$rootScope','$scope','$stateParams','categoryProductService']

    function CategoryController($rootScope,$scope,$stateParams,categoryProductService){
      if($stateParams.name != undefined){
        $rootScope.title = 'Ingco | '+$stateParams.name;
        $rootScope.pName_ar = $stateParams.name;
        $rootScope.pName_en = $stateParams.name;
      }

      var categoryProducts = categoryProductService.getProducts();
      categoryProducts.then(function (data) {
        $scope.categoryId = $stateParams.id;
        $scope.product=data.data.products;
      });
    }


    function getCategoryProducts() {
      return function(products, cId) {
        if(products === undefined) return [];
        var out = [];
        for (var i = 0; i < products.length; i++) {
          if(products[i].category == cId){
            out.push(products[i]);
          }
        }
        return out;
      }
    }

})();
