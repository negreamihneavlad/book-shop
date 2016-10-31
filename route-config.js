(function() {

    angular
        .module("BookShop", ["ui.router"])
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('list', {
                url: '/list',
                templateUrl: 'templates/list.html',
                controller: 'ListCtrl as vm',
                resolve: {
                    bookList: bookList
                }

            })
            .state('addEdit', {
                url: '/add-edit/:id',
                templateUrl: 'templates/add-edit.html',
                controller: 'AddEditCtrl as vm',
                resolve: {
                    book: book
                }

            })
            .state('findGoogle', {
                url: '/find-google',
                templateUrl: 'templates/find-google.html',
                controller: 'FindCtrl as vm',

            });
    }

    function bookList(Books) {
        return Books.getList();
    }



    function book($stateParams, Books) {
        if ($stateParams.id) {
            return Books.getOne($stateParams.id);
        }
        return undefined;
    }
}());
