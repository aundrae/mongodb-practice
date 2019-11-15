const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const config=require('./keys/config')
const dbName = config.database;
const client=new MongoClient(config.db_url, { useUnifiedTopology: true })


// Find some documents
const getAll= ()=>{
    const db = client.db(dbName);
    const collection = db.collection(config.collection);
    collection.find({'_id':'apple'}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    })
}

const insertValue=()=>{
    const db = client.db(dbName);
    const collection = db.collection(config.collection);
    // Insert some documents
    collection.insertOne({'_id':'test1','a':8}, 
        function(err, result) {
            console.log("Inserted 3 documents into the collection");
        });
    
}

const updateValue=()=>{
    const db = client.db(dbName);
    const collection = db.collection(config.collection);
    collection.updateOne({'_id':'apple'},{$set:{'a':9}},
        function(result,err){
            console.log("Added")
    });
}
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    
    //const db = client.db(dbName);
    
    insertValue()
    getAll()

    updateValue()
    getAll()
    client.close()
});