(function(){
  'use strict';

  angular
    .module('ingcoTools')
    .controller('ContactUsController',ContactUsController)

    ContactUsController.$inject = ['$rootScope','$scope','$http']

    function ContactUsController($rootScope,$scope,$http){
      $scope.sendMail = function () {

        var data = $.param({
            'data':$scope.contactData,
            'email':$rootScope.settings.email
        });
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post("mail/mail.php", data, config).then(function(response){
          var eDom = document.getElementById('responsErr');
          var sDom = document.getElementById('responsOk');
          if(response.data.status == 'OK'){
            eDom.style.display="none";
            sDom.style.display="block";
            if($rootScope.lang == 'ar'){
              $scope.responseOk = 'شكراً لك للتواصل معنا!';
            }else{
              $scope.responseOk = 'Thank you for contacting us!';
            }
          }else{
            eDom.style.display="block";
            sDom.style.display="none";
            if($rootScope.lang == 'ar'){
              $scope.responseErr = 'حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة مرة أخرى!';
            }else{
              $scope.responseErr = 'Message not sent, please try again!';
            }
          }
        });
      };
    }

})();
