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
    $scope.filterStatus = 'All';
    $scope.filterDepartment = 'All';

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
      $scope.updatedComplaint.log = {
        status: 'Cancel',
        changedAt: Date.now()
      };
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
      $scope.updatedComplaint.log = {
        status: 'Closed',
        changedAt: Date.now()
      };
      complaintService.update({complaintId: id}, $scope.updatedComplaint, function (data) {
        $scope.complaintDetails.closeDisabled = true;
        $scope.complaint[index] = data;
      });
    };

    /**
     * ReOpen Complaint
     */

    $scope.reOpenComplaint = function (id, index) {
      $scope.updatedComplaint.status = 'Re-Open';
      $scope.updatedComplaint.log = {
        status: 'Re-Open',
        changedAt: Date.now()
      };
      complaintService.update({complaintId: id}, $scope.updatedComplaint, function (data) {
        $scope.complaintDetails.resolveDisabled = true;
        $scope.complaintDetails.closeDisabled = true;

        $scope.complaint[index] = data;
      });
    }

  }]);

