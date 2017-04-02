(function() {
  'use strict';

  angular
    .module('IngcoToolsAdmin')
    .controller('CategoryController',CategoryController);
    CategoryController.$inject = ['$scope','$http'];

    function CategoryController($scope,$http){
      $scope.categories = [];
      $scope.tempCategoryData = {};
      // function to get records from the database
      $scope.getCategories = function(){
          $http.get('action.php', {
              params:{
                  'type':'view',
                  'table':'category'
              }
          }).then(function(response){
              if(response.data.status == 'OK'){
                  $scope.categories = response.data.records;
              }
          },function (error){

          });
      };

      // function to insert or update category data to the database
      $scope.saveCategory = function(type){
          var data = $.param({
              'data':$scope.tempCategoryData,
              'type':type,
              'table':'category'
          });
          var config = {
              headers : {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
              }
          };
          $http.post("action.php", data, config).then(function(response){
              if(response.data.status == 'OK'){
                  $('#upload-categ-img').data('uploader').start();
                  var cId="";
                  if(type == 'edit'){
                      cId=$scope.tempCategoryData.id;
                      $scope.categories[$scope.index].id = $scope.tempCategoryData.id;
                      $scope.categories[$scope.index].name_ar = $scope.tempCategoryData.name_ar;
                      $scope.categories[$scope.index].name_en = $scope.tempCategoryData.name_en;
                      $scope.categories[$scope.index].image = $scope.tempCategoryData.image;
                      $scope.categories[$scope.index].created = $scope.tempCategoryData.created;
                  }else{
                    cId=response.data.data.id;
                    $scope.categories.push({
                        id:response.data.data.id,
                        name_ar:response.data.data.name_ar,
                        name_en:response.data.data.name_en,
                        image:response.data.data.image,
                        created:response.data.data.created
                    });
                  }
                  $('[data-category="'+cId+'"] .row-categ-img').empty().append($('#category-form-img img').clone());
                  $scope.categoryForm.$setPristine();
                  $scope.tempCategoryData = {};
                  $scope.resetForm('categoryForm','up');
                  $scope.messageSuccess(response.data.msg);
              }else{
                  $scope.messageError(response.data.msg);
              }
          });
      };


      // function to add cateory data
      $scope.addCategory = function(){
          $scope.saveCategory('add');
      };

      // function to edit category data
      $scope.editCategory = function(category){
          $scope.tempCategoryData = {
              id:category.id,
              name_ar:category.name_ar,
              name_en:category.name_en,
              image:category.image,
              oldimage:category.image,
              created:category.created
          };
          $scope.index = $scope.categories.indexOf(category);
          $('#categoryForm').slideDown();
      };

      // function to update category data
      $scope.updateCategory = function(){
          $scope.saveCategory('edit');
      };

      // function to delete category data from the database
      $scope.deleteCategory = function(category){
          var conf = confirm('Are you sure to delete the category?');
          if(conf === true){
              var data = $.param({
                  'id': category.id,
                  'data': category,
                  'type':'delete',
                  'table':'category'
              });
              var config = {
                  headers : {
                      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                  }
              };
              $http.post("action.php",data,config).then(function(response){
                  if(response.data.status == 'OK'){
                      var index = $scope.categories.indexOf(category);
                      $scope.categories.splice(index,1);
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
        $scope.categoryForm.$setPristine();
        $scope.tempCategoryData={};
        $('#category-form-img img').removeProp('src');
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
