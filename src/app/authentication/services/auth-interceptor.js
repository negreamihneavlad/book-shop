/**
 * Auth interceptor.
 *
 * @param $rootScope
 * @param $q
 * @param Session
 * @param AUTH_EVENTS
 * @returns {{request: Function, responseError: Function}}
 * @constructor
 * @ngInject
 */
function AuthInterceptor($rootScope, $q, Session, AUTH_EVENTS) {
    return {
        request: request,
        responseError: responseError
    };

    //////////////////////////////

    /**
     * Request interceptor.
     *
     * @param config
     * @returns {*}
     */
    function request(config) {
        var authToken = Session.getAuthToken();
        if (authToken) {
            config.headers = config.headers || {};
            config.headers["Authorization"] = 'bearer '+authToken;
        }

        return config;
    }

    /**
     * Response error interceptor.
     *
     * @param response
     * @returns {Promise}
     */
    function responseError(response) {
        if (response.status === 401) {
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, response);
        }
        if (response.status === 403) {
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, response);
        }

        return $q.reject(response);
    }
}

angular
    .module("auth")
    .factory("AuthInterceptor", AuthInterceptor);
