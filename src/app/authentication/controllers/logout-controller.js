/**
 * Log out.
 *
 * @param $state
 * @param Authentication
 * @constructor
 * @ngInject
 */
function LogoutCtrl($state, Authentication) {
  var vm = this;
  vm.logout = logout;
  
  //////////////////////////////
  
  /**
   * Log out user
   */
  function logout() {
    Authentication.logout();
    $state.go("home", {}, {reload: true});
  }
}

angular
  .module("auth")
  .controller("LogoutCtrl", LogoutCtrl);
