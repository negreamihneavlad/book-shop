/**
 * Pagination controller.
 *
 * @param $state
 * @constructor
 * @ngInject
 */
function PaginationCtrl($state) {
  var vm = this;
  vm.totalPages = Math.ceil(vm.totalResults / vm.limitPerPage);
  vm.start = Math.max(1, vm.currentPage - vm.maxButtonNumber / 2);
  vm.end = Math.min(vm.totalPages, vm.start + vm.maxButtonNumber - 1);
  vm.start = Math.max(1, Math.min(vm.start, vm.end - vm.maxButtonNumber + 1));
  vm.items = _.range(vm.start, vm.end + 1);
  vm.generateHrefForPage = generateHrefForPage;
  
  //////////////////////////////
  
  /**
   * Generate href for a page.
   *
   * @param page
   * @returns {*}
   */
  function generateHrefForPage(page) {
    return $state.href(vm.state, {page: page});
  }
}

/**
 * Pagination.
 *
 * @returns {{templateUrl: string, replace: boolean, scope: {totalResults: string, currentPage: string, limitPerPage: string, maxButtonNumber: string, state: string, params: string}, bindToController: boolean, controller: PaginationCtrl, controllerAs: string}}
 */
function pagination() {
  return {
    templateUrl: "app/components/pagination/templates/pagination.html",
    replace: true,
    scope: {
      totalResults: "=",
      currentPage: "=",
      limitPerPage: "=",
      maxButtonNumber: "=",
      state: "=",
      params: "=?"
    },
    bindToController: true,
    controller: PaginationCtrl,
    controllerAs: "pagination"
  };
}

angular
  .module("bookShop")
  .directive("pagination", pagination);