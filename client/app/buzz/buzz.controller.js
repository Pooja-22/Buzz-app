/**
 * Created by pooja on 29/2/16.
 */
'use strict';
angular.module('buzzAppApp')
  .controller('BuzzCtrl', ['$scope', 'buzzService', 'Auth', function ($scope, buzzService, Auth, it, element) {

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
    $scope.type = '';
    $scope.postedText = '';
    $scope.showMoreBtn = false;
    $scope.showLessBtn = false;

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
     * Get list of buzz
     */

    $scope.getBuzz = function () {
      $scope.Buzz = buzzService.getBuzz();
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
     * Delete buzz only by owner of buzz
     * @param id
     */

    $scope.deleteBuzz = function (id) {
      buzzService.delete({buzzId: id}, function (err, data) {
        $scope.getBuzz();
      });
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
      $scope.updatePost.type = 'like';
      $scope.updatePost.UserId = $scope.getCurrentUserId;
      buzzService.update({buzzId: id}, $scope.updatePost, function (err, data) {
      });
      $scope.getBuzz();
    };

    /**
     * Dislikes functionality
     * @param dislikeById
     */

    $scope.countDislike = function (id) {
      $scope.updatePost.type = 'dislike';
      $scope.updatePost.UserId = $scope.getCurrentUserId;
      buzzService.update({buzzId: id}, $scope.updatePost, function (err, data) {
      });
      $scope.getBuzz();
    };

    /**
     * See more and less functionality
     */

    //$scope.buzzContentLimit = function (BuzzContent) {
    //  $scope.count = BuzzContent.length;
    //  if ($scope.count > 900) {
    //    $scope.showMoreBtn = true;
    //    return BuzzContent.slice(0, 700);
    //  }
    //  else {
    //    $scope.showMoreBtn =false;
    //    return BuzzContent ;
    //  }
    //};
    //
    //$scope.showWholeContent = function(BuzzContent){
    //  $scope.showLessBtn = true;
    //  $scope.showMoreBtn = false;
    //  return BuzzContent;
    //};
    //
    //$scope.showLessContent = function(BuzzContent){
    //  $scope.showLessBtn = false;
    //  $scope.showMoreBtn = true;
    //  return BuzzContent.slice(0, 900);
    //}

  }])
;


//$scope.buzzContentLimit = function (BuzzContent) {
//  $scope.content = BuzzContent;
//  $scope.count = BuzzContent.length;
//  if ($scope.count > 10) {
//    $scope.showMoreBtn = true;
//    return BuzzContent.slice(0, 3);
//  }
//  else {
//    $scope.showMoreBtn = false;
//    return BuzzContent;
//  }
//  $scope.showWholeContent = function () {
//    $scope.showLessBtn = true;
//    $scope.showMoreBtn = false;
//    $scope.buzzContentLimit();
//  }
//  $scope.showLessContent = function () {
//    $scope.showLessBtn = false;
//    $scope.showMoreBtn = true;
//    $scope.buzzContentLimit();
//  }
//};
