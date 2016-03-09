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
     * Get query string of  url
     * @type {Object}
     */

    $scope.params = $location.search();

    /**
     * Check of error code (Invalid email domain check)  in params
     */

    if ($scope.params.error_code == '1010') {
      $scope.error = 'Sorry you cannot login using this Email'
    }

  }]);


