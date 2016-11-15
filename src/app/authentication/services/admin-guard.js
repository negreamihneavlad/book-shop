/**
 *
 * @param $state
 * @param Authentication
 * @returns {{onStateChangeStart: onStateChangeStart}}
 * @constructor
 */
function AdminGuard($state, Authentication) {
    return {
        onStateChangeStart: onStateChangeStart
    };
    /**
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
