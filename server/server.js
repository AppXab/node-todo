require('./config/config');

//library require
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {
  ObjectID
} = require('mongodb');

//local require
var {  mongoose} = require('./db/mongoose');
var {  Todo} = require('./models/todo');
var {  User} = require('./models/user');
var {authenticate}=require('../server/middleware/authenticate');


var app = express();
const port = process.env.PORT //|| 3000; //for deployment it uses avail port or port 3000

app.use(bodyParser.json());

app.post('/todos', (req, res) => { //todos is collection name
  //console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(404).send(e);

  });
});


app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    });
  }, (e) => {
    res.status(400).send(e);
  })

})

//api starts 
//GET/todos/151314(id)
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  Todo.findById(id).then((todo) => { //nothing is depend on this Users we can write any thing here
    if (!todo) {
      return res.status(400).send();
    }
    res.send({
      todo
    });
  }).catch((e) => {
    res.status(400).send();
  })
});


app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => { //nothing is depend on this Users we can write any thing here
    if (!todo) {
      return res.status(400).send();
    }
    res.send({
      todo
    });
  }).catch((e) => {
    res.status(400).send();
  })
});

//add patch to api to add this  update method
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {
    $set: body
  }, {
    new: true
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({
      todo
    });
  }).catch((e) => {
    res.status(404).send();
  })
})


//user
app.post('/User', (req, res) => { //User is collection name
  // console.log(req.body);
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then((user) => {
    // res.send(doc);
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/User', (req, res) => {
  User.find().then((user) => { //depends on this User.f
    res.send({
      user
    });
  }, (e) => {
    res.status(400).send(e);
  })
})



app.get('/User/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`started on port ${port}`)
})

module.exports = {
  app
};