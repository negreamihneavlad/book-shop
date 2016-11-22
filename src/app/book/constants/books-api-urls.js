var BOOKS_API_URLS = {
    oneBook: "books/$1",
    books: "books",
    search: "search/$1"
};

angular
    .module("bookShop")
    .constant("BOOKS_API_URLS", BOOKS_API_URLS);


