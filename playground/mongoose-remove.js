const {  ObjectID} = require('mongodb')

const {mongoose}= require('./../server/db/mongoose');
const {   Todo} = require('./../server/models/todo');
const {   User} = require('./../server/models/user');


// Todo.remove({}).then((result)=>{
//   console.log(result);
// })

Todo.findByIdAndRemove('5ba381bb4a276b9b634e3910').then((result)=>{
  console.log(result);
})
