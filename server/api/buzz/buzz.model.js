/**
 * Created by pooja on 29/2/16.
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BuzzSchema = new Schema({
  buzzContent: {type: String, required: true},   //buzz content
  // updatedPostText: {type: String}, // Edited Buzz content
  createdOn: {type: Date, default: Date.now()},
  //Posted time
  buzzType: {type: String, default: 'Activity'},
    //Buzz type
  postedBy: {
    type: mongoose.Schema.Types.ObjectId, //Reference of owner of buzz
    ref: 'User'
  },

  likedBy: [{
    postedBy: {
      type: mongoose.Schema.Types.ObjectId, //Reference of user who liked buzz
      ref: 'User'
    }

  }],

  dislikedBy: [{
    postedBy: {
      type: mongoose.Schema.Types.ObjectId, //Reference of user who liked buzz
      ref: 'User'
    }
  }],

  likeFlag: {type: Boolean, default: false},

  dislikeFlag: {type: Boolean, default: false},

  comments: [{
    postedBy: {
      type: mongoose.Schema.Types.ObjectId, //Reference of user who liked buzz
      ref: 'User'
    },
    commentText: {type: String, required: true}, //Comment Text
    createdOn: {type: Date} //Comment Creation time
  }],

  image: {
    path: {type: String},
    isPresent: {type: Boolean}
  }


});

module.exports = mongoose.model('Buzz', BuzzSchema);
