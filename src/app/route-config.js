(function() {

    angular
        .module("bookShop", ["ui.router", "templates"])
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: 'templates/first-page.html',
                controller: 'FirstPageCtrl as firstPage',
                resolve: {
                    getBookList: getBookList
                }
            })
            .state('list', {
                url: '/list',
                templateUrl: 'templates/list.html',
                controller: 'ListCtrl as listBooks',
                resolve: {
                    getBookList: getBookList
                }

            })
            .state('addEdit', {
                url: '/add-edit/:id',
                templateUrl: 'templates/add-edit.html',
                controller: 'AddEditCtrl as addEdit',
                resolve: {
                    getOneBook: getOneBook
                }

            })
            .state('findGoogle', {
                url: '/find-google',
                templateUrl: 'templates/find-google.html',
                controller: 'FindCtrl as findGoogle',

            }).
        state('details', {
                url: '/details/:id',
                templateUrl: 'templates/book-details.html',
                controller: 'BookDetailsCtrl as details',
                resolve: {
                    getOneBook: getOneBook
                }

            })
            .state('searchBooks', {
                url: '/search/:toFind',
                templateUrl: 'templates/search-result.html',
                controller: 'SearchCtrl as search',
                resolve: {
                    getSearchedBooks : getSearchedBooks
                }


            });
    }

    function getBookList(Books) {
        return Books.getList();
    }

    function getSearchedBooks($stateParams,Books) {
        return Books.getSearchList($stateParams.toFind);
    }




    function getOneBook($stateParams, Books) {
        if ($stateParams.id) {
            return Books.getOne($stateParams.id);
        }
        return undefined;
    }
}());
