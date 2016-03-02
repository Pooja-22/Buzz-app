/**
 * Created by pooja on 29/2/16.
 */
'use strict';
angular.module('buzzAppApp')
  .controller('ProfileCtrl', ['$scope', 'Auth', '$location', '$state', function ($scope, Auth, $location, $state) {
    /**
     * Check if user is logged in
     * @type {Function}
     */

    $scope.isLoggedIn = Auth.isLoggedIn;

    /**
     * Control redirecting to any location if user is not logged in
     */

    if (!($scope.isLoggedIn())) {
      $location.path('/login');
    }
    else {
      $state.go('profile.buzz');
      $scope.getCurrentUser = Auth.getCurrentUser;
      $scope.logout = function () {
        Auth.logout();
        $location.path('/login');
      }
    }
    ;
  }]);
