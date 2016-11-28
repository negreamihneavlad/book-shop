/**
 * Sign up
 *
 * @param $state
 * @param Authentication
 * @param AuthGuard
 * @constructor
 * @ngInject
 */
function SignUpCtrl($state, Authentication, AuthGuard) {
    var vm = this;
    vm.credentials = {};
    vm.signUp = signUp;

    //////////////////////////////

    /**
     * Create a user account
     */
    function signUp() {
        if (vm.form.$invalid) {
            return;
        }
        Authentication.signUp(vm.credentials.firstName, vm.credentials.lastName, vm.credentials.email, vm.credentials.password)
            .then(loginAfterSingup)
            .catch(function () {
                vm.emailAlreadyRegistered = 'Email is already registered';
            });
        /**
         * Login after sign up
         *
         * @returns {*}
         */
        function loginAfterSingup() {
            return Authentication.login(vm.credentials.email, vm.credentials.password)
                .then(function () {
                    if (AuthGuard.hasBlockedTransition()) {
                        AuthGuard.allowBlockedTransition();
                    } else {
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
    }
}

angular
    .module("auth")
    .controller("SignUpCtrl", SignUpCtrl);
