/**
 *
 * @param $http
 * @param $rootScope
 * @param Session
 * @param AUTH_EVENTS
 * @returns {{login: login, isAuthenticated: isAuthenticated, logout: logout, isActive: isActive, isAdmin: isAdmin, signUp: signUp}}
 * @constructor
 */
function Authentication($http, $rootScope, Session, AUTH_EVENTS) {
    return {
        login: login,
        isAuthenticated: isAuthenticated,
        logout: logout,
        isActive: isActive,
        isAdmin: isAdmin,
        signUp: signUp
    };
    /**
     *Request to log in a user
     *
     * @param email
     * @param password
     * @returns {*}
     */
    function login(email, password) {
        var promise = $http.post("http://localhost:3000/login", {
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
     * @param email
     * @param password
     */
    function signUp(firstName, lastName, email, password) {
        var promise = $http.post("http://localhost:3000/sign-up", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        });
        return promise.then(function(response){
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
