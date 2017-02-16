/**
 * Books routing
 *
 * @param $stateProvider
 */
function config($stateProvider) {
  
  $stateProvider
    .state('home', {
      url: '/?category&author&publisher&page',
      parent: 'main',
      templateUrl: 'app/book/templates/book-list.html',
      controller: 'BookListCtrl as bookList',
      data: {
        pageTitle: 'Book Shop'
      },
      resolve: {
        bookList: getBookList,
        categories: getCategories,
        publishers: getPublishers,
        authors: getAuthors,
        length: getLength
      }
    })
    .state('list', {
      url: '/list/:toFind?page',
      parent: 'main',
      templateUrl: 'app/book/templates/manage-books.html',
      controller: 'ManageBooksCtrl as listBooks',
      resolve: {
        bookList: getBookList,
        searchedBooks: getSearchedBooks,
        length: getLength
      },
      data: {
        pageTitle: 'Book Shop - Manage Books'
      },
      adminGuard: true
    })
    .state('addEdit', {
      url: '/add-edit/:id',
      parent: 'main',
      templateUrl: 'app/book/templates/add-edit.html',
      controller: 'AddEditCtrl as addEdit',
      data: {
        pageTitle: 'Book Shop - Add or Edit Books'
      },
      resolve: {
        book: getOneBook
      },
      adminGuard: true
    })
    .state('findGoogle', {
      url: '/find-google',
      parent: 'main',
      templateUrl: 'app/book/templates/find-google.html',
      controller: 'FindCtrl as findGoogle',
      data: {
        pageTitle: 'Book Shop - Search on Google Books'
      },
      adminGuard: true
    })
    .state('details', {
      url: '/details/:id',
      parent: 'main',
      templateUrl: 'app/book/templates/book-details.html',
      controller: 'BookDetailsCtrl as details',
      resolve: {
        book: getOneBook
      }
    })
    .state('searchBooks', {
      url: '/search/:toFind?category&author&publisher&page',
      parent: 'main',
      templateUrl: 'app/book/templates/search-result.html',
      controller: 'SearchCtrl as search',
      data: {
        pageTitle: 'Book Shop - Search Books'
      },
      resolve: {
        searchedBooks: getSearchedBooks,
        categories: getCategories,
        publishers: getPublishers,
        authors: getAuthors,
        length: getLength
      }
    });
}
/**
 * Get book list
 *
 * @param $stateParams
 * @param Book
 * @returns {*}
 */
function getBookList($stateParams, Book) {
  if (!$stateParams.page) {
    $stateParams.page = 1;
  }
  return Book.getList($stateParams);
}
/**
 *
 * @returns {*}
 */
function getCategories(Filters) {
  return Filters.getCategories();
}
/**
 *
 * @returns {*}
 */
function getPublishers(Filters) {
  return Filters.getPublishers();
}
/**
 *
 * @returns {*}
 */
function getAuthors(Filters) {
  return Filters.getAuthors();
}
/**
 * Get nr of books (when filters)
 *
 * @param $stateParams
 * @param Book
 * @returns {*}
 */
function getLength($stateParams, Book) {
  return Book.getLength($stateParams);
}
/**
 * Get searched books
 *
 * @param $stateParams
 * @param Book
 * @returns {*}
 */
function getSearchedBooks($stateParams, Book) {
  if (!$stateParams.page) {
    $stateParams.page = 1;
  }
  return Book.getSearchList($stateParams);
}
/**
 * Get one book
 *
 * @param $stateParams
 * @param Book
 * @returns {*}
 */
function getOneBook($stateParams, Book) {
  if ($stateParams.id) {
    return Book.getOne($stateParams.id);
  }
  return undefined;
}
/**
 *
 * @param $rootScope
 * @param AuthGuard
 * @param AdminGuard
 */
function run($rootScope, AuthGuard, AdminGuard) {
  
  // Setup route filters
  $rootScope.$on("$stateChangeStart", AuthGuard.onStateChangeStart);
  $rootScope.$on("$stateChangeStart", AdminGuard.onStateChangeStart);
}

angular
  .module("bookShop", ["ui.router", "templates", 'angular-loading-bar', 'angularUtils.directives.dirPagination'])
  .config(config)
  .run(run);

