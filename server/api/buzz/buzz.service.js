/**
 * Created by pooja on 29/2/16.
 */
var Buzz = require('./buzz.model');
var _ = require('lodash');

/**
 *Get list of all buzz
 * @param callback
 */
exports.find = function (callback) {
  Buzz.find({}).sort({createdOn: -1}).populate('postedBy').populate('likeBy').exec(function (err, buzz) {
    callback(err, buzz);
  })
};

/**
 *Create Buzz
 * @param data
 * @param callback
 */

exports.createBuzz = function (id, data, callback) {
  data.postedBy = id;
  Buzz.create(data, function (err, buzz) {
    callback(err, buzz);
  })
};

/**
 *Delete Buzz
 * @param id
 * @param callback
 */

exports.deleteBuzz = function (id, callback) {
  Buzz.findById(id, function (err, buzz) {
    if (err) {
      callback(err);
    }
    else {
      buzz.remove(function (err, buzz) {
        callback(err, buzz);
      })
    }
  })
};

/**
 * Update Buzz -- Edit post text, likes and dislikes
 * @param id
 * @param updatedBuzz
 * @param callback
 */

exports.editBuzz = function (id, updatedBuzz, callback) {
  Buzz.findById(id, function (err, buzz) {
    if (err) {
      callback(err);
    }
    else {
      if (updatedBuzz.updatePostText) {
        buzz.buzzContent = updatedBuzz.updatePostText;
      }

      var likeIndex = _.findIndex(buzz.likedBy, function (Obj) {
        return Obj.postedBy == updatedBuzz.UserId
      });
      var dislikeIndex = _.findIndex(buzz.dislikedBy, function (Obj) {
        return Obj.postedBy == updatedBuzz.UserId
      });

      function like() {

        if (likeIndex === -1) {
          buzz.likedBy.push({
            postedBy: updatedBuzz.UserId
          });
          buzz.likeFlag = true;
        }

        if (dislikeIndex != -1) {
          buzz.dislikedBy.splice(dislikeIndex, 1);
        }
        buzz.dislikeFlag = false;

      }

      function dislike() {
        if (dislikeIndex === -1) {
          buzz.dislikedBy.push({
            postedBy: updatedBuzz.UserId
          });
          buzz.dislikeFlag = true;
        }

        if (likeIndex != -1) {
          buzz.likedBy.splice(likeIndex, 1);
          buzz.likeFlag = false;
        }
      }

      switch (updatedBuzz.type) {

        case 'like' :
          like();
          break;

        case 'dislike' :
          dislike();
          break;
      }
    }

    buzz.save(function (err, data) {
      callback(err, data);
    })

  })
};



