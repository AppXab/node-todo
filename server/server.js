var express = require('express');
var bodyParser = require('body-parser');

const {
  ObjectID
} = require('mongodb');
var {
  mongoose
} = require('./db/mongoose');
var {
  Todo
} = require('./models/todo');
var {
  User
} = require('./models/user');


var app = express();
const port = process.env.PORT || 3000; //for deployment it uses avail port or port 3000

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









app.listen(port, () => {
  console.log(`started on port ${port}`)

})

module.exports = {
  app
};