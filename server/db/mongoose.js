var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//
// mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/myproject');

//for dynamic uri btn test or development and db local or server,this response will come from server js
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
  mongoose
};