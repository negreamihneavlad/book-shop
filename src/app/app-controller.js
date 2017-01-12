/**
 * App controller.
 *
 * @param Cart
 * @oaram Authentication
 * @constructor
 * @ngInject
 */
function AppCtrl(Cart, Authentication) {
    if (Authentication.isAuthenticated()){
        Cart.load();
    }

}

angular
    .module("app")
    .controller("AppCtrl", AppCtrl);
