/**
 * Created by pooja on 29/2/16.
 */

angular.module('buzzAppApp')

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider

    /**
     * State Profile
     */

      .state('profile', {
        url: '/profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl',
        params: {
          type: 'buzz'
        }
      });
  }]);
