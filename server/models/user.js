var mongoose = require('mongoose');

var User = mongoose.model('User', {
  // email: {
  //   required: true,
  //   type: String,
  //   trim: true,
  //   minlength: 1
  // },
  name: {
    type: String,
  },
  age: {
    // required: true,
  },
  location: {
    // required: true,
  }
})

module.exports = {
  
  User
};