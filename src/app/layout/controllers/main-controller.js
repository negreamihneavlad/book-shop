/**
 *
 * @param $rootScope
 * @param $state
 * @param Authentication
 * @param Session
 * @param AUTH_EVENTS
 * @param ACCOUNT_EVENTS
 * @param Account
 * @param getItems
 * @constructor
 * @ngInject
 */
function MainCtrl($rootScope, $state, Authentication, Account, Session, getItems, AUTH_EVENTS, ACCOUNT_EVENTS) {
  
  var vm = this;
  vm.logout = logout;
  vm.submitSearch = submitSearch;
  vm.subscribeEmail = subscribeEmail;
  vm.isLoggedIn = Authentication.isAuthenticated();
  vm.user = Session.getData();
  vm.numberOfItems = getItems.length;
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
  
  /**
   * Sign for newsletter
   */
  function subscribeEmail() {
    if (vm.subscribe.$valid) {
      Account.signNewsletter(vm.newsletterEmail);
    }
  }
  
  function submitSearch() {
    if (vm.form.$valid) {
      $state.go('searchBooks', {toFind: vm.toFind});
    }
  }
}
angular
  .module('layout')
  .controller('MainCtrl', MainCtrl);
