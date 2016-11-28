/**
 * Show only for admin
 *
 * @param $animate
 * @param Authentication
 * @returns {{transclude: string, priority: number, link: link}}
 * @ngInject
 */
function showOnlyForAdmins($animate, Authentication) {
    return {
        transclude: "element",
        priority: 600,
        link: function (scope, el, attr, ctrl, transclude) {
            if (Authentication.isAdmin()) {
                transclude(function (clone) {
                    $animate.enter(clone, el.parent(), el);
                });
            }
        }
    };
}

angular
    .module("auth")
    .directive("showOnlyForAdmins", showOnlyForAdmins);
