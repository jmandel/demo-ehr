angular.module('healthTiles', ['ngAnimate', 'ngRoute','ngSanitize'], function($routeProvider, $locationProvider){

  $routeProvider.when('/health-tiles-demo', {
    templateUrl: "templates/two-pane.html",
  });

  $routeProvider.when('/', {redirectTo:'health-tiles-demo'});

  $locationProvider.html5Mode(false);

});
