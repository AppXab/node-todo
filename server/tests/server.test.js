const expect = require('expect');
const request = require('supertest');
const {
  ObjectID
} = require('mongodb');

const {
  app
} = require('./../server');
const {
  Todo
} = require('./../models/todo');


//check parameters
const todos = [{
  _id: new ObjectID(),
  text: 'test todo text'
}, {
  _id: new ObjectID(),
  text: 'second test todo'
}];


beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done());
});

//for post req
describe('POST/todos', () => {
  it('should create new todo', (done) => {
    var text = "test todo text";
    request(app)
      .post('/todos')
      .send({
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text); //gives error if we added something in text as text+1
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(3);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      })
  });

  it('should not creat todo with invalid body data ', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2); //no of input as constant todo has two elements
          done();
        }).catch((e) => done(e));
      })
  })
})

//to check api,for get req
//to check this run 'npm run test-watch' 
describe('GET/todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  })
})

//for api test case,we pass id here as input
//to check this run 'npm run test-watch'
describe('GET/todos/:id', () => {
  it('should get  todos doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`) //backtick
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`) //backtick
      .expect(400)
      .end(done)

  });
  it('should return 400 for non object ids', (done) => {
    request(app)
      .get('/todos/123abc') //backtick
      .expect(400)
      .end(done)
  });


})


//api delete 
describe('DELETE/todos/:id', () => {
  it('should delete todo', (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`) //backtick
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexId).then((todos) => {
          expect(todos).toNotExist;
          done();
        }).catch((e) => done(e));
      });
  });
  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`) //backtick
      .expect(400)
      .end(done)

  });
  it('should return 400 for non object ids', (done) => {
    request(app)
      .get('/todos/123abc') //backtick
      .expect(400)
      .end(done)
  });

})