(function() {
  'use strict';

  angular
    .module('IngcoToolsAdmin')
    .controller('GalleryController',GalleryController);

    GalleryController.$inject = ['$scope','$http','$sce','$timeout'];

    function GalleryController($scope,$http,$sce,$timeout){
      $scope.gallery = [];
      $scope.tempGalleryData = {};


      // function to get records from the database
      $scope.getGalleryItems = function(){
          $http.get('action.php', {
              params:{
                  'type':'view',
                  'table':'gallery'
              }
          }).then(function(response){
              if(response.data.status == 'OK'){
                  $scope.gallery = response.data.records;
              }
          },function (error){

          });
      };

      // function to insert or update gallery data to the database
      $scope.saveGalleryItem = function(type){
          if($scope.tempGalleryData.type=='youtube'){
            var src= $scope.tempGalleryData.src.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i);
            $scope.tempGalleryData.src= 'https://www.youtube.com/embed/'+src[1]+'?ecver=1';
          }
          var data = $.param({
              'data':$scope.tempGalleryData,
              'type':type,
              'table':'gallery'
          });

          var config = {
              headers : {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
              }
          };
          $http.post("action.php", data, config).then(function(response){
              if(response.data.status == 'OK'){

                  if( $scope.tempGalleryData.type != 'youtube'){
                    $('#upload-gallery-file').data('uploader').start();
                  }

                  var gId="";
                  if(type == 'edit'){
                      gId=$scope.tempGalleryData.id;
                      $scope.gallery[$scope.index].id = $scope.tempGalleryData.id;
                      $scope.gallery[$scope.index].type = $scope.tempGalleryData.type;
                      $scope.gallery[$scope.index].src = $scope.tempGalleryData.src;
                      $scope.gallery[$scope.index].additional_field = $scope.tempGalleryData.additional_field;
                      $scope.gallery[$scope.index].description_ar = $scope.tempGalleryData.description_ar;
                      $scope.gallery[$scope.index].title_ar = $scope.tempGalleryData.title_ar;
                      $scope.gallery[$scope.index].title_en = $scope.tempGalleryData.title_en;
                      $scope.gallery[$scope.index].description_en = $scope.tempGalleryData.description_en;
                      $scope.gallery[$scope.index].created = $scope.tempGalleryData.created;
                  }else{
                    gId=response.data.data.id;
                    $scope.gallery.push({
                        id:response.data.data.id,
                        type:response.data.data.type,
                        src:response.data.data.src,
                        additional_field:response.data.data.additional_field,
                        title_ar:response.data.data.title_ar,
                        title_en:response.data.data.title_en,
                        description_ar:response.data.data.description_ar,
                        description_en:response.data.data.description_en,
                        created:response.data.data.created
                    });
                  }

                  var appendImg = function (gId) {
                    $timeout(function () {
                      $('[data-gallery="'+gId+'"] .row-categ-img').empty().append($('#gallery-form-img canvas'));
                    },200);
                  };
                  appendImg(gId);

                  $('#gallery-form-img').empty();
                  $scope.galleryForm.$setPristine();
                  $scope.tempGalleryData = {};
                  $('.galleryForm').slideUp();
                  $scope.messageSuccess(response.data.msg);
              }else{
                  $scope.messageError(response.data.msg);
              }
          },function(error){

          });
      };

      // function to add cateory data
      $scope.addGalleryItem = function(){
          $scope.saveGalleryItem('add');
      };

      // function to edit gallery data
      $scope.editGalleryItem = function(gallery){
          $scope.tempGalleryData = {
              id:gallery.id,
              type:gallery.type,
              src:gallery.src,
              additional_field:gallery.additional_field,
              title_ar:gallery.title_ar,
              title_en:gallery.title_en,
              description_ar:gallery.description_ar,
              description_en:gallery.description_en,
              created:gallery.created
          };


          if(gallery.type == 'youtube'){
            document.getElementById('gallery-file-field').classList.remove("hidden-form-control");
            $scope.galleryFileLabel = "رابط فيديو يوتيوب";
            $scope.ytRegex = '^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$';
          }else{
            document.getElementById('gallery-file-field').classList.add("hidden-form-control");
            $scope.galleryFileLabel = "صورة";
            $scope.ytRegex='';
          }
          $scope.index = $scope.gallery.indexOf(gallery);
          $('.galleryForm').slideDown(function () {
            $scope.galleryFileChange();
          });
      };

      // function to update gallery data
      $scope.updateGalleryItem = function(){
          $scope.saveGalleryItem('edit');
      };

      // function to delete gallery data from the database
      $scope.deleteGalleryItem = function(gallery){
          var conf = confirm('Are you sure to delete the gallery?');
          if(conf === true){
              var data = $.param({
                  'id': gallery.id,
                  'data': gallery,
                  'type':'delete',
                  'table':'gallery'
              });
              var config = {
                  headers : {
                      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                  }
              };
              $http.post("action.php",data,config).then(function(response){
                  if(response.data.status == 'OK'){
                      var index = $scope.gallery.indexOf(gallery);
                      $scope.gallery.splice(index,1);
                      $scope.messageSuccess(response.data.msg);
                  }else{
                      $scope.messageError(response.data.msg);
                  }
              },function(error) {

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

      $scope.galleryFileChange = function(){
         var loading = document.getElementById('loading').style.display = 'block';
          //create browes button
          setTimeout(function() {
            if($scope.tempGalleryData.type != 'youtube' && $('#upload-gallery-file').data('uploader') == undefined){
              var ext = [];
              ext.push(IMAGE_EXT);
              createPLUpload('upload-gallery-file','gallery-file',ext,GALLERY_DIR,'gallery-form-file','gallery-file-field');
            }

            if($scope.tempGalleryData.type == 'youtube'){
              document.getElementById('gallery-file-field').classList.remove("hidden-form-control");
              $scope.galleryFileLabel = "رابط فيديو يوتيوب";
              $scope.ytRegex = '^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$';
            }else if($scope.tempGalleryData.type == 'image'){
              document.getElementById('gallery-file-field').classList.add("hidden-form-control");
              $scope.galleryFileLabel = "ملف (صورة/فيديو)";
              $scope.ytRegex='';
            }
            var loading = document.getElementById('loading').style.display = 'none';
          },200);

      };

      $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      }
    }
})();
