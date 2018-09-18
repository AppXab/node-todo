const {
  MongoClient,
  ObjectID
} = require('mongodb');

const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

(async function () {
  let client;
  try {
    client = await MongoClient.connect(url);
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    //here in delete we can specify filter action
    let r = await db.collection('Users')

      .findOneAndUpdate({ //this will update  the name field of record of a given id 
        _id: new ObjectID('5b9ba7af11451b12fc8e3267'),
      }, {
        $set: {
          name: 'cc'
        },
        $inc: {//increment 
          age: 1
        }
      }, {
        returnOriginal: false //this will true by default , and returns  original data if it is true
      })

      .then((result) => {
        console.log(result);
      })


    //console.log(r); //written all data inserted all fields with ids
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
})();