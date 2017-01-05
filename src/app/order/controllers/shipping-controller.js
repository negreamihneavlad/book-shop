/**
 * Shipping controller.
 *
 * @param Session
 * @param Cart
 * @constructor
 */
function ShippingCtrl(Session, Cart) {
    var vm = this;

    vm.shippingDetails = Session.getData();
    vm.placeOrder = placeOrder;

    //////////////////////////////

    /**
     * Place order
     *
     */
    function placeOrder() {
        if (vm.form.$invalid) {
            return;
        }
        Cart.placeOrder(vm.shippingDetails);
        Cart.createShippingDetails(vm.shippingDetails);
    }
}
angular
    .module('order')
    .controller('ShippingCtrl', ShippingCtrl);

