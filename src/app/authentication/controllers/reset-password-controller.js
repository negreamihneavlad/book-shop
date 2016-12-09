/**
 * Reset password.
 *
 * @param $window
 * @param $state
 * @param $stateParams
 * @param Account
 * @param Authentication
 * @param Page
 * @constructor
 * @ngInject
 */
function ResetPasswordCtrl($window, $state, $stateParams, Account, Authentication, Page) {
    Page.setTitle('-Reset Password');
    var vm = this;
    vm.credentials = {};
    vm.resetPassword = resetPassword;
    vm.ui = buildUI();
    vm.ui.isSubmitting = true;

    //////////////////////////////

    /**
     * Resets password and log in
     */
    function resetPassword() {
        if (vm.form.$invalid) {
            return;
        }

        Account.resetPassword($stateParams.email, vm.credentials.newPassword, $stateParams.code)
            .then(function () {
                return Authentication.login($stateParams.email, vm.credentials.newPassword);
            })

            .then(function () {
                $state.go("home", {}, {reload: true});
            })

            .catch(function () {
                $window.alert("This token is expired or invalid.");
            })

            .finally(function () {
                vm.ui.isSubmitting = false;
            });
    }
}
/**
 * Build UI.
 *
 * @returns {{isSubmitting: boolean}}
 */
function buildUI() {
    return {
        isSubmitting: false
    };
}

angular
    .module("auth")
    .controller("ResetPasswordCtrl", ResetPasswordCtrl);
