/**
 * App controller.
 *
 * @param Cart
 * @constructor
 * @ngInject
 */
function AppCtrl(Cart) {
    Cart.load();
}

angular
    .module("app")
    .controller("AppCtrl", AppCtrl);
