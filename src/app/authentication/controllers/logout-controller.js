function LogoutCtrl($state, Authentication) {
    var vm = this;

    vm.logout = logout;	

    function logout() {
        Authentication.logout();
        $state.go("/",{},{reload: true});
        

    }
    
}

angular
    .module("auth")
    .controller("LogoutCtrl", LogoutCtrl);