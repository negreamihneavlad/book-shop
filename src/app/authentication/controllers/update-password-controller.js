/**
 * Update password.
 *
 * @param $state
 * @param Account
 * @param Page
 * @constructor
 * @ngInject
 */
function UpdatePassCtrl($state, Account, Page) {
    Page.setTitle('Book Shop-Edit Account-Update Password');
    var vm = this;
    vm.updatePassword = updatePassword;

    //////////////////////////////

    /**
     * Update password when user is logged in
     */
    function updatePassword() {
        if (vm.form.$invalid) {
            return;
        }
        Account.updatePassword(vm.oldPassword, vm.newPassword)
            .then(function (response) {
                vm.updateMessage = 'Password updated successfully!';
                $state.go("home", {}, {reload: true});
                console.log('updated:', response);
            })
            .catch(function () {
                vm.updateMessage = 'Old password does not match!';
            });
    }
}

angular
    .module("auth")
    .controller("UpdatePassCtrl", UpdatePassCtrl);

