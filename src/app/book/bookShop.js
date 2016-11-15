(function() {

    angular
        .module("bookShop", ["ui.router", "templates", 'angular-loading-bar'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                parent: 'main',
                templateUrl: 'app/book/templates/first-page.html',
                controller: 'FirstPageCtrl as firstPage',   
                resolve: {
                    getBookList: getBookList
                }

            })
            .state('list', {
                url: '/list',
                parent: 'main',
                templateUrl: 'app/book/templates/list.html',
                controller: 'ListCtrl as listBooks',
                resolve: {
                    getBookList: getBookList
                },
                adminGuard: true

            })
            .state('addEdit', {
                url: '/add-edit/:id',
                parent: 'main',
                templateUrl: 'app/book/templates/add-edit.html',
                controller: 'AddEditCtrl as addEdit',
                resolve: {
                    getOneBook: getOneBook
                },
                adminGuard: true

            })
            .state('findGoogle', {
                url: '/find-google',
                parent: 'main',
                templateUrl: 'app/book/templates/find-google.html',
                controller: 'FindCtrl as findGoogle',
                adminGuard: true

            })
            .state('details', {
                url: '/details/:id',
                parent: 'main',
                templateUrl: 'app/book/templates/book-details.html',
                controller: 'BookDetailsCtrl as details',
                resolve: {
                    getOneBook: getOneBook
                }

            })
            .state('searchBooks', {
                url: '/search/:toFind',
                parent: 'main',
                templateUrl: 'app/book/templates/search-result.html',
                controller: 'SearchCtrl as search',
                resolve: {
                    getSearchedBooks: getSearchedBooks
                }


            });
    }

    function getBookList(Book) {
        return Book.getList();
    }

    function getSearchedBooks($stateParams, Book) {
        return Book.getSearchList($stateParams.toFind);
    }

    function getOneBook($stateParams, Book) {
        if ($stateParams.id) {
            return Book.getOne($stateParams.id);
        }
        return undefined;
    }

    function run($rootScope, AuthGuard, AdminGuard) {

        // Setup route filters
        $rootScope.$on("$stateChangeStart", AuthGuard.onStateChangeStart);
        $rootScope.$on("$stateChangeStart", AdminGuard.onStateChangeStart);
    }
}());
