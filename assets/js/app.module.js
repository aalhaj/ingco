const storeJSON = "store/store.json";
const storeSettingsJSON = "store/settings.json";
const categoriesDir = "store/categories/";

(function(){
  'use strict';

  angular
      .module('ingcoTools')
      .config(function config($httpProvider,$stateProvider, $urlRouterProvider, $locationProvider, $translateProvider,$sceDelegateProvider,$compileProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $stateProvider
          .state('/',{
            url: '/',
            controller: 'mainController',
            controllerAs: 'mc',
            resolve: {
              'title': ['$rootScope', function($rootScope){
                $rootScope.title = "Ingco Tools | Home";
              }],
            },
            views: {
              'carousel': {
                templateUrl: 'views/home_carousel.html',
              },
              'content_1': {
                  templateUrl: 'views/home_categories.html',
                  controller: ''
              },
              'content_2': {
                  templateUrl: 'views/home_latest_products.html',
                  controller: ''
              }
            }
          })
          .state('home',{
            url: '/home',
            controller: 'mainController',
            controllerAs: 'mc',
            resolve: {
              'title': ['$rootScope', function($rootScope){
                $rootScope.title = "Ingco Tools | Home";
              }],
            },
            views: {
              'carousel': {
                templateUrl: 'views/home_carousel.html',
              },
              'content_1': {
                  templateUrl: 'views/home_categories.html',
                  controller: ''
              },
              'content_2': {
                  templateUrl: 'views/home_latest_products.html',
                  controller: ''
              }
            }
          })
          .state('categories',{
            url: '/categories',
            controller: 'mainController',
            resolve: {
              'title': ['$rootScope', function($rootScope){
                $rootScope.title = "Ingco | Categories";
                $rootScope.pName_ar = "الأصناف";
                $rootScope.pName_en = "Categories";
              }],
            },
            views: {
              'content_1': {
                  templateUrl: 'views/categories.html',
                  controller: ''
              },
            }
          })
          .state('category',{
            url: '/category/:id/:name',
            controller: 'mainController',
            resolve: {
              'title': ['$rootScope', function($rootScope){
                $rootScope.title = "Ingco | Category";
              }],
            },
            views: {
              'content_1': {
                  templateUrl: 'views/category.html',
                  controller: ''
              },
            }
          })
          .state('product',{
            url: '/product/:id/:name',
            controller: 'productController',
            params: { product: null },
            resolve: {
              'title': ['$rootScope', function($rootScope){
                $rootScope.title = "Ingco | Product";
              }],
            },
            views: {
              'content_1': {
                  templateUrl: 'views/product.html',
              },
            }
          })
          .state('exhibition',{
            url: '/exhibition',
            controller: 'mainController',
            resolve: {
              'title': ['$rootScope', function($rootScope){
                $rootScope.title = "Ingco | Exhibition";
                $rootScope.pName_en = "Exhibition";
                $rootScope.pName_ar = "المعرض";
              }],
            },
            views: {
              'content_1': {
                  templateUrl: 'views/exhibition.html',
                  controller: ''
              },
              'custom_resources':{
                templateUrl: 'views/gallery_resources.html',
              }
            }
          })
          .state('contact',{
            url: '/contact',
            controller: 'mainController',
            resolve: {
              'title': ['$rootScope', function($rootScope){
                $rootScope.title = "Ingco | Contact Us";
                $rootScope.pName_en = "Contact Us";
                $rootScope.pName_ar = "اتصل بنا";

                $('.main-container').addClass('contact');
              }],
            },
            views: {
              'content_1': {
                  templateUrl: 'views/contact.html',
                  controller: ''
              }
            }
          })
          .state('about-brand',{
            url: '/about-brand',
            controller: 'mainController',
            resolve: {
              'title': ['$rootScope', function($rootScope){
                $rootScope.title = "Ingco | About Brand";
                $rootScope.pName_en = "About Brand";
                $rootScope.pName_ar = "حول الماركة";
                $('.main-container').addClass('about-us');
              }],
            },
            views: {
              'content_1': {
                  templateUrl: 'views/about-brand.html',
                  controller: ''
              }
            }
          })
          .state('otherwise',{
            url: '*path',
            controller: 'mainController',
            resolve: {
              'title': ['$rootScope', function($rootScope){
                $rootScope.title = "404 | Page not found";
                $rootScope.pName_en = "404";
                $rootScope.pName_ar = "404";
              }],
            },
            views: {
              'content_1': {
                  templateUrl: 'views/404.html',
              }
            }
          });


        $translateProvider.fallbackLanguage('en');

        $translateProvider.registerAvailableLanguageKeys(['en','ar'],{
          'en-*': 'en',
          'ar-*': 'ar'
        });
        $translateProvider.useStaticFilesLoader({
          prefix: 'store/lang/',
          suffix: '.json'
        });
        $translateProvider.useSanitizeValueStrategy(null);


        $sceDelegateProvider.resourceUrlWhitelist(['self','*://www.youtube.com/*']);


        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
        $compileProvider.debugInfoEnabled(false);
        $compileProvider.commentDirectivesEnabled(false);
        $compileProvider.cssClassDirectivesEnabled(false);
      })
      .run(function ($translate,$cookies,$rootScope,$http) {
        if($cookies.get('lang') != undefined){
          $translate.preferredLanguage($cookies.get('lang'));
          $translate.use($cookies.get('lang'));
          $rootScope.customCss = [{ stylesheet : 'rtl.min.css'}];
        }else{
          $translate.preferredLanguage('en');
          $translate.use('en');
        }
        $http.post('api/visitors.php').then(function(response) {
          $rootScope.vistorsCount = 'Vistor # : '+response.data;
        })
      });
})();
