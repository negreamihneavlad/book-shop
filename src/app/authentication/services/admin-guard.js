function AdminGuard($state, Authentication) {
    return {
        onStateChangeStart: onStateChangeStart
    };

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
