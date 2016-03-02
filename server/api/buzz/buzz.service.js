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
  console.log(updatedBuzz);
  Buzz.findById(id, function (err, buzz) {
    if (err) {
      callback(err);
    }
    else {
      if (updatedBuzz.updatePostText) {
        buzz.buzzContent = updatedBuzz.updatePostText;
      }
      console.log("pppoja",updatedBuzz.dislikedByUserId,buzz.dislikedBy )
      console.log((_.findIndex(buzz.dislikedBy, {postedBy: updatedBuzz.dislikedByUserId})),'AASDFGBFDVCSXA')
        if(updatedBuzz.dislikedByUserId &&( _.findIndex(buzz.dislikedBy, {postedBy: updatedBuzz.dislikedByUserId}) === -1)){
          buzz.dislikedBy.push({
            postedBy: updatedBuzz.dislikedByUserId
          })
        }
      //if (updatedBuzz.likedByUserId && buzz.likedBy.length > 0) {
      //  buzz.likedBy.forEach(function (obj) {
      //    if (updatedBuzz.likedByUserId != obj.postedBy) {
      //      buzz.likedBy.push({
      //        postedBy: updatedBuzz.likedByUserId
      //      });
      //    }
      //  });
      //}
      //else if(updatedBuzz.likedByUserId){
      //  buzz.likedBy.push({
      //    postedBy: updatedBuzz.likedByUserId
      //  })
      //}
      //buzz.dislikedBy.forEach(function (obj) {
      //  if (updatedBuzz.dislikedByUserId != obj.postedBy) {
      //    buzz.dislikedBy.push({
      //      postedBy: updatedBuzz.dislikedByUserId
      //    });
      //  }
      //});
    }

    buzz.save(function (err, data) {
      callback(err, data);
    })

  })
};



