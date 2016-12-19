/**
 * Filters.
 *
 * @param $http
 * @param BOOKS_API_URLS
 * @returns {{getCategories: getCategories, getPublishers: getPublishers, getAuthors: getAuthors}}
 * @constructor
 * @ngInject
 */
function Filters($http, BOOKS_API_URLS) {
    return {
        getCategories: getCategories,
        getPublishers: getPublishers,
        getAuthors: getAuthors
    };

    function getCategories() {
        return $http.get(URLTo.api(BOOKS_API_URLS.categories))
            .then(function (response) {
                return response.data;
            });
    }

    function getPublishers() {
        return $http.get(URLTo.api(BOOKS_API_URLS.publishers))
            .then(function (response) {
                return response.data;
            });
    }

    function getAuthors() {
        return $http.get(URLTo.api(BOOKS_API_URLS.authors))
            .then(function (response) {
                return response.data;
            });
    }
}

angular
    .module("bookShop")
    .factory("Filters", Filters);
