const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const config=require('./keys/config')
const dbName = config.database;
const client=new MongoClient(config.db_url)


// Find some documents
const getAll= ()=>{
    const db = client.db(dbName);
    const collection = db.collection(config.collection);
    collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs[0].a)
    })
}

client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    
//   // Insert some documents
//     collection.insertMany([
//     {a : 1}, {a : 2}, {a : 3}
//     ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 documents into the collection");
//     });

    getAll()
    client.close()
});