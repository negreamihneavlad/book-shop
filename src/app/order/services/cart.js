/**
 * Cart service.
 *
 * @param $http
 * @param ORDER_API_URLS
 * @constructor
 * @ngInject
 */
function Cart($http, ORDER_API_URLS) {
    var items = [];
    return {
        items: items,
        load: load,
        checkCart: checkCart,
        getItems: getItems,
        addItem: addItem,
        changeQuantity: changeQuantity,
        destroy: destroy,
        placeOrder: placeOrder,
        createShippingDetails: createShippingDetails,
        clientToken: clientToken,
        confirmPayment: confirmPayment
    };

    //////////////////////////////

    /**
     * Return user items if cart exists
     *
     * @returns {*}
     */
    function load() {
        return checkCart()
            .then(function (response) {
                if (response){
                    return getItems(response.id);
                }
                else {
                    return $http.post(URLTo.api(ORDER_API_URLS.order));
                }
            })
    }

    /**
     * Checks if user has a cart
     *
     * @returns {*}
     */
    function checkCart() {
        return $http.get(URLTo.api(ORDER_API_URLS.order))
            .then(function (response) {
                return response.data;
            });
    }

    /**
     * Return order items
     *
     * @param orderId
     * @returns {*}
     */
    function getItems(orderId) {
        return $http.get(URLTo.api(ORDER_API_URLS.orderItem), {
            params: {orderId: orderId}
        })
            .then(function (response) {
                angular.copy(response.data, items);
                return response.data;
            });
    }

    /**
     * Check cart and add book
     *
     * @param userId
     * @param bookId
     * @param quantity
     * @returns {*}
     */
    function addItem(userId, bookId, quantity) {
        return checkCart(userId)
            .then(function (response) {
                return add(response.id, bookId, quantity);
            })
    }

    /**
     * Add book to cart
     *
     * @param orderId
     * @param bookId
     * @param quantity
     * @returns {*}
     */
    function add(orderId, bookId, quantity) {
        return $http.post(URLTo.api(ORDER_API_URLS.orderItem), {orderId: orderId, bookId: bookId, quantity: quantity})
            .then(function (response) {
                getItems(orderId);
                return response.data;
            })
    }

    /**
     * Increase or decrease quantity
     *
     * @param itemId
     * @param itemData
     * @returns {*}
     */
    function changeQuantity(itemId, itemData) {
        return $http.put(URLTo.api(ORDER_API_URLS.updateOrderItem, [itemId]), itemData);
    }

    /**
     * Remove book from cart
     *
     * @param itemId
     * @returns {*|boolean}
     */
    function destroy(itemId) {
        return $http.delete(URLTo.api(ORDER_API_URLS.updateOrderItem, [itemId]));
    }

    /**
     * Send order
     *
     * @returns {*}
     */
    function placeOrder(data){
        return $http.post(URLTo.api(ORDER_API_URLS.checkOut),{
            shippingDetails: data,
            items: items
        });
    }

    /**
     * Add shipping details
     *
     * @param shippingDetails
     * @returns {*}
     */
    function createShippingDetails(shippingDetails){
        return $http.post(URLTo.api(ORDER_API_URLS.shipping), {
            orderId: items[0].orderId,
            firstName: shippingDetails.firstName,
            lastName: shippingDetails.lastName,
            email: shippingDetails.email,
            country: shippingDetails.country,
            city: shippingDetails.city,
            phone: shippingDetails.phone,
            address: shippingDetails.address,
            zipCode: shippingDetails.zipCode
        });
    }

    /**
     * Get client token
     *
     * @returns {*}
     */
    function clientToken(){
        return $http.get(URLTo.api(ORDER_API_URLS.clientToken))
            .then(function(response){
                return response.data;
            })
    }

    /**
     * Payment
     *
     * @param nonce
     * @param totalPrice
     * @returns {*}
     */
    function confirmPayment(nonce, totalPrice){
        return $http.post(URLTo.api(ORDER_API_URLS.confirmPayment),{
            payment_method_nonce: nonce,
            totalPrice: totalPrice
        });
    }
}

angular
    .module('order')
    .factory('Cart', Cart);
