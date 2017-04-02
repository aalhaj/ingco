(function(){
  'use strict';

  angular
    .module('ingcoTools')
    .controller('ProductController',ProductController)


    ProductController.$inject = ['$rootScope','$scope','$state','$stateParams','productService'];

    function ProductController($rootScope,$scope,$state,$stateParams,productService){
      $rootScope.title = 'Ingco | '+$stateParams.name;
      $rootScope.pName_ar = $stateParams.name;
      $rootScope.pName_en = $stateParams.name;

      $rootScope.bc2nd_ar = 'الأصناف';
      $rootScope.bc2nd_en = 'Categories';
      $rootScope.b2ndUrl = 'categories';



      var pId = $stateParams.id;
      var pName = $stateParams.name;
      if($stateParams.product == null && (pId != '' || pId != undefined)){
        var productObj = productService.getProduct(pId);
        productObj.then(function(data) {
          $scope.product=data;
          $rootScope.pCategory=data.category;
        })
      }else{
        $scope.product = $stateParams.product;
      }


      $scope.$on('$beforeStateChange', function(event) {
          event.preventDefault();
          $state.go('product', { url:'/product/:id/:name/{p:json}',id: pId, name: pName, product: $scope.product });
      });
    }

})();
