function LogoutCtrl($state, Authentication) {
    var vm = this;

    vm.logout = logout;

    function logout() {
        Authentication.logout();
        $state.go("/");

    }
    
}

angular
    .module("auth")
    .controller("LogoutCtrl", LogoutCtrl);
