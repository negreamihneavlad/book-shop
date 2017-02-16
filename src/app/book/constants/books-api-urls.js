var BOOKS_API_URLS = {
  oneBook: "books/$1",
  books: "books",
  search: "search",
  categories: "categories",
  publishers: "publishers",
  authors: "authors",
  length: "length"
};

angular
  .module("bookShop")
  .constant("BOOKS_API_URLS", BOOKS_API_URLS);


