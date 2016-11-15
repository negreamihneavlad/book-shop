/**
 *
 * @param $urlRouterProvider
 */
function config($urlRouterProvider) {

    $urlRouterProvider.otherwise("/");
}

angular
    .module("app", [
        "bookShop",
        "auth",
        "layout"
    ])
    .config(config);
