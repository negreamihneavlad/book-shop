/**
 * Manage cart.
 *
 * @param Cart
 * @param Book
 * @param cartItems
 * @constructor
 * @ngInject
 */
function ManageCartCtrl(Cart, Book, cartItems) {
  var vm = this;
  vm.cartItems = cartItems;
  vm.removeItem = removeItem;
  vm.totalPrice = totalPrice;
  vm.updateQuantity = updateQuantity;
  
  //////////////////////////////
  
  /**
   * Get total price
   *
   * @returns {number}
   */
  function totalPrice() {
    var total = 0;
    _.map(vm.cartItems, function (item) {
      total += item.quantity * item.book.price;
    });
    return total;
  }
  
  /**
   * Update quantity
   *
   * @param item
   * @param quantity
   */
  function updateQuantity(item, quantity) {
    Cart.changeQuantity(vm.cartItems[item].id, {quantity: quantity});
  }
  
  /**
   * Remove item
   *
   * @param item
   */
  function removeItem(item) {
    Cart.destroy(vm.cartItems[item].id);
    Book.update(vm.cartItems[item].book.id, {quantity: vm.cartItems[item].book.quantity + vm.cartItems[item].quantity});
    _.remove(vm.cartItems, vm.cartItems[item]);
  }
  
}
angular
  .module('order')
  .controller('ManageCartCtrl', ManageCartCtrl);
