/**
 *
 * @param $rootScope
 * @param $scope
 * @param $state
 * @param Authentication
 * @param Session
 * @param AUTH_EVENTS
 * @constructor
 */
function MainCtrl($rootScope, $scope, $state, Authentication, Session, AUTH_EVENTS) {

    var vm = this;
    var unregisterLoggedInHandler;

    vm.logout = logout;
    vm.isLoggedIn = Authentication.isAuthenticated();
    vm.email = Session.get('email');
    console.log('here');

    unregisterLoggedInHandler = $rootScope.$on(AUTH_EVENTS.loggedIn, function (event, data) {
        vm.isLoggedIn = true;
        vm.email = data.email;
        console.log(data);
    });

    $scope.$on("$destroy", destroy);

    $rootScope.$on(AUTH_EVENTS.loggedOut, function (event, data) {
        vm.isLoggedIn = false;
    });

    function destroy() {
        unregisterLoggedInHandler();
    }

    function logout() {
        Authentication.logout();
        $state.go("home", {}, {reload: true});
    }
}
angular
    .module('layout')
    .controller('MainCtrl', MainCtrl);
