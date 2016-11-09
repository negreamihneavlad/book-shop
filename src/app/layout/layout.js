function config($stateProvider) {

    $stateProvider

    // App state
        .state({
            name: "app",
            abstract: true,
            templateUrl: "layout/templates/app.html"
        });
}

angular
    .module("layout", [])
    .config(config);
