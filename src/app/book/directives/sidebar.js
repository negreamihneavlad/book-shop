/**
 * Sidebar
 *
 * @param $stateParams
 * @param $state
 * @constructor
 */
function SidebarCtrl($stateParams, $state) {
  var vm = this;
  vm.removeFilter = removeFilter;
  vm.filters = $stateParams;
  
  ////////////////////////////////
  
  /**
   * Remove filter
   *
   * @param filterName
   */
  function removeFilter(filterName) {
    $stateParams = _.omit($stateParams, [filterName]);
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
      categories: "=",
      publishers: "=",
      authors: "="
    },
    bindToController: true,
    controllerAs: "sidebar",
    controller: SidebarCtrl,
    templateUrl: "app/book/templates/sidebar.html"
  };
}

angular
  .module("bookShop")
  .directive("sidebar", sidebar);
