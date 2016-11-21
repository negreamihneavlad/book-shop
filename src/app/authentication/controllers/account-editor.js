/**
 *
 * @param $state
 * @param Session
 * @param Account
 * @constructor
 */
function AccountEditorCtrl(Session, Account) {
    var vm = this;
    vm.data = Session.getData();

    vm.updateUser = updateUser;
    /**
     * Update user details
     */
    function updateUser() {
        if (vm.form.$valid) {
            Account.updateUser(vm.data)
                .then(function (response) {
                    Session.updateData(response);
                    vm.updateMessage = 'User details updated successfully!';
                    console.log('updated:', response);
                })
                .catch(function () {
                    vm.updateMessage = 'Failed to update user details!';
                });
        }
    }
}
angular
    .module("auth")
    .controller("AccountEditorCtrl", AccountEditorCtrl);
