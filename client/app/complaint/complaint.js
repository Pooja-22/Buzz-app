/**
 * Created by pooja on 10/3/16.
 */


angular.module('buzzAppApp')

  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider

    /**
     * Sub view ('Complaint) of profile page
     */

      .state('profile.complaint', {
        url: '/complaint',
        templateUrl: 'app/complaint/complaint.html',
        controller: 'ComplaintCtrl'
      });

  }]);

