(function(){
  'use strict';
  angular
    .module('IngcoToolsAdmin')
    .config(config)
    .run(run);

    config.$injector = ['$httpProvider','$stateProvider', '$urlRouterProvider', '$locationProvider','$sceDelegateProvider'];
    function config($httpProvider,$stateProvider,$urlRouterProvider,$locationProvider,$sceDelegateProvider) {
      $locationProvider.html5Mode(true).hashPrefix('!');
      $stateProvider
        .state('/',{
          url: '/',
          controller: 'MainController',
          controllerAs: 'mc',
          templateUrl: 'views/users.html',
        })
        .state('users',{
          url: '/users',
          controller: 'MainController',
          controllerAs: 'mc',
          templateUrl: 'views/users.html',
        })
        .state('carousel',{
          url: '/carousel',
          controller: 'MainController',
          controllerAs: 'mc',
          templateUrl: 'views/carousel.html',
        })
        .state('categories',{
          url: '/categories',
          controller: 'MainController',
          controllerAs: 'mc',
          templateUrl: 'views/categories.html',
        })
        .state('exhibition',{
          url: '/exhibition',
          controller: 'MainController',
          controllerAs: 'mc',
          templateUrl: 'views/exhibition.html',
        })
        .state('products',{
          url: '/products',
          controller: 'MainController',
          controllerAs: 'mc',
          templateUrl: 'views/products.html',
        })
        .state('settings',{
          url: '/settings',
          controller: 'MainController',
          controllerAs: 'mc',
          templateUrl: 'views/settings.html',
        })
        .state('otherwise',{
          url: '*path',
          controller: 'LoginController',
          controllerAs: 'mc',
          templateUrl: 'views/login.html',
        });
      $sceDelegateProvider.resourceUrlWhitelist(['self','*://www.youtube.com/*']);
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http','$state'];
    function run($rootScope, $location, $cookieStore, $http,$state) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
            var loggedIn = $rootScope.globals.currentUser;

            if($.inArray($location.path(), ['/login']) != -1){
              $rootScope.login = true;
            }else{
              $rootScope.login = false;
            }

            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();

/*---Constants---*/
var uploadComplete = false;
const BASE_URL = window.location.origin;
const CATEGORIES_DIR = "store/categories";
const PRODUCTS_DIR = "store/products";
const GALLERY_DIR = "store/gallery";
const CAROUSEL_DIR = "store/carousel";
const IMAGE_EXT = { title : "Image files", extensions : "jpeg,jpg,gif,png" };
const VIDEO_EXT = { title : "Viedo files", extensions : "mp4,WebM,Ogg" };
