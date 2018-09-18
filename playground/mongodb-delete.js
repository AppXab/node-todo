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
    let r = await db.collection('inserts')

      // .deleteMany({ //here we can delete many records which have field completed is true
      //   a: 3
      // })

      // .deleteOne({//delete only one 
      //   completed: false
      // })

      // .findOneAndDelete({
      //   _id: new ObjectID('5b9ba674da13762980febb55')
      // })

      .then((result) => {
        console.log(result);
      })


    //console.log(r); //written all data inserted all fields with ids
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
})();