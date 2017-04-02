(function() {
  'use strict';

  angular
    .module('IngcoToolsAdmin')
    .controller('MainController',MainController);

    MainController.$inject = ['$scope','$http','$sce'];

    function MainController($scope,$http,$sce){
      $scope.storeSettings = {};

      $http.get('action.php', {
          params:{
              'type':'view',
              'table':'settings'
          }
      }).then(function(response){
          if(response.data.status == 'OK'){
            angular.forEach(response.data.records,function(v,k) {
              $scope.storeSettings[v['s_key']]=v['s_value'];
            });
          }
      },function (error){

      });

      $scope.updateStoreSettings = function() {
        var settings = [];
        angular.forEach($scope.storeSettings,function(v,k) {
          settings.push({s_key: k, s_value : v});
        });
        var data = $.param({
            'data': settings,
            'type':'editStoreSettings',
            'table':'settings'
        });
        var config = { headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'} };
        $http.post('action.php',data,config).then(function (response) {
          if(response.data.status == 'OK'){
          }
        });
      }

      $scope.resetForm = function(data,form,$scope) {
        $scope.galleryForm.$setPristine();
      }
    }
})();
