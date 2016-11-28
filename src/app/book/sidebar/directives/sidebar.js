/**
 * Sidebar
 *
 * $stateParams
 * $state
 * @constructor
 */
function SidebarCtrl($stateParams, $state) {
    var vm = this;
    vm.removeFilter = removeFilter;

    vm.categories = _.uniqBy(vm.books, 'category');
    vm.publishers = _.uniqBy(vm.books, 'publisher');
    vm.authors = _.uniqBy(vm.books, 'author');
    vm.filters = $stateParams;
    /**
     * Remove filter
     *
     * @param filterName
     */
    function removeFilter(filterName) {
        console.log($stateParams);
        $stateParams = _.omit($stateParams,[filterName]);
        $state.go($state.current, $stateParams, {
            inherit: false
        });
    }
}
/**
 * Sidebar directive
 *
 * @returns {{scope: {books: string}, bindToController: boolean, controllerAs: string, controller: SidebarCtrl, templateUrl: string}}
 */
function sidebar() {
    return {
        scope: {
            books: "="
        },
        bindToController: true,
        controllerAs: "sidebar",
        controller: SidebarCtrl,
        templateUrl: "app/book/sidebar/templates/sidebar.html"
    };
}

angular
    .module("layout")
    .directive("sidebar", sidebar);
