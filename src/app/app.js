/**
 *
 * @param $urlRouterProvider
 * @ngInject
 */
function config($urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

}

function run() {
    URLTo.apiBase("http://localhost:3000");
}

angular
    .module("app", [
        "bookShop",
        "order",
        "auth",
        "layout",
        "ngMessages",
        "ui.bootstrap.tabs",
        "credit-cards"

    ])
    .config(config)
    .run(run);
