angular.module("myApp", [])

var app = angular.module("myApp", ["ngRoute", 'firebase']);


app.config(function($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "home.html",
        })
        .when("/admin", {
            templateUrl: "admin.html",
        })
        .when("/viewing", {
            templateUrl: "viewing.html",
        })
        .when("/account", {
            templateUrl: "account.html",
        })
        .otherwise({
            redirectTo: '/account'
        });
});



