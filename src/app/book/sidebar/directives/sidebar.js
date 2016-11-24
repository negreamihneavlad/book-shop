/**
 *
 * @constructor
 */
function SidebarCtrl() {
    var vm = this;

    vm.categories = _.uniqBy(vm.books, 'category');
    vm.publishers = _.uniqBy(vm.books, 'publisher');
    vm.authors = _.uniqBy(vm.books, 'author');
}
/**
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
