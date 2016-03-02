/**
 * Created by pooja on 29/2/16.
 */

'use strict';

angular.module('buzzAppApp')
  .controller('LoginCtrl', ['$scope', '$window', '$location', '$state', function ($scope, $window, $location, $state) {

    /**
     * Redirect to /auth/google for authentication
     * @param provider
     */
    $scope.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };

    /**
     * Get current location and search for error code in params
     * @type {Object}
     */

    $scope.params = $location.search();
    console.log($scope.params);

    if ($scope.params.error_code == '1010') {
      $scope.error = 'Sorry you cannot login using this Email'
    }

    console.log("login loaded");
  }]);


