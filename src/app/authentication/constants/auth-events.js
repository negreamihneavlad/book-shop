/**
 *
 * @type {{loggedIn: string, loggedOut: string, notAuthenticated: string, notAuthorized: string}}
 */
var AUTH_EVENTS = {
  loggedIn: "auth:loggedIn",	
  loggedOut: "auth:loggedOut",
  notAuthenticated: "auth:notAuthenticated",
  notAuthorized: "auth:notAuthorized"
};

angular
  .module("auth")
  .constant("AUTH_EVENTS", AUTH_EVENTS);