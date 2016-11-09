(function() {

    function config($httpProvider,$stateProvider) {

        $httpProvider.interceptors.push("AuthInterceptor");

        $stateProvider

            .state('login', {
            url: '/login',
            parent: 'app',
            templateUrl: 'authentication/templates/login.html',
            controller: 'LogInCtrl as login'

        });
    }

    angular
        .module("auth", ["ui.router", "templates"])
        .config(config);
}());
