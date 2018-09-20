const {  ObjectID} = require('mongodb')

const {  mongoose} = require('./../server/db/mongoose');
// const {  Todo} = require('./../server/models/todo');
const {
  User
} = require('./../server/models/user');


var id = "5b9ba6d604071b09285d1cbb"; //5ba24c100d862c201407c71a-todo
if (!ObjectID.isValid(id)) {
  console.log('id is not valid');
}


//todo
// Todo.find({  _id: id}).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({//   _id: id// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   console.log('Todo', todo);
// })


//user

User.findById('5b9ba6d604071b09285d1cbb').then((Users) => {//nothing is depend on this Users we can write any thing here
  if (!Users) {
    return console.log("Unable to find user", Users);
  }
  console.log('Users', JSON.stringify(Users, undefined, 2), (e) => {
    console.log(e)
  });
})