const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb://server:coronababy2020@ds159546.mlab.com:59546/corona-babies";

var exports = {}

var MongoDB;

exports.getClient = async () => {
    return new Promise((resolve, reject) => {
        if(!MongoDB) {
            new MongoClient.connect(uri, {
                poolSize : 15
            }).then((db,err) => {
                if(err) {
                    reject(err)
                }
                
                MongoDB = db;
                resolve(MongoDB);
            });
        }
        else {
            resolve(MongoDB);
        }
        
    })
    

    return newClient;
}

exports.closeClient = (client) => {
    client.close();
}

exports.getMongoObjectId = (id) => {
    if(!ObjectId.isValid(id)) {
        return null
    }
    else {
        return ObjectId(id);
    }
}

// Find only one document in a collection specified
exports.findOne = (collection, filter, client) => {
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

exports.findMany = (collection, filter, client) => {
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

exports.findOneAndUpdate = (collection, filter, newValues, client) => {
    return new Promise((resolve, reject) => {
        client.db().collection(collection).findOneAndUpdate(filter, { "$set": newValues }, (err,obj) => {
            if (err) reject(err);
            else if (obj.value == null) {
                reject(collection + " not found")
            }

            resolve(obj)
        });
    })
}

module.exports = exports;