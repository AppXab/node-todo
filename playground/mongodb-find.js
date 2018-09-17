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

     //here in find we can specify filter action
     let r = await db.collection('Users')
       //  .find()//this will find all the records

       .find({ //this will find record whose filed completed is true
         completed: true
       })

      //  .find({ //this will find record whose filed name is ab
      //    name: 'ab'
      //  })

       // .find({//this will find record whose id is 5b9f5152fbedfc1f28104f5e
       //    _id: new ObjectID('5b9f5152fbedfc1f28104f5e') 
       //  })

       //  .find().count().then((count) => {//here we find count of record stored , comment .toArray method
       //    console.log(`Todos count:${count}`)
       //  },

       .toArray().then((docs) => { //here we fetch data from collection "Users" in array form coz they are multiple
           console.log('Users'); //log fetched records 
           console.log(JSON.stringify(docs, undefined, 2)); //
         },

         (err) => {
           console.log('unable to fetch docs', err);
         })
     //console.log(r); //written all data inserted all fields with ids
   } catch (err) {
     console.log(err.stack);
   }
   client.close();
 })();









 //  MongoClient.connect('mongodb://localhost:27017/myproject', (err, db) => {
 //    if (err) {
 //      return console.log("unable to connect to server");
 //    }
 //    console.log("connected to server");
 //    db.collection('inserts').find().toArray().then((docs) => {
 //      console.log('inserts');
 //      console.log(JSON.stringify(docs, undefined, 2));
 //    }, (err) => {
 //      console.log('unable to fetch docs', err);
 //    })
 //  })