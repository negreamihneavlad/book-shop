function MainCtrl($rootScope, $state, Authentication, Session, AUTH_EVENTS) {

    var vm = this;

    vm.logout = logout;
    vm.isLoggedIn = Authentication.isAuthenticated();
    vm.email = Session.get('email');

    $rootScope.$on(AUTH_EVENTS.loggedIn, function(event, data) {
        vm.isLoggedIn = true;
        vm.email = data.email;
        console.log(data);
    });
    $rootScope.$on(AUTH_EVENTS.loggedOut, function(event, data) {
        vm.isLoggedIn = false;
    });


    function logout() {
        Authentication.logout();
        $state.go("home", {}, { reload: true });
    }
}
angular
    .module('layout')
    .controller('MainCtrl', MainCtrl);
