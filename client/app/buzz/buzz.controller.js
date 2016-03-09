/**
 * Created by pooja on 29/2/16.
 */

'use strict';

angular.module('buzzAppApp')

  .controller('BuzzCtrl', ['$scope', 'buzzService', 'Auth', '$state', '$window', '$timeout', function ($scope, buzzService, Auth, $state, $window, $timeout) {

    $scope.BuzzData = {};
    $scope.postText = "";
    $scope.updatePost = {
      updatedPostText: ''
    };
    $scope.Comment = {
      comment: ''
    };
    $scope.editCommentValue = {
      updatedComment: ''
    };
    $scope.showDivObj = {
      showDiv: false,
      showDivId: ''
    };
    $scope.showCommentEdit = {
      showDiv: false,
      showBuzzId: '',
      showCommentId: ''
    };
    $scope.likeValue = '';
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.type = '';
    $scope.postedText = '';
    $scope.showMoreBtn = false;
    $scope.showLessBtn = false;
    $scope.buzzType = 'Activity';
    $scope.fileValidity = true;
    $scope.params = $state.params;
    $scope.myFile = '';
    $scope.Buzz = [];
    var page = 0;
    var perPage = 10;
    $scope.loader = false;

    /**
     * modify to form data
     */

    var modifyToFormData = function (current_buzz) {
      var fd = new FormData();
      for (var key in current_buzz) {
        fd.append(key, current_buzz[key]);
      }
      return fd;
    };

    /***
     * Create and Save buzz
     */

    $scope.saveBuzz = function () {
      $scope.loader = true;
      $scope.BuzzData = {
        createdOn: Date.now(),
        buzzContent: $scope.postText,
        buzzType: $scope.buzzType
      };
      if ($scope.myFile) {
        $scope.BuzzData.file = $scope.myFile
      }
      var buzzData = modifyToFormData($scope.BuzzData);
      $timeout(function () {
        buzzService.saveBuzzData(buzzData, function (data) {
          $scope.postText = '';
          $scope.Buzz.unshift(data);
          $scope.loader = false;
        });
      }, 1000);
    };

    /**
     * Get list of buzz
     */

    $scope.getBuzz = function () {
      buzzService.getBuzzData({page: page, perPage: perPage}, function (data) {
        $scope.Buzz = $scope.Buzz.concat(data);
      })

    };

    /**
     * Update buzz
     * @param id
     */

    $scope.editBuzz = function (id, updatedValue, index) {
      $scope.updatePost.updatedPostText = updatedValue;
      buzzService.update({buzzId: id}, $scope.updatePost, function (data) {
        $scope.Buzz[index] = data;
        $scope.showDivObj.showDiv = false;
      });
    };

    /**
     * Show and hide edit box on click of edit button
     * @param id
     * @returns {{showDiv: boolean, showDivId: string}|*}
     */

    $scope.showEditDiv = function (id) {
      $scope.showDivObj.showDiv = true;
      $scope.showDivObj.showDivId = id;
      return $scope.showDivObj;
    };

    /**
     * Delete buzz only by owner of buzz
     * @param id
     */

    $scope.deleteBuzz = function (id, index) {
      buzzService.delete({buzzId: id}, function (data) {
        $scope.Buzz.splice(index, 1);
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

    $scope.countLike = function (id, index) {
      $scope.updatePost.type = 'like';
      $scope.updatePost.UserId = $scope.getCurrentUser()._id;
      buzzService.update({buzzId: id}, $scope.updatePost, function (data) {
        $scope.Buzz[index].dislikedBy = data.dislikedBy;
        $scope.Buzz[index].likedBy = data.likedBy;
        $scope.Buzz[index].likeFlag = data.likeFlag;
        $scope.Buzz[index].dislikeFlag = data.dislikeFlag;

      });
    };

    /**
     * Dislikes functionality
     * @param dislikeById
     */

    $scope.countDislike = function (id, index) {
      $scope.updatePost.type = 'dislike';
      $scope.updatePost.UserId = $scope.getCurrentUser()._id;
      buzzService.update({buzzId: id}, $scope.updatePost, function (data) {
        $scope.Buzz[index].dislikedBy = data.dislikedBy;
        $scope.Buzz[index].likedBy = data.likedBy;
        $scope.Buzz[index].likeFlag = data.likeFlag;
        $scope.Buzz[index].dislikeFlag = data.dislikeFlag;

      });
    };

    /**
     * Filter buzz by Lost N Found & Activity
     * @param type
     * @returns {boolean}
     */

    $scope.filterBuzzType = function () {
      return $scope.params.type;
    };

    /**
     * Comments functionality
     * @param id
     * @param commentText
     */

    $scope.buzzComment = function (id, commentText, index) {
      $scope.Comment.comment = commentText;
      $scope.Comment.UserId = $scope.getCurrentUser()._id;
      $scope.Comment.creationTime = Date.now();
      buzzService.update({buzzId: id}, $scope.Comment, function (data) {
        $scope.Buzz[index] = data;
      });
    };

    /**
     * Delete Comment
     */

    $scope.deleteComment = function (id, commentId, index, buzzIndex) {
      buzzService.delete({buzzId: id, commentId: commentId}, function (data) {
        $scope.Buzz[buzzIndex].comments.splice(index, 1);
      });
    };

    /**
     * Show comment edit Division
     * @param id
     * @param commentId
     * @returns {{showDiv: boolean, showBuzzId: string, showCommentId: string}|*}
     */

    $scope.showEditDivComment = function (id, commentId) {
      $scope.showCommentEdit.showDiv = true;
      $scope.showCommentEdit.showBuzzId = id;
      $scope.showCommentEdit.showCommentId = commentId;
      return $scope.showCommentEdit;
    };

    /**
     * Edit Comment
     */

    $scope.editComment = function (buzzId, commentId, updatedValue, index, buzzIndex) {
      $scope.editCommentValue.updatedComment = updatedValue;
      buzzService.update({buzzId: buzzId, commentId: commentId}, $scope.editCommentValue, function (data) {
        $scope.Buzz[buzzIndex].comments = data.comments;
        $scope.showCommentEdit.showDiv = false;
      });
    };

    /**
     * Show more
     */

    $scope.moreLess = function (data, limit) {
      var obj = {
        isShowMore: false,
        isShowLess: false,
        text: data
      };
      if (data.length > limit) {
        obj.isShowMore = true;
        obj.text = obj.text.substring(0, 400);
      }
      return obj;
    };

    /**
     *Get request when scrolled to bottom
     */

    angular.element($window).bind('scroll', function () {
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        page++;
        $scope.getBuzz();
      }
    })

    $scope.keyPressCreateComment = function(e,id, commentText, index){
      if(e==13){
        $scope.buzzComment(id, commentText, index);
      }
    }

    $scope.keyPressEditComment = function(e,buzzId, commentId, updatedValue, index, buzzIndex){
      if(e==13){
        $scope.editComment(buzzId, commentId, updatedValue, index, buzzIndex);
      }
    }

  }]);
