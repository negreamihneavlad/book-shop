/**
 *
 * @param $http
 * @param ACCOUNT_API_URLS
 * @returns {{canBeRegistered: canBeRegistered}}
 * @constructor
 */
function ExistingAccount($http, ACCOUNT_API_URLS) {
  return {
    canBeRegistered: canBeRegistered
  };
  
  /**
   * Verify whether an email can be registered.
   *
   * @param email
   * @returns {*}
   */
  function canBeRegistered(email) {
    return $http.get(URLTo.api(ACCOUNT_API_URLS.checkEmail), {
      params: {
        email: email
      }
    });
  }
}

angular
  .module("auth")
  .service("ExistingAccount", ExistingAccount);
