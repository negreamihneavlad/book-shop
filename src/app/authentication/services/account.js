/**
 * Account
 *
 * @param $http
 * @returns {{updateUser: updateUser}}
 * @constructor
 */
function Account($http, $rootScope, ACCOUNT_EVENTS) {
    return {
        updateUser: updateUser,
        updatePassword: updatePassword,
        requestPasswordResetToken: requestPasswordResetToken,
        resetPassword: resetPassword
    };
    /**
     * Request password reset token
     *
     * @param email
     * @returns {*}
     */
    function requestPasswordResetToken(email) {
        return $http.put("http://localhost:3000/account/forgot-password", {
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
        return $http.put("http://localhost:3000/account/reset-password", {
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
        return $http.put("http://localhost:3000/account/edit", userData).then(function (response) {
            $rootScope.$emit(ACCOUNT_EVENTS.update, response.data);
            return response.data;

        });
    }

    /**
     * Update password for logged user
     *
     * @param oldPassword
     * @param newPassword
     * @param confirmPassword
     * @returns {*}
     */
    function updatePassword(oldPassword, newPassword) {
        return $http.put("http://localhost:3000/account/edit/change-password", {
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