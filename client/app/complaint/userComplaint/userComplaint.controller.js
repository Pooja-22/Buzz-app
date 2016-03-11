/**
 * Created by pooja on 11/3/16.
 */
'use strict';

angular.module('buzzAppApp')

  .controller('UserComplaintCtrl', ['$scope', 'complaintService', 'Auth', function ($scope, complaintService, Auth) {

    $scope.updatedComplaint = {
      status: ""
    };
    $scope.getCurrentUser = Auth.getCurrentUser();
    $scope.cancelDisabled = false;

    /**
     * Get Complaints Data
     */

    $scope.getComplaint = function (id) {
      complaintService.getComplaintData({userId: id}, function (data) {
        $scope.complaint = data;
      });
    };

    /**
     * Pass complaint Detail to Modal
     */

    $scope.complaintDetail = function (index) {
      $scope.complaintDetails = $scope.complaint[index];
      $scope.complaintDetails.index = index;
    };

    /**
     * Cancel complaint by its owner
     */

    $scope.cancelComplaint = function (id, index) {
      $scope.updatedComplaint.status = 'Cancel';
      complaintService.update({complaintId: id}, $scope.updatedComplaint, function (data) {
        $scope.complaintDetails.cancelDisabled = true;
        $scope.complaint[index] = data;
      });
    };

    /**
     * Close complaint
     * @param id
     * @param index
     */

    $scope.closeComplaint = function (id, index) {
      $scope.updatedComplaint.status = 'Closed';
      complaintService.update({complaintId: id}, $scope.updatedComplaint, function (data) {
        $scope.complaint[index] = data;
      });
    };

    /**
     * ReOpen Complaint
     */

    $scope.reOpenComplaint = function(id,index){
      $scope.updatedComplaint.status = 'Re-Open';
      complaintService.update({complaintId: id}, $scope.updatedComplaint, function (data) {
        $scope.complaint[index] = data;
      });
    }

  }]);

