/**
 * Add item controller
 *
 * @param Cart
 * @param Session
 * @param Book
 * @constructor
 * @ngInject
 */
function AddToCartCtrl(Cart, Session, Book) {
  var vm = this;
  vm.user = Session.getData();
  vm.addItemToCart = addItemToCart;
  
  //////////////////////////////
  /**
   * Add item to cart
   */
  function addItemToCart() {
    Cart.addItem(vm.user.id, vm.bookId, 1);
    Book.update(vm.bookId, {quantity: vm.bookQuantity - 1});
  }
}
/**
 * Add item directive
 *
 * @returns {{templateUrl: string, replace: boolean, bindToController: boolean, scope: {bookId: string}, controller: AddToCartCtrl, controllerAs: string}}
 */
function addToCart() {
  return {
    templateUrl: "app/order/templates/add-to-cart.html",
    replace: true,
    bindToController: true,
    scope: {
      bookId: '=',
      bookQuantity: '='
    },
    controller: AddToCartCtrl,
    controllerAs: "addToCart"
  };
}

angular
  .module("order")
  .directive("addToCart", addToCart);