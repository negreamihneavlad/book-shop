/**
 * Session service.
 *
 * @returns {{create: create, setAuthToken: setAuthToken, getAuthToken: getAuthToken, isActive: isActive, setData: setData, getData: getData, destroy: destroy, set: set, get: get, remove: remove}}
 * @constructor
 */
function Session() {
    var cookieAuthTokenKey = "AuthToken";
    var cookieSessionDataKey = "SessionData";

    return {
        create: create,
        setAuthToken: setAuthToken,
        getAuthToken: getAuthToken,
        isActive: isActive,
        setData: setData,
        getData: getData,
        destroy: destroy,
        set: set,
        get: get,
        remove: remove,
        updateData: updateData
    };

    //////////////////////////////

    /**
     * Create session.
     *
     * @param authToken
     * @param data
     */
    function create(authToken, data) {
        setAuthToken(authToken);
        setData(data);
    }

    /**
     * Set the auth token.
     *
     * @param authToken
     */
    function setAuthToken(authToken) {
        Cookies.set(cookieAuthTokenKey, authToken);
    }

    /**
     * Get the auth token.
     */
    function getAuthToken() {
        return Cookies.get(cookieAuthTokenKey);
    }

    /**
     * Check if the session is active.
     */
    function isActive() {
        return !!getAuthToken();
    }

    /**
     * Set the session data.
     *
     * @param data
     */
    function setData(data) {
        Cookies.set(cookieSessionDataKey, angular.toJson(data));
    }

    /**
     * Updates the session data.
     *
     * @param data
     */
    function updateData(data) {
        Cookies.expire(cookieSessionDataKey);
        Cookies.set(cookieSessionDataKey, angular.toJson(data));
    }

    /**
     * Return the session data.
     */
    function getData() {
        return angular.fromJson(Cookies.get(cookieSessionDataKey));
    }

    /**
     * Destroy session.
     */
    function destroy() {
        Cookies.expire(cookieAuthTokenKey);
        Cookies.expire(cookieSessionDataKey);
    }

    /**
     * Set a value in session data.
     *
     * @param key
     * @param value
     * @returns {*}
     */
    function set(key, value) {
        var sessionData = getData() || {};
        _.set(sessionData, key, value);
        setData(sessionData);
        return this;
    }

    /**
     * Get a value from session data.
     *
     * @param key
     * @param defaultValue
     * @returns {*}
     */
    function get(key, defaultValue) {
        var sessionData = getData() || {};
        return _.get(sessionData, key, defaultValue);
    }

    /**
     * Remove the given key from session data.
     *
     * @param key
     * @returns {*}
     */
    function remove(key) {
        var sessionData = getData() || {};
        delete sessionData[key];
        setData(sessionData);
        return this;
    }
}

angular
    .module("auth")
    .service("Session", Session);
