/**
 *
 * @param $state
 * @param Account
 * @constructor
 */
function UpdatePassCtrl($state, Account) {
    var vm = this;
    vm.updatePassword = updatePassword;
    /**
     * Update password when user is logged in
     */
    function updatePassword() {
        if (vm.form.$valid) {
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
}

angular
    .module("auth")
    .controller("UpdatePassCtrl", UpdatePassCtrl);

