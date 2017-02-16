/**
 *
 * @param $urlRouterProvider
 * @ngInject
 */
function config($urlRouterProvider) {
  
  $urlRouterProvider.otherwise("/");
  
}

function run() {
  if (location.host.indexOf('book-shop.online') > -1) {
    URLTo.apiBase("https://api.book-shop.online");
  }
  else {
    URLTo.apiBase("http://localhost:3000");
  }
  
}

angular
  .module("app", [
    "bookShop",
    "order",
    "auth",
    "layout",
    "ngMessages",
    "ui.bootstrap.tabs"
  
  ])
  .config(config)
  .run(run);
