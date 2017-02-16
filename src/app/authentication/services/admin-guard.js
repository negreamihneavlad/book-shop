/**
 * Admin guard.
 *
 * @param $state
 * @param Authentication
 * @returns {{onStateChangeStart: onStateChangeStart}}
 * @constructor
 * @ngInject
 */
function AdminGuard($state, Authentication) {
  return {
    onStateChangeStart: onStateChangeStart
  };
  
  //////////////////////////////
  
  /**
   * Checks if logged user is an Admin
   *
   * @param event
   * @param toState
   */
  function onStateChangeStart(event, toState) {
    if (toState.adminGuard && !Authentication.isAdmin()) {
      event.preventDefault();
      
      $state.go("login", {}, {
        reload: true
      });
    }
  }
}

angular
  .module("auth")
  .service("AdminGuard", AdminGuard);
