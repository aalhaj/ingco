(function () {
    'use strict';

    angular
        .module('IngcoToolsAdmin')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService) {
        var mc = this;

        mc.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            mc.dataLoading = true;
            AuthenticationService.Login(mc.username, mc.password, function (response) {
                if (response.status) {
                    AuthenticationService.SetCredentials(mc.username, mc.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    mc.dataLoading = false;
                }
            });
        };
    }

})();
