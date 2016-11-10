(function() {

    angular
        .module("auth")
        .controller("LogInCtrl", LogInCtrl);

    function LogInCtrl($state, Authentication, AuthGuard, Session) {

        var vm = this;
        vm.credentials = {};

        vm.login = login;
        vm.isActive = isActive;
        vm.ui = buildUI();

        vm.isAdmin = Authentication.isAdmin();



        vm.data = Session.getData();



        function login() {
            if (vm.log.$valid) {
                
                vm.ui.isSubmitting = true;
                vm.ui.showLoginError = false;


                Authentication.login(vm.credentials.email, vm.credentials.password)
                    .then(function() {
                        if (AuthGuard.hasBlockedTransition()) {
                            AuthGuard.allowBlockedTransition();
                        } else {
                           $state.go("/",{},{reload: true});
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

        function isActive() {
            return Authentication.isActive();
        }

    }




}());
