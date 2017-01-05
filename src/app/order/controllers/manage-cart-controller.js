/**
 * Manage cart.
 *
 * @param Cart
 * @param cartItems
 * @constructor
 * @ngInject
 */
function ManageCartCtrl(Cart, cartItems) {
    var vm = this;
    vm.cartItems = cartItems;
    vm.increaseQuantity = increaseQuantity;
    vm.decreaseQuantity = decreaseQuantity;
    vm.removeItem = removeItem;
    vm.totalPrice = totalPrice;

    //////////////////////////////

    /**
     * Get total price
     *
     * @returns {number}
     */
    function totalPrice(){
        var total = 0;
        _.map(vm.cartItems,function(item){
            total += item.quantity * item.book.price;
        });
        return total;
    }

    /**
     * Increase quantity
     *
     * @param item
     */
    function increaseQuantity(item) {
        vm.cartItems[item].quantity += 1;
        Cart.changeQuantity(vm.cartItems[item].id, {quantity: vm.cartItems[item].quantity});
    }

    /**
     * Decrease quantity
     *
     * @param item
     */
    function decreaseQuantity(item) {
        if (vm.cartItems[item].quantity != 1) {
            vm.cartItems[item].quantity -= 1;
            Cart.changeQuantity(vm.cartItems[item].id, {quantity: vm.cartItems[item].quantity});
        }
    }

    /**
     * Remove item
     *
     * @param item
     */
    function removeItem(item) {
        Cart.destroy(vm.cartItems[item].id);
        _.remove(vm.cartItems, vm.cartItems[item]);
    }

}
angular
    .module('order')
    .controller('ManageCartCtrl', ManageCartCtrl);
