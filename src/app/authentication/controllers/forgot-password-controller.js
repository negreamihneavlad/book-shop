/**
 * Forgot password
 *
 * @param Account
 * @param Page
 * @constructor
 * @ngInject
 */
function ForgotPassCtrl(Account,Page) {
    Page.setTitle('Book Shop-Forgot Password');
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
