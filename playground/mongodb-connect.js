// const MongoClient = require('mongodb').MongoClient;

// //es-6 destructuring
// var user={name:'ab',age:55};
// var {name}=user;
// console.log(name); 
////lets  convert above const //generate obj ids
const {
  MongoClient,
  ObjectID
} = require('mongodb');
// var obj=new ObjectID();//it will generate an unique key each time we can use it as objectId
// console.log(obj);


const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

(async function () {
  let client;
  try {
    client = await MongoClient.connect(url);
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    // // Insert a single document
    // let r = await db.collection('inserts').insertOne({a:1});
    // assert.equal(1, r.insertedCount);

    // Insert multiple documents
    let r = await db.collection('Todo').insertMany([{ //here insert is a collection (tableName),and if we want to insert one record we can write insertOne
        text: 'complete the race',
        completed: false
      }, {
        text: 'complete the marathon',
        completed: false
      },
      {
        text: 'complete the painting',
        completed: false
      },
      {
        text: 'complete the cleaning',
        completed: true
      },
      {
        text: 'complete the washing',
        completed: true
      },
      {
        text: 'complete the launch',
        completed: true
      },
      //{
      //   a: 3
      // }, {
      //   a: 3
      // }, {
      //   a: 3
      // }
    ]);
    assert.equal(6, r.insertedCount);
    console.log(r); //written all data inserted all fields with ids
    console.log(r.ops[0]._id); //this will written only id of object inserted 1st 
    console.log(r.ops[0]._id.getTimestamp()); //written the time when record created 
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
})();