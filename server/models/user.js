var mongoose = require('mongoose');
var validator = require('validator');

var User = mongoose.model('User', {
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
  tokens:[{
    access:{type:String,required:true},
    token:{type:String,required:true}
  }],
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