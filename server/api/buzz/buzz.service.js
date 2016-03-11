/**
 * Created by pooja on 29/2/16.
 */

var Buzz = require('./buzz.model');
var _ = require('lodash');
var Cloudinary = require('../../components/cloudinary/cloudinary');
var fs = require('fs');


/**
 *Get list of all buzz
 * @param callback
 */

exports.find = function (page, perPage, criteria, callback) {
  var query = {};
  if (criteria != 'buzz') {
    query = {buzzType: criteria};
  }
  Buzz.find(query).skip(page * perPage).limit(perPage).sort({createdOn: -1}).populate('postedBy').populate('comments.postedBy').populate('likedBy.postedBy').populate('dislikedBy.postedBy').exec(function (err, buzz) {
    callback(err, buzz);
  });

};

/**
 *Create Buzz
 * @param data
 * @param callback
 */

exports.createBuzz = function (id, data, fileDetail, callback) {
  if (!fileDetail) {
    data.postedBy = id;
    delete data.file;
    Buzz.create(data, function (err, buzz) {
      if (err) {
        helper.error(err)
      } else {
        Buzz.findById(buzz._id).populate('postedBy').exec(function (err, buzzPopulated) {
          callback(err, buzzPopulated);
        })
      }
    })
  }
  else {
    Cloudinary.cloudinary(fileDetail, function (cloudData) {
      data.postedBy = id;
      data.image = {};
      data.image.path = cloudData.url;
      Buzz.create(data, function (err, buzz) {
        if (err) {
          helper.error(err)
        }
        else {
          Buzz.findById(buzz._id).populate('postedBy').exec(function (err, buzzPopulated) {
            fs.unlink(fileDetail.path);
            callback(err, buzzPopulated);
          })
        }
      })
    });
  }
};

/**
 *Delete Buzz
 * @param id
 * @param callback
 */

exports.deleteBuzz = function (id, commentId, callback) {
  Buzz.findById(id, function (err, buzz) {
    if (err) {
      callback(err);
    }
    else {
      if (id && commentId) {
        var commentIndex = _.findIndex(buzz.comments, function (Obj) {
          return Obj._id == commentId;
        });
        buzz.comments.splice(commentIndex, 1);
        buzz.save(function (err, data) {
          callback(err, data);
        });
      }
      else {
        buzz.remove(function (err, buzz) {
          callback(err, buzz);
        })
      }

    }
  })
};

/**
 * Update Buzz -- Edit post text, likes and dislikes
 * @param id
 * @param updatedBuzz
 * @param callback
 */

exports.editBuzz = function (id, commentId, updatedBuzz, callback) {
  Buzz.findById(id, function (err, buzz) {
    if (err) {
      callback(err);
    }
    else {
      /**
       * Updated Buzz Content
       */

      if (updatedBuzz.updatedPostText) {
        buzz.buzzContent = updatedBuzz.updatedPostText;
      }

      /**
       * like/dislike
       */

      var likeIndex = _.findIndex(buzz.likedBy, function (Obj) {
        return Obj.postedBy == updatedBuzz.UserId
      });
      var dislikeIndex = _.findIndex(buzz.dislikedBy, function (Obj) {
        return Obj.postedBy == updatedBuzz.UserId
      });

      function like() {

        if (likeIndex === -1) {
          buzz.likedBy.push({
            postedBy: updatedBuzz.UserId,
            likeFlag: true
          });
        }

        if (dislikeIndex != -1) {
          buzz.dislikedBy[dislikeIndex].dislikeFlag = false;
          buzz.dislikedBy.splice(dislikeIndex, 1);
        }

      }

      function dislike() {
        if (dislikeIndex === -1) {
          buzz.dislikedBy.push({
            postedBy: updatedBuzz.UserId,
            dislikeFlag: true
          });
        }

        if (likeIndex != -1) {
          buzz.likedBy[likeIndex].likeFlag = false;
          buzz.likedBy.splice(likeIndex, 1);
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

      /**
       * comments
       */

      if (updatedBuzz.comment) {
        buzz.comments.push({
          postedBy: updatedBuzz.UserId,
          commentText: updatedBuzz.comment,
          createdOn: updatedBuzz.creationTime
        });
      }

      /**
       * edit Comment
       */

      if (updatedBuzz.updatedComment) {
        var commentIndex = _.findIndex(buzz.comments, function (Obj) {
          return Obj._id == commentId;
        });
        if (commentIndex != -1) {
          buzz.comments[commentIndex].commentText = updatedBuzz.updatedComment;
        }
      }

    }

    buzz.save(function (err, buzz) {
      Buzz.findById(buzz._id).populate('postedBy').populate('comments.postedBy').populate('likedBy.postedBy').populate('dislikedBy.postedBy').exec(function (err, buzzPopulated) {
        callback(err, buzzPopulated);
      })
    })

  })
};





