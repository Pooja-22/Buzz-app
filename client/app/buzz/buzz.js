/**
 * Created by pooja on 29/2/16.
 */
angular.module('buzzAppApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('profile.buzz', {
        url: '/buzz',
        templateUrl: 'app/buzz/buzz.html',
        controller: 'BuzzCtrl'
      });
  }]);
