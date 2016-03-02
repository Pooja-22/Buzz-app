/**
 * Created by pooja on 29/2/16.
 */
'use strict';
angular.module('buzzAppApp')
  .controller('BuzzCtrl', ['$scope', 'buzzService', 'Auth', function ($scope, buzzService, Auth) {

    $scope.BuzzData = {};
    $scope.updatePost = {
      updatedPostText: ''
    };
    $scope.updatePostText = '';
    $scope.showDivObj = {
      showDiv: false,
      showDivId: ''
    };
    $scope.likeValue = '';
    $scope.getCurrentUserId = Auth.getCurrentUser()._id;

    /***
     * Create and Save buzz
     */

    $scope.saveBuzz = function () {
      $scope.BuzzData = {
        createdOn: Date.now(),
        buzzContent: $scope.postText,
        buzzType: $scope.buzzType
      };
      buzzService.save($scope.BuzzData, function (err, data) {
        $scope.postText = '';
        $scope.getBuzz();
      });
    };

    /**
     * Show and hide edit box on click of edit button
     * @param id
     * @returns {{showDiv: boolean, showDivId: string}|*}
     */

    $scope.showEditDiv = function (id) {
      if ($scope.showDivObj.showDiv == true) {
        $scope.showDivObj.showDiv = false;
      }
      else {
        $scope.showDivObj.showDiv = true;
      }
      $scope.showDivObj.showDivId = id;
      return $scope.showDivObj;
    };

    /**
     * Update buzz
     * @param id
     */

    $scope.editBuzz = function (id, updatedValue) {
      $scope.updatePost.updatePostText = updatedValue;
      buzzService.update({buzzId: id}, $scope.updatePost, function (err, data) {
        $scope.getBuzz();
        $scope.showDivObj.showDiv = false;
      });
    };

    /**
     * Delete buzz only by owner of buzz
     * @param id
     */

    $scope.deleteBuzz = function (id) {
      buzzService.delete({buzzId: id}, function (err, data) {
        $scope.getBuzz();
      });
    };

    /**
     * Get list of buzz
     */

    $scope.getBuzz = function () {
      $scope.Buzz = buzzService.getBuzz();
    };

    /**
     * Show delete and edit button
     * @param id
     * @returns {boolean}
     */

    $scope.showBtn = function (id) {
      return id === Auth.getCurrentUser()._id;
    };

    /**
     * Likes functionality
     * @param likeById
     */

    $scope.countLike = function (id) {
      //if (Auth.getCurrentUser()._id == likeById) {
      //
      //}
      $scope.likeValue = 0;
      $scope.likeValue = $scope.likeValue + 1;
      $scope.saveLike = function () {
        $scope.updatePost.likedByUserId = $scope.getCurrentUserId;
        buzzService.update({buzzId: id}, $scope.updatePost, function (err, data) {
          $scope.getBuzz();
        });
      };
      $scope.saveLike();
    };

    /**
     * Dislikes functionality
     * @param dislikeById
     */

    $scope.countDislike = function (id) {
      $scope.dislikeValue = 0;
      $scope.dislikeValue = $scope.likeValue + 1;
      $scope.saveDislike = function () {
        $scope.updatePost.dislikedByUserId = $scope.getCurrentUserId;
        buzzService.update({buzzId: id}, $scope.updatePost, function (err, data) {
          $scope.getBuzz();
        });
      };
      $scope.saveDislike();
    };

  }])
;
