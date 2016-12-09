/**
 *
 * @param $rootScope
 * @param $state
 * @param Authentication
 * @param Session
 * @param AUTH_EVENTS
 * @param ACCOUNT_EVENTS
 * @constructor
 * @ngInject
 */
function MainCtrl($rootScope, $state, Authentication, Session, AUTH_EVENTS, ACCOUNT_EVENTS) {

    var vm = this;
    vm.logout = logout;
    vm.isLoggedIn = Authentication.isAuthenticated();
    vm.user = Session.getData();

    ////////////////////////

    activate();

    ////////////////////////

    /**
     * Activate
     */
    function activate() {
        $rootScope.$on(ACCOUNT_EVENTS.update, function (event, data) {
            vm.user.firstName = data.firstName;
            vm.user.lastName = data.lastName;
        });

        $rootScope.$on(AUTH_EVENTS.loggedOut, function (event, data) {
            vm.isLoggedIn = false;
        });
    }

    /**
     * User log out
     */
    function logout() {
        Authentication.logout();
        $state.go("home", {}, {reload: true});
    }
}
angular
    .module('layout')
    .controller('MainCtrl', MainCtrl);
