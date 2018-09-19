const expect = require('expect');
const request = require('supertest');

const {
  app
} = require('./../server');
const {
  Todo
} = require('./../models/todo');


const todos = [{
  text: 'test todo text'
}, {
  text: 'second test todo'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done());
});


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