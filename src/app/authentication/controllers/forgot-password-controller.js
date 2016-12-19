/**
 * Forgot password
 *
 * @param Account
 * @constructor
 * @ngInject
 */
function ForgotPassCtrl(Account) {
    var vm = this;
    vm.credentials= {};
    vm.requestPasswordResetToken = requestPasswordResetToken;


    //////////////////////////////

    /**
     * Request password token reset
     */
    function requestPasswordResetToken(){
        if (vm.form.$valid){
            Account.requestPasswordResetToken(vm.credentials.email);
        }
    }
}

angular
    .module("auth")
    .controller("ForgotPassCtrl", ForgotPassCtrl);
