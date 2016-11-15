function LogInCtrl($state, Authentication, AuthGuard, Session) {

    var vm = this;
    vm.credentials = {};

    vm.login = login;
    vm.ui = buildUI();

    function login() {
        if (vm.log.$valid) {

            vm.ui.isSubmitting = true;
            vm.ui.showLoginError = false;

            Authentication.login(vm.credentials.email, vm.credentials.password)
                .then(function() {
                    if (AuthGuard.hasBlockedTransition()) {
                        AuthGuard.allowBlockedTransition();
                    } else {
                        $state.go("home", {}, { reload: true });
                    }
                })
                .catch(function() {
                    vm.ui.showLoginError = true;
                })
                .finally(function() {
                    vm.ui.isSubmitting = false;
                });
        }
    }

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
