/**
 * Authentication
 *
 * @param $http
 * @param $rootScope
 * @param Session
 * @param AUTH_EVENTS
 * @param AUTH_API_URLS
 * @returns {{login: login, isAuthenticated: isAuthenticated, logout: logout, isActive: isActive, isAdmin: isAdmin, signUp: signUp}}
 * @constructor
 * @ngInject
 */
function Authentication($http, $rootScope, Session, AUTH_EVENTS, AUTH_API_URLS) {
    return {
        login: login,
        isAuthenticated: isAuthenticated,
        logout: logout,
        isActive: isActive,
        isAdmin: isAdmin,
        signUp: signUp
    };

    //////////////////////////////

    /**
     * Request to log in a user
     *
     * @param email
     * @param password
     * @returns {*}
     */
    function login(email, password) {
        var promise = $http.post(URLTo.api(AUTH_API_URLS.login), {
            email: email,
            password: password
        });
        return promise.then(function (response) {
            Session.create(response.headers("Authorization"), response.data);
            return response;
        });
    }

    /**
     * Request to sign up a user
     *
     * @param firstName
     * @param lastName
     * @param email
     * @param password
     */
    function signUp(firstName, lastName, email, password) {
        var promise = $http.post(URLTo.api(AUTH_API_URLS.signUp), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        });
        return promise.then(function (response) {
            return response;
        });
    }

    /**
     * Check if user is authenticated
     * @returns {*}
     */
    function isAuthenticated() {
        return Session.isActive();
    }

    /**
     * Log out user
     */
    function logout() {
        $rootScope.$emit(AUTH_EVENTS.loggedOut, {});
        Session.destroy();
    }

    /**
     * Check if user session is active
     * @returns {*}
     */
    function isActive() {
        return Session.isActive();
    }

    /**
     * Check if user is admin
     */
    function isAdmin() {
        return Session.get("isAdmin");
    }
}

angular
    .module("auth")
    .service("Authentication", Authentication);
