/**
 * Page title.
 *
 * @returns {{title: title}}
 * @constructor
 */
function updateTitle($rootScope, $timeout) {
  return {
    link: function (scope, element) {
      
      var listener = function (event, toState) {
        
        var title = 'Book Shop';
        if (toState.data && toState.data.pageTitle) {
          title = toState.data.pageTitle;
        }
        
        $timeout(function () {
          element.text(title);
        }, 0, false);
      };
      
      $rootScope.$on('$stateChangeSuccess', listener);
    }
  };
}

angular
  .module("app")
  .directive("updateTitle", updateTitle);
