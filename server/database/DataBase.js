const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb://server:coronababy2020@ds159546.mlab.com:59546/corona-babies";

var exports = {}

var MongoDB;

exports.initDataBase = async () => {
    return new Promise((resolve,reject) => {
        MongoClient.connect(uri, {
            poolSize: 10
        }).then((client,err) => {
            if(err) reject(err)

            resolve(client)
        })
    })
}

exports.getConnection = async () => {
    return new Promise((resolve, reject) => {
        new MongoClient.connect(uri, {
            poolSize : 10
        }).then((client,err) => {
            if(err) {
                reject(err)
            }
            resolve(client);
        });
    });
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
exports.findOne = (collection, filter, db) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).findOne(filter, (err,result) => {
            if(err) reject(err);

            resolve(result);
        });
    })
}


exports.findByMongoId = (collection, id, db) => {
    if(!ObjectId.isValid(id)) 
        return Promise.reject(new TypeError(`Invalid ID ${id}`))
    else {
        return exports.findOne(collection,{_id: ObjectId(id)}, db);
    }
}

exports.findMany = (collection, filter, db, from = 0, to = 0) => {
    return new Promise((resolve,reject) => {
        var query = db.collection(collection).find(filter).skip(from)
        
        if(to  > from) {
            query.limit(to - from);
        }
        
        query.toArray((err,result) => {
            if(err) reject(err);

            resolve(result);
        });
    });
}

exports.findManyAggregate = (collection, options = {}, db) => {
    return new Promise((resolve,reject) => {
        var query = {};

        try{
                if (options.aggregate){
                    query = db.collection(collection).aggregate(options.aggregate);
                }
                else {
                query = db.collection(collection).find(options.filter);
               }

            if(options.to  > options.from) {
                query.skip(options.from);
                query.limit(options.to - options.from);
            }
            
            query.toArray((err,result) => {
                if(err) reject(err);
    
                resolve(result);
            });
        } catch(err) {
            console.log(err)
        }
    });
}

exports.insertOne = (collection, object, db) => {
    return new Promise((resolve,reject) => {
        db.collection(collection).insertOne(object, (err,obj) => {
            if (err) reject(err);
    
            resolve(obj);
        });
    });
}

exports.findOneAndUpdate = (collection, filter, newValues, db) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).findOneAndUpdate(filter, { "$set": newValues }, (err,obj) => {
            if (err) reject(err);
            else if (obj.value == null) {
                reject(collection + " not found")
            }

            resolve(obj)
        });
    })
}

module.exports = exports;