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
      })

      .state('profile.complaint.fileComplaint', {
        url: '/fileComplaint',
        templateUrl: 'app/complaint/fileComplaint/fileComplaint.html',
        controller: 'FileComplaintCtrl'
      })

      .state('profile.complaint.user', {
        url: '/user',
        templateUrl: 'app/complaint/userComplaint/userComplaint.html',
        controller: 'UserComplaintCtrl'
      })

      .state('profile.complaint.admin', {
        url: '/admin',
        templateUrl: 'app/complaint/adminComplaint/adminComplaint.html',
        controller: 'AdminComplaintCtrl'
      })

  }]);

