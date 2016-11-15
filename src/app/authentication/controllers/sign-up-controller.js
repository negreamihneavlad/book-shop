function SignUpCtrl($state, Authentication, AuthGuard) {
    var vm = this;
    vm.credentials = {};

    vm.signUp = signUp;

    function signUp() {
        if (vm.sign.$valid) {
            Authentication.signUp(vm.credentials.email, vm.credentials.password);
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
            $state.go("home", {}, { reload: true });
        }
    }

}

angular
    .module("auth")
    .controller("SignUpCtrl", SignUpCtrl);
