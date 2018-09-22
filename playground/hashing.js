const {
  SHA256
} = require('crypto-js');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var password = 'abcd123';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log('hash : ' + hash);
  })
})


//to check above value with its hashed value
var hashedPassword = '$2a$10$7GFu9EJ61JLtLISrUtyEluWDQ0GK3RHgBEZ9/8CmlZQEMlBe8qdXa';


bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
})









// var data = {
//   id: 10
// };

// var token = jwt.sign(data, 'abcd123');
// console.log(token);

// //it will result eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTUzNzYwNDk4MH0.RKNszI_Sdds3mRTnDLmJj4RcFNiN0pu8b6ShNl29nb8
// //here 1st part is header ,2nd and 3rd are payload our info,last part is hash

// var decoded=jwt.verify(token,'abcd123');
// console.log('decoded',decoded);


// var message = 'i am number 4';
// var hash = SHA256(message).toString();

// console.log(`message : ${message}`);
// console.log(`hash : ${hash}`);

// var data = {
//   id: 4
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) +
//     'somesecret').toString()
// };
// var resultHash = SHA256(JSON.stringify(data) +
//   'somesecret').toString();


// // //to check following if else
// // token.data.id=5;
// // token.hash=SHA256(JSON.stringify(token.data)).toString

// if (resultHash === token.hash) {
//   console.log('data was not changed');
// } else {
//   console.log('data was changed');
// }