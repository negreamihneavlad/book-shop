/**
 * App controller.
 *
 * @param Page
 * @constructor
 * @ngInject
 */
function AppCtrl(Page) {
    var vm = this;

    vm.Page = Page;
}

angular
    .module("app")
    .controller("AppCtrl", AppCtrl);
