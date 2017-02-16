/**
 * Auth guard.
 *
 * @param $state
 * @param Authentication
 * @returns {{hasBlockedTransition: hasBlockedTransition, allowBlockedTransition: allowBlockedTransition, onStateChangeStart: onStateChangeStart}}
 * @constructor
 * @ngInject
 */
function AuthGuard($state, Authentication) {
  return {
    hasBlockedTransition: hasBlockedTransition,
    allowBlockedTransition: allowBlockedTransition,
    onStateChangeStart: onStateChangeStart
  };
  var blockedTransition;
  
  //////////////////////////////
  
  /**
   * Check whether the Auth guard blocked a transition.
   *
   * @returns {boolean}
   */
  function hasBlockedTransition() {
    return !!blockedTransition;
  }
  
  /**
   * Allow the blocked transition.
   */
  function allowBlockedTransition() {
    $state.go(blockedTransition.toState, blockedTransition.toParams);
    blockedTransition = null;
  }
  
  /**
   * Event handler for when a state change started.
   *
   * @param event
   * @param toState
   * @param toParams
   */
  function onStateChangeStart(event, toState, toParams) {
    if (toState.authGuard && !Authentication.isAuthenticated()) {
      event.preventDefault();
      
      blockedTransition = {
        toState: toState,
        toParams: toParams
      };
      
      $state.go("login", {}, {
        reload: true
      });
    }
  }
}

angular
  .module("auth")
  .service("AuthGuard", AuthGuard);