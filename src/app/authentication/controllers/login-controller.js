/**
 * Log in.
 *
 * @param $state
 * @param Authentication
 * @param AuthGuard
 * @param Cart
 * @param Session
 * @constructor
 * @ngInject
 */
function LogInCtrl($state, Authentication, AuthGuard, Cart) {
  var vm = this;
  vm.credentials = {};
  vm.login = login;
  vm.ui = buildUI();
  
  //////////////////////////////
  
  /**
   * Request login
   */
  function login() {
    if (vm.form.$invalid) {
      return;
    }
    
    vm.ui.isSubmitting = true;
    vm.ui.showLoginError = false;
    
    Authentication.login(vm.credentials.email, vm.credentials.password)
      .then(function () {
        if (AuthGuard.hasBlockedTransition()) {
          AuthGuard.allowBlockedTransition();
        } else {
          Cart.load();
          $state.go("home", {}, {reload: true});
        }
      })
      .catch(function () {
        vm.ui.showLoginError = true;
      })
      .finally(function () {
        vm.ui.isSubmitting = false;
      });
  }
  
  /**
   * Build UI.
   *
   * @returns {{isSubmitting: boolean, showLoginError: boolean}}
   */
  function buildUI() {
    return {
      isSubmitting: false,
      showLoginError: false
    };
  }
}

angular
  .module("auth")
  .controller("LogInCtrl", LogInCtrl);
