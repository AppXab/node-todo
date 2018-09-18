// var mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/myproject');

// var Todo = mongoose.model('Todo', { //specify fields of record and their datatype
//   text: {
//     type: String,
//     required: true, //validation required
//     trim: true, //ex '  hello  '  becomes 'hello'
//     minlength: 1, //req min length
//     unique: true
//   },
//   completed: {
//     type: Boolean
//   },
//   completedAt: {
//     type: Number,
//     min: [2, 'Too few nos'], //min no is 2 and max is 5 it gives declared error
//     max: [5, 'Too max bro'] //max no is 5
//   },
//   phone: {
//     type: String,
//     max: [10, 'no should be 10 digit'],
//     validate: {

//       validator: function (v) {
//         return /\d{10}/.test(v); //min 10 digit phone no
//         // /\d{3}-\d{3}-\d{4}/
//       },
//       message: props => `${props.value} is not a valid phone number!`
//     },
//     required: [true, 'User phone number required']
//   }
// })

// var newTodo = new Todo({ //assign values 
//   text: '   cook lunch   ',
//   completed: false,
//   completedAt: 2,
//   phone: '976643306511'
// });

// newTodo.save().then((doc) => { //save
//   console.log('saved todo ', doc);
// }, (e) => {

//   // var er = e.errors['completedAt'].message;
//   var ph = e.errors['phone'].message;

//   // console.log('unable to save :', e);

//   console.log('unable to save :', ph);

//   //console.log('unable to save :', er);


// }) //specify particular error