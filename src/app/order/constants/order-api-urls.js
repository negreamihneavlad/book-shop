var ORDER_API_URLS = {
    order: 'order',
    orderItem: 'orderItem',
    updateOrderItem: 'orderItem/$1',
    shipping: 'shipping',
    checkOut: 'check-out'
};

angular
    .module("order")
    .constant("ORDER_API_URLS", ORDER_API_URLS);
