/**
 * Shipping controller.
 *
 * @param Session
 * @param Cart
 * @param clientToken
 * @constructor
 * @ngInject
 */
function ShippingCtrl(Session, Cart, clientToken) {
  var vm = this;
  
  vm.shippingDetails = Session.getData();
  vm.placeOrder = placeOrder;
  vm.orderReview = orderReview;
  vm.confirmPayment = confirmPayment;
  vm.totalPrice = totalPrice;
  vm.paymentTab = true;
  vm.paymentFollows = false;
  vm.orderReviewTab = true;
  vm.orderFollows = false;
  
  //////////////////////////////
  
  /**
   * Place cart
   *
   */
  function placeOrder() {
    if (vm.detailsForm.$invalid) {
      return;
    }
    vm.paymentTab = false;
    vm.paymentFollows = true;
  }
  
  function orderReview() {
    if (vm.paymentForm.$invalid) {
      return;
    }
    vm.orderReviewTab = false;
    vm.orderFollows = true;
  }
  
  /**
   * Payment
   *
   */
  function confirmPayment() {
    if (vm.paymentForm.$invalid) {
      return;
    }
    //Cart.createShippingDetails(vm.shippingDetails);
    Cart.placeOrder(vm.shippingDetails);
    
    var client = new braintree.api.Client({clientToken: clientToken});
    client.tokenizeCard({
      number: vm.card.number,
      cardholderName: vm.shippingDetails.firstName + ' ' + vm.shippingDetails.lastName,
      expirationMonth: vm.card.exp_month,
      expirationYear: vm.card.exp_year,
      cvv: vm.card.cvc
    }, function (err, nonce) {
      Cart.confirmPayment(nonce, totalPrice());
    });
    
  }
  
  /**
   * Calculate total price.
   *
   * @returns {number}
   */
  function totalPrice() {
    var total = 0;
    _.map(Cart.items, function (item) {
      total += item.quantity * item.book.price;
    });
    return total;
  }
}
angular
  .module('order')
  .controller('ShippingCtrl', ShippingCtrl);

