/**
 * Created by pooja on 29/2/16.
 */

angular.module('buzzAppApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      });

  }]);
