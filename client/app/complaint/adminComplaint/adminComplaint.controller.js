/**
 * Created by pooja on 11/3/16.
 */

'use strict';

angular.module('buzzAppApp')

  .controller('AdminComplaintCtrl', ['$scope', 'complaintService', 'Auth', 'User', function ($scope, complaintService, Auth, User) {

    $scope.assignLoader = false;
    $scope.updatedComplaint = {
      status: ''
    };
    $scope.assignBtn = false;
    $scope.getCurrentUser = Auth.getCurrentUser();

    /**
     * Get Complaints Data
     */

    $scope.getComplaint = function () {
      complaintService.getComplaintData(function (data) {
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
     * Assign complaint
     */

    $scope.assignToMe = function (id, index) {
      $scope.assignLoader = true;
      $scope.updatedComplaint.status = 'In Progress';
      $scope.updatedComplaint.log = {
        status:'In Progress',
        changedAt :Date.now(),
        assignedTo :$scope.getCurrentUser._id
      };
      complaintService.update({complaintId: id}, $scope.updatedComplaint, function (data) {
        $scope.complaintDetails.assignToMeComplaint = true;
        $scope.complaint[index] = data;
        $scope.assignLoader = false;
        $scope.assignBtn = true;
      });
    };

    /**
     * Assign complaint to other Admin
     */

    $scope.assignTo = function (id,index,assignedToId) {
      $scope.updatedComplaint.status = 'In Progress';
      $scope.updatedComplaint.log = {
        status:'In Progress',
        changedAt :Date.now(),
        assignedTo :assignedToId
      };
      complaintService.update({complaintId: id}, $scope.updatedComplaint, function (data) {
        $scope.complaintDetails.assignToComplaint = true;
        $scope.complaint[index] = data;
      });
    };

    /**
     * Resolve complaint
     */

    $scope.resolveComplaint = function (id, index) {
      $scope.updatedComplaint.status = 'Resolved';
      $scope.updatedComplaint.log = {
        status:'Resolved',
        changedAt :Date.now(),
        assignedTo :$scope.getCurrentUser._id
      };
      console.log($scope.updatedComplaint);
      complaintService.update({complaintId: id}, $scope.updatedComplaint, function (data) {
        $scope.complaintDetails.resolveDisabled = true;
        $scope.complaint[index] = data;
      });
    };

    /**
     * Get list of Admins
     */

    $scope.getUsers = function () {
      User.getUsers(function (data) {
        $scope.admins = data;
      })
    };


  }]);


