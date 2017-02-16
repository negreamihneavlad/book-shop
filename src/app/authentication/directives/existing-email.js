/**
 *
 * @param $element
 * @param $q
 * @param ExistingAccount
 * @constructor
 */
function ExistingEmailCtrl($element, $q, ExistingAccount) {
  var vm = this;
  var promises = {};
  var ngModel = $element.controller("ngModel");
  vm.spinner = false;
  
  //////////////////////////////
  
  activate();
  
  //////////////////////////////
  
  /**
   * Activate.
   */
  function activate() {
    ngModel.$asyncValidators.existingEmail = existingEmail;
  }
  
  /**
   * Check whether an email already exists.
   *
   * @param email
   */
  function existingEmail(email) {
    var deferred = $q.defer();
    vm.spinner = true;
    
    if (!promises[email]) {
      promises[email] = ExistingAccount.canBeRegistered(email);
    }
    
    promises[email].then(function (response) {
      if (response.data["email_exists"]) {
        deferred.reject();
        vm.spinner = false;
      } else {
        deferred.resolve();
        vm.spinner = false;
      }
    });
    
    return vm.spinner ? deferred.promise : deferred.resolve();
  }
}

/**
 * Existing customer email.
 *
 * @returns {{require: string, scope: {validate: string, onExistingCustomer: string, onNewCustomer: string}, bindToController: boolean, controllerAs: string, controller: ExistingEmailCtrl}}
 */
function existingEmail() {
  return {
    require: "ngModel",
    bindToController: true,
    controllerAs: "existingEmail",
    controller: ExistingEmailCtrl
  };
}

angular
  .module("auth")
  .directive("existingEmail", existingEmail);