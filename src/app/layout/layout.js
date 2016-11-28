/**
 *
 * @param $stateProvider
 */
function config($stateProvider) {

    $stateProvider
        .state({
            name: "main",
            abstract: true,
            templateUrl: "app/layout/templates/main.html",
            controller: 'MainCtrl as main'
        });
}

angular
    .module("layout", [])
    .config(config);
