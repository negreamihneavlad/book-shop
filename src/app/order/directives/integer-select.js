/**
 * Convert value to string and to int for select dropdown tag
 *
 * @returns {{require: string, link: link}}
 */
function integerSelect() {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function (val) {
        return parseInt(val, 10);
      });
      ngModel.$formatters.push(function (val) {
        return '' + val;
      });
    }
  };
}

angular
  .module('order')
  .directive('integerSelect', integerSelect);