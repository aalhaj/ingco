(function(){
  'use strict';

  angular
    .module('ingcoTools')
    .controller('mainController',mainController);

    mainController.$inject = ['$rootScope','$scope','$state','$stateParams','$translate','$sce','$location','$cookies','storeSettingsService','categoriesService','galleryService','carouselService','categoryProductService'];


    function mainController($rootScope,$scope,$state,$stateParams,$translate,$sce,$location,$cookies,storeSettingsService,categoriesService,galleryService,carouselService,categoryProductService){
      $rootScope.lang='en';
      $rootScope.langDir = 'ltr';
      if($cookies.get('lang') != undefined){
        $rootScope.lang=$cookies.get('lang');
        $rootScope.langDir = $cookies.get('dir');
      }

      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.storeSettings={};
      $scope.mainCategories=[];



      var categories = categoriesService.getCategories(),
      gallery = galleryService.getGallery(),
      carousel = carouselService.getCarouselItems(),
      storeSettings = storeSettingsService.getSettings(),
      mc = this;

      categories.then(function (data) {
        mc.categories=data.data.categories;
        var cs = data.data.categories;
        for(var i=0; i < cs.length ; i++){
          $scope.mainCategories.push({id: cs[i].id, name_ar : cs[i].name_ar, name_en: cs[i].name_en })
        }
      });

      storeSettings.then(function (data) {
        $rootScope.settings = data.data;
      });

      gallery.then(function (data) {
        mc.gallery=data.data.gallery;
      });

      carousel.then(function (data) {
        mc.carousel=data.data.carousel;
      });

      //Show/Hide loading
      var loading = document.getElementById('loading');
      $rootScope.$on('$translateChangeStart', function(){
        jQuery(".factorian-slide-preloader-wrap, .factorian-site-preloader-wrap").fadeIn(500);
      });
      $rootScope.$on('$translateChangeSuccess', function(){
        jQuery(".factorian-slide-preloader-wrap, .factorian-site-preloader-wrap").fadeOut(500);
      });

      $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      }

      $scope.getState = function () {
        if($state.current.name == '/' || $state.current.name == 'home')
          return 'home';
        return $state.current.name;
      }


      $rootScope.$on('$stateChangeStart',function () {
        jQuery(".factorian-slide-preloader-wrap, .factorian-site-preloader-wrap").fadeIn(500);
        $('.main-container').attr('class','main-container');
        $rootScope.bc2nd_ar = $rootScope.bc2nd_en = $rootScope.b2ndUrl = undefined;
      });

      $rootScope.$on('$stateChangeSuccess',function (event, toState, toParams, fromState, fromParams) {
        if($state.current.name == '/' || $state.current.name == 'home'){
          $('body').addClass('home');
        }else{
          $('body').removeClass('home');
        }

        if($state.current.name == 'contact')
          $scope.initilizeMap();

        jQuery(".factorian-slide-preloader-wrap, .factorian-site-preloader-wrap").fadeOut(500);
      });

      $rootScope.$on('$stateChangeError',function () {
        jQuery(".factorian-slide-preloader-wrap, .factorian-site-preloader-wrap").fadeOut(500);
      });

      $scope.changeLanguage= function(key) {
        $rootScope.lang=key;
        if(key=='en'){
          $rootScope.langDir = 'ltr';
          $scope.customCss={};
        }else{
          $rootScope.langDir = 'rtl';
          $scope.customCss = [{ stylesheet : 'rtl.min.css'}];
        }
        $cookies.put('lang',$rootScope.lang);
        $cookies.put('dir',$rootScope.langDir);
        $translate.use(key);
      };

      $scope.initilizeMap = function () {

        if(document.getElementById("googleMap") == null){
          setTimeout(function () {
            $scope.initilizeMap();
          },100);
          return;
        }
        var farmgate = {
            lat: 32.307929,
            lng: 35.0111189
        };
        var mapProp = {
            center: new google.maps.LatLng(32.307929,35.0111189),
            zoom: 15,
            navigationControl: false,
            mapTypeControl: true,
            scaleControl: true,
            draggable: true,
            scrollwheel: false,
            scrollwheel: 0,
            navigationControl: 0,
            mapTypeControl: false,
            streetViewControl: true,
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        var marker = new google.maps.Marker({
            position: farmgate,
            map: map,
            animation: google.maps.Animation.BOUNCE,
            icon: 'assets/img/location.png',
        });
      }


    }

})();
