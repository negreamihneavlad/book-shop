var AUTH_EVENTS = {
  notAuthenticated: "auth:notAuthenticated",
  notAuthorized: "auth:notAuthorized"
};

angular
  .module("auth")
  .constant("AUTH_EVENTS", AUTH_EVENTS);