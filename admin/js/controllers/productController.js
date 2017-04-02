(function() {
  'use strict';

  angular
    .module('IngcoToolsAdmin')
    .controller('ProductController',ProductController);
    ProductController.$inject = ['$scope','$http','$timeout'];

    function ProductController($scope,$http,$timeout){
      $scope.categories = [];
      $scope.tempProductData = {};
      // function to get records from the database
      $scope.getProducts = function(){
          $http.get('action.php', {
              params:{
                  'type':'view',
                  'table':'product'
              }
          }).then(function(response){
              if(response.data.status == 'OK'){
                  $scope.products = response.data.records;
              }
          },function (error){

          });
      };

      // function to insert or update product data to the database
      $scope.saveProduct = function(type){
          var data = $.param({
              'data':$scope.tempProductData,
              'type':type,
              'table':'product'
          });
          var config = {
              headers : {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
              }
          };
          $http.post("action.php", data, config).then(function(response){
              if(response.data.status == 'OK'){
                  $('#upload-product-img').data('uploader').start();
                  var pId="";
                  if(type == 'edit'){
                      pId == $scope.tempProductData.id;
                      $scope.products[$scope.index].id = $scope.tempProductData.id;
                      $scope.products[$scope.index].category = $scope.tempProductData.category;
                      $scope.products[$scope.index].image = $scope.tempProductData.image;
                      $scope.products[$scope.index].name_ar = $scope.tempProductData.name_ar;
                      $scope.products[$scope.index].name_en = $scope.tempProductData.name_en;
                      $scope.products[$scope.index].description_ar = $scope.tempProductData.description_ar;
                      $scope.products[$scope.index].description_en = $scope.tempProductData.description_en;
                      $scope.products[$scope.index].product_num = $scope.tempProductData.product_num;
                      $scope.products[$scope.index].patent_num = $scope.tempProductData.patent_num;
                      $scope.products[$scope.index].created = $scope.tempProductData.created;
                  }else{
                      pId=response.data.data.id;
                      $scope.products.push({
                          id:response.data.data.id,
                          category:response.data.data.category,
                          image:response.data.data.image,
                          name_ar:response.data.data.name_ar,
                          name_en:response.data.data.name_en,
                          description_ar:response.data.data.description_ar,
                          description_en:response.data.data.description_en,
                          product_num:response.data.data.product_num,
                          patent_num:response.data.data.patent_num,
                          created:response.data.data.created
                      });

                  }
                  var appendImg = function (pId) {
                    $timeout(function () {
                      $('[data-product="'+pId+'"] .td-product-img').empty().append($('#product-form-img img').clone());
                    },200);
                  };
                  appendImg(pId);

                  $('#product-form-img img').attr('src','');
                  $scope.productForm.$setPristine();
                  $scope.tempProductData = {};

                  $scope.messageSuccess(response.data.msg);
              }else{
                  $scope.messageError(response.data.msg);
              }
          });
      };

      // function to add cateory data
      $scope.addProduct = function(){
          $scope.saveProduct('add');
      };

      // function to edit product data
      $scope.editProduct = function(product){
          $scope.tempProductData = {
              id:product.id,
              category:product.category,
              image:product.image,
              name_ar:product.name_ar,
              name_en:product.name_en,
              description_ar:product.description_ar,
              description_en:product.description_en,
              product_num:product.product_num,
              patent_num:product.patent_num,
              created:product.created
          };
          $scope.index = $scope.products.indexOf(product);
          $('#productForm').slideDown();
      };

      // function to update product data
      $scope.updateProduct = function(){
          $scope.saveProduct('edit');
      };

      // function to delete product data from the database
      $scope.deleteProduct = function(product){
          var conf = confirm('Are you sure to delete the product?');
          if(conf === true){
              var data = $.param({
                  'id': product.id,
                  'type':'delete',
                  'table':'product'
              });
              var config = {
                  headers : {
                      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                  }
              };
              $http.post("action.php",data,config).then(function(response){
                  if(response.data.status == 'OK'){
                      var index = $scope.products.indexOf(product);
                      $scope.products.splice(index,1);
                      $scope.messageSuccess(response.data.msg);
                  }else{
                      $scope.messageError(response.data.msg);
                  }
              });
          }
      };

      // function to display success message
      $scope.messageSuccess = function(msg){
          $('.alert-success > p').html(msg);
          $('.alert-success').show();
          $('.alert-success').delay(5000).slideUp(function(){
              $('.alert-success > p').html('');
          });
      };

      // function to display error message
      $scope.messageError = function(msg){
          $('.alert-danger > p').html(msg);
          $('.alert-danger').show();
          $('.alert-danger').delay(5000).slideUp(function(){
              $('.alert-danger > p').html('');
          });
      };

      $scope.resetForm = function(form,state) {
        $scope.productForm.$setPristine();
        $scope.tempProductData={};
        $('#product-form-img img').removeProp('src','');
        if(state=='up'){
          $('#'+form).slideUp();
        }else if(state=='down'){
          $('#'+form).slideDown();
        }else{
          $('#'+form).slideToggle();
        }
      }
    }
})();
