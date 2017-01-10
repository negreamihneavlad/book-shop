var ORDER_API_URLS = {
    order: 'order',
    orderItem: 'orderItem',
    updateOrderItem: 'orderItem/$1',
    shipping: 'shipping',
    checkOut: 'check-out',
    clientToken: 'client-token',
    confirmPayment: 'checkout'
};

angular
    .module("order")
    .constant("ORDER_API_URLS", ORDER_API_URLS);
