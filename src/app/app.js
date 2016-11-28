/**
 *
 * @param $urlRouterProvider
 * @ngInject
 */
function config($urlRouterProvider) {

    $urlRouterProvider.otherwise("/");
}

function run(){
    URLTo.apiBase("http://localhost:3000");
}

angular
    .module("app", [
        "bookShop",
        "auth",
        "layout"
    ])
    .config(config)
    .run(run);
