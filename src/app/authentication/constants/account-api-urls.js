var ACCOUNT_API_URLS = {
  editAccount: "account/edit",
  accountResetPassword: "account/reset-password",
  accountForgotPassword: "account/forgot-password",
  accountEditChangePassword: "account/edit/change-password",
  checkEmail: "checkEmail",
  newsletter: "newsletter"
};

angular
  .module("auth")
  .constant("ACCOUNT_API_URLS", ACCOUNT_API_URLS);
