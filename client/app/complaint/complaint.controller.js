/**
 * Created by pooja on 10/3/16.
 */

'use strict';

angular.module('buzzAppApp')

  .controller('ComplaintCtrl', ['$scope', 'complaintService', 'fileReader', '$state', 'Auth', function ($scope, complaintService, fileReader, $state, Auth) {

    /**
     * Check the role of the current user
     * @type {Function}
     */

    $scope.isAdmin = Auth.isAdmin;

    /**
     *Default state
     */

    $state.go('profile.complaint.fileComplaint');

  }]);


