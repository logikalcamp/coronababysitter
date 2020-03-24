const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb://server:coronababy2020@ds159546.mlab.com:59546/corona-babies";

var exports = {}

exports.getClient = async () => {
    newClient = new MongoClient(uri);

    await newClient.connect();

    return newClient;
}

exports.closeClient = (client) => {
    client.close();
}

// Find only one document in a collection specified
exports.findOne = (collection,filter, client) => {
    return new Promise((resolve, reject) => {
        client.db().collection(collection).findOne(filter, (err,result) => {
            if(err) reject(err);

            resolve(result);
        });
    })
}


exports.findByMongoId = (collection, id, client) => {
    if(!ObjectId.isValid(id)) 
        return Promise.reject(new TypeError(`Invalid ID ${id}`))
    else {
        return exports.findOne(collection,{_id: ObjectId(id)}, client);
    }
}

exports.findMany = (collection,filter, client) => {
    return new Promise((resolve,reject) => {
        client.db().collection(collection).find(filter).toArray((err,result) => {
            if(err) reject(err);

            resolve(result);
        });
    });
}

exports.insertOne = (collection, object, client) => {
    return new Promise((resolve,reject) => {
        client.db().collection(collection).insertOne(object, (err,obj) => {
            if (err) reject(err);
    
            resolve(obj);
        });
    });
}

module.exports = exports;