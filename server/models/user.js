const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');



var UserSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    trim: true,
    minlength: 1,
    unique: true,
    validator: validator.isEmail,
    message: '{value} is not a valid email'
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
  // name: {
  //   type: String,
  // },
  // age: {
  //   // required: true,
  // },
  // location: {
  //   // required: true,
  // }
});


//to shown only id and email in response instead of all confidential data
UserSchema.methods.toJSON=function(){
  var user=this;
  var userObject=user.toObject();

  return _.pick(userObject,['_id','email']);
}


//following will return all data in response bt we dont want to show all the confidential data ie password, auth token so we use above method
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, 'abcd123').toString();

  user.tokens.push({
    access,
    token
  });

  return user.save().then(() => {
    return token;
  });
};



var User = mongoose.model('User', UserSchema);

module.exports = {

  User
};