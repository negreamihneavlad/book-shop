/**
 *
 * @param $stateProvider
 * @ngInject
 */
function config($stateProvider) {
  
  $stateProvider
    .state({
      name: "main",
      abstract: true,
      templateUrl: "app/layout/templates/main.html",
      controller: 'MainCtrl as main',
      resolve: {
        getItems: getItems
      }
    });
}

function getItems(Cart, Authentication) {
  if (Authentication.isAuthenticated()) {
    return Cart.load();
  }
  return 0;
}

angular
  .module("layout", [])
  .config(config);
