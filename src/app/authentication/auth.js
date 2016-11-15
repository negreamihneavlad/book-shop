/**
 *
 * @param $httpProvider
 * @param $stateProvider
 */
function config($httpProvider, $stateProvider) {

    $httpProvider.interceptors.push("AuthInterceptor");

    $stateProvider
        .state('login', {
            url: '/login',
            parent: 'main',
            templateUrl: 'app/authentication/templates/login.html',
            controller: 'LogInCtrl as login'
        })
        .state('sign', {
            url: '/sign-up',
            parent: 'main',
            templateUrl: 'app/authentication/templates/sign-up.html',
            controller: 'SignUpCtrl as sign'
        });
}

angular
    .module("auth", ["ui.router", "templates"])
    .config(config);

