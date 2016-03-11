/**
 * Created by pooja on 11/3/16.
 */

'use strict';

angular.module('buzzAppApp')

  .controller('FileComplaintCtrl', ['$scope', 'complaintService', 'fileReader', function ($scope, complaintService, fileReader) {

    $scope.department = 'IT';
    $scope.complaintText = '';
    $scope.file = '';
    $scope.complaintData = {};
    $scope.loader = false;


    /**
     * Modify to Form Data
     * @param complaint
     * @returns {FormData}
     */

    var modifyToFormData = function (complaint) {
      var fd = new FormData();
      for (var key in complaint) {
        fd.append(key, complaint[key]);
      }
      return fd;
    };

    /**
     * Save Complaint
     */

    $scope.saveComplaint = function () {
      $scope.loader = true;
      $scope.complaintData = {
        createdOn: Date.now(),
        complaintText: $scope.complaintText,
        department: $scope.department
      };
      if ($scope.file) {
        $scope.complaintData.file = $scope.file;
      }
      var complaintData = modifyToFormData($scope.complaintData);
      complaintService.saveComplaintData(complaintData, function (data) {
        $scope.complaintText = '';
        $scope.file = '';
        $scope.department = 'IT';
        $scope.loader = false;
      })
    };

    /**
     * Image preview
     */

    $scope.getFile = function () {
      fileReader.readAsDataUrl($scope.file, $scope)
        .then(function (result) {
          $scope.imageSrc = result;
        });
    };


  }]);



