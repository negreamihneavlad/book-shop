/**
 * Update password.
 *
 * @param $state
 * @param Account
 * @constructor
 * @ngInject
 */
function UpdatePassCtrl($state, Account) {
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
      })
      .catch(function () {
        vm.updateMessage = 'Old password does not match!';
      });
  }
}

angular
  .module("auth")
  .controller("UpdatePassCtrl", UpdatePassCtrl);

