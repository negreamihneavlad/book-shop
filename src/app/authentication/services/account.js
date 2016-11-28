/**
 * Account
 *
 * @param $http
 * @param $rootScope
 * @param ACCOUNT_EVENTS
 * @param ACCOUNT_API_URLS
 * @returns {{updateUser: updateUser, updatePassword: updatePassword, requestPasswordResetToken: requestPasswordResetToken, resetPassword: resetPassword}}
 * @constructor
 * @ngInject
 */
function Account($http, $rootScope, ACCOUNT_EVENTS, ACCOUNT_API_URLS) {
    return {
        updateUser: updateUser,
        updatePassword: updatePassword,
        requestPasswordResetToken: requestPasswordResetToken,
        resetPassword: resetPassword
    };

    //////////////////////////////

    /**
     * Request password reset token
     *
     * @param email
     * @returns {*}
     */
    function requestPasswordResetToken(email) {
        return $http.put(URLTo.api(ACCOUNT_API_URLS.accountForgotPassword), {
            email: email
        });
    }

    /**
     * Request password reset
     *
     * @param email
     * @param password
     * @param token
     * @returns {*}
     */
    function resetPassword(email, password, token) {
        return $http.put(URLTo.api(ACCOUNT_API_URLS.accountResetPassword), {
            email: email,
            password: password,
            code: token
        });
    }

    /**
     * Update data for logged user
     *
     * @param userData
     * @returns {*}
     */
    function updateUser(userData) {
        return $http.put(URLTo.api(ACCOUNT_API_URLS.editAccount), userData).then(function (response) {
            $rootScope.$emit(ACCOUNT_EVENTS.update, response.data);
            return response.data;
        });
    }

    /**
     * Update password for logged user
     *
     * @param oldPassword
     * @param newPassword
     * @returns {*}
     */
    function updatePassword(oldPassword, newPassword) {
        return $http.put(URLTo.api(ACCOUNT_API_URLS.accountEditChangePassword), {
            oldPassword: oldPassword,
            password: newPassword
        })
            .then(function (response) {
                $rootScope.$emit(ACCOUNT_EVENTS.update, response.data);
                return response.data;
            });
    }
}

angular
    .module("auth")
    .service("Account", Account);