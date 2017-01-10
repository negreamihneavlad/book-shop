/**
 * Order routing
 *
 * @param $stateProvider
 */
function config($stateProvider) {

    $stateProvider
        .state('cart', {
            url: '/cart',
            parent: 'main',
            templateUrl: 'src/app/order/templates/cart.html',
            controller: 'ManageCartCtrl as cart',
            resolve: {
                cartItems: getCartItems
            }
        })
        .state('shipping', {
            url: '/shipping',
            parent: 'main',
            templateUrl: 'src/app/order/templates/shipping-details.html',
            controller: 'ShippingCtrl as ship',
            resolve: {
                clientToken: getClientToken
            }
        })
}
/**
 * Get cart items
 *
 * @param Cart
 * @returns {*}
 */
function getCartItems(Cart) {
    return Cart.items;
}

function getClientToken(Cart){
    return Cart.clientToken();
}

angular
    .module("order", ["ui.router", "templates"])
    .config(config);


