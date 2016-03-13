/**
 * Created by pooja on 29/2/16.
 */

'use strict';

angular.module('buzzAppApp')

  .controller('BuzzCtrl', ['$scope', 'buzzService', 'Auth', '$state', '$window', 'fileReader', '$document', function ($scope, buzzService, Auth, $state, $window, fileReader, $document) {

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
    $scope.file = '';
    $scope.Buzz = [];
    var page = 0;
    var perPage = 10;
    $scope.loader = false;
    $scope.loading = true;
    $scope.like = false;
    $scope.dislike = false;
    $scope.imageSrc = '';
    $scope.active = false;
    $scope.validate = false;

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
      if ($scope.file) {
        $scope.BuzzData.file = $scope.file;
      }
      var buzzData = modifyToFormData($scope.BuzzData);
      buzzService.saveBuzzData(buzzData, function (data) {
        $scope.postText = '';
        $scope.file = '';
        $scope.Buzz.unshift(data);
        $scope.loader = false;
      });
    };

    /**
     * Get list of buzz
     */

    $scope.getBuzz = function () {
      $scope.loading = true;
      var filter = {
        page: page,
        perPage: perPage,
        category: $scope.params.type
      };
      buzzService.getBuzzData(filter, function (data) {
        $scope.Buzz = $scope.Buzz.concat(data);
        $scope.Buzz.forEach(function (obj) {
          obj.likedBy.forEach(function (likes) {
            if (likes.postedBy._id == $scope.getCurrentUser()._id) {
              obj.like = true;
            }
          });
          obj.dislikedBy.forEach(function (dislikes) {
            if (dislikes.postedBy._id == $scope.getCurrentUser()._id) {
              obj.dislike = true;
            }
          })
        });
        $scope.loading = false;
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
        $scope.Buzz[index].like = true;
        $scope.Buzz[index].dislike = false;

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
        $scope.Buzz[index].dislike = true;
        $scope.Buzz[index].like = false;

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
    });

    /**
     * Save comment on Enter
     * @param e
     * @param id
     * @param commentText
     * @param index
     */

    $scope.keyPressCreateComment = function (e, id, commentText, index, value) {
      if (value&&e==13){
          $scope.buzzComment(id, commentText, index);
        }
      else if(e==13) {
        $scope.alert = true;
      }
    };

    /**
     * save edited  comment on enter
     * @param e
     * @param buzzId
     * @param commentId
     * @param updatedValue
     * @param index
     * @param buzzIndex
     */

    $scope.keyPressEditComment = function (e, buzzId, commentId, updatedValue, index, buzzIndex) {
      if (updatedValue && e == 13) {
        $scope.editComment(buzzId, commentId, updatedValue, index, buzzIndex);
      }
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

    /**
     *populate data in Dislike Modal
     */

    $scope.modalDislike = function (index) {
      $scope.dislikeUsers = $scope.Buzz[index].dislikedBy;
    };

    /**
     * populate Data in Like Modal
     * @param index
     */

    $scope.modalLike = function (index) {
      $scope.likeUsers = $scope.Buzz[index].likedBy;
    };

    /**
     *Show and hide comments
     */

    $scope.showHideComments = function (commentData, data, index) {
      if (commentData.length > 5 && index < commentData.length - 5) {
        $scope.active = false;
        return true;
      }
    }


  }]);
