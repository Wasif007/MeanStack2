angular.module('loc8rApp', ['ngRoute']);

  function config ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/homeview.html',
        controller:'homeCtrl'
      })
      .otherwise({redirectTo: '/'});
  }

  angular
    .module('loc8rApp')
    .config(['$routeProvider', config]);