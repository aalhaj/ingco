(function() {
  'use strict';

  angular
    .module('IngcoToolsAdmin')
    .controller('CarouselController',CarouselController);
    CarouselController.$inject = ['$scope','$http','$timeout'];

    function CarouselController($scope,$http,$timeout){
      $scope.carouselItems = [];
      $scope.tempCarouselData = {};
      // function to get records from the database
      $scope.getCarouselItems = function(){
          $http.get('action.php', {
              params:{
                  'type':'view',
                  'table':'carousel'
              }
          }).then(function(response){
              if(response.data.status == 'OK'){
                  $scope.carouselItems = response.data.records;
              }
          },function (error){

          });
      };

      // function to insert or update carousel data to the database
      $scope.saveCarousel = function(type){
          var data = $.param({
              'data':$scope.tempCarouselData,
              'type':type,
              'table':'carousel'
          });
          var config = {
              headers : {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
              }
          };
          $http.post("action.php", data, config).then(function(response){
              if(response.data.status == 'OK'){
                  $('#upload-carousel-img').data('uploader').start();
                  var cId="";
                  if(type == 'edit'){
                      cId=$scope.tempCarouselData.id;
                      $scope.carouselItems[$scope.index].id = $scope.tempCarouselData.id;
                      $scope.carouselItems[$scope.index].image = $scope.tempCarouselData.image;
                      $scope.carouselItems[$scope.index].url = $scope.tempCarouselData.url;
                      $scope.carouselItems[$scope.index].created = $scope.tempCarouselData.created;
                  }else{
                    cId=response.data.data.id;
                    $scope.carouselItems.push({
                        id:response.data.data.id,
                        image:response.data.data.image,
                        url:response.data.data.url,
                        created:response.data.data.created
                    });
                  }

                  var appendImg = function (cId) {
                    $timeout(function () {
                      $('[data-carousel="'+cId+'"] .row-categ-img').empty().append($('#carousel-form-img img').clone());
                    },200);
                  };
                  appendImg(cId);
                  $scope.carouselForm.$setPristine();
                  $scope.tempCarouselData = {};
                  $scope.resetForm('carouselForm','up');
                  $scope.messageSuccess(response.data.msg);
              }else{
                  $scope.messageError(response.data.msg);
              }
          });
      };


      // function to add cateory data
      $scope.addCarousel = function(){
          $scope.saveCarousel('add');
      };

      // function to edit carousel data
      $scope.editCarousel = function(carousel){
          $scope.tempCarouselData = {
              id:carousel.id,
              image:carousel.image,
              oldimage:carousel.image,
              url:carousel.url,
              created:carousel.created
          };
          $scope.index = $scope.carouselItems.indexOf(carousel);
          $('#carouselForm').slideDown();
      };

      // function to update carousel data
      $scope.updateCarousel = function(){
          $scope.saveCarousel('edit');
      };

      // function to delete carousel data from the database
      $scope.deleteCarousel = function(carousel){
          var conf = confirm('Are you sure to delete the carousel?');
          if(conf === true){
              var data = $.param({
                  'id': carousel.id,
                  'data': carousel,
                  'type':'delete',
                  'table':'carousel'
              });
              var config = {
                  headers : {
                      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                  }
              };
              $http.post("action.php",data,config).then(function(response){
                  if(response.data.status == 'OK'){
                      var index = $scope.carouselItems.indexOf(carousel);
                      $scope.carouselItems.splice(index,1);
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
        $scope.carouselForm.$setPristine();
        $scope.tempCarouselData={};
        $('#carousel-form-img img').removeProp('src');
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
