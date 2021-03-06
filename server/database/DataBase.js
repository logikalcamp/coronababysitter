const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb://server:coronababy2020@ds159546.mlab.com:59546/corona-babies";
const {wasInLast24Hours} = require('../utils/dates');

var exports = {}
var backupConnectionData = undefined;

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

exports.update = (collection, filterQuery,updateQuery, db) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).update(filterQuery, updateQuery,{multi:true}, (err,obj) => {
            if (err) reject(err);

            resolve(obj)
        });
    })
}

exports.count = (collection, filter, db) => {
    return new Promise((resolve,reject) => {
        db.collection(collection).find(filter).count((err, result) => {
            if(err) reject(err)

            resolve({count: result});
        })
    });
}

exports.deleteOne = (collection, query, db) => {
    return new Promise((resolve,reject) => {
        db.collection(collection).deleteOne(query, (err, result) => {
            if(err) reject(err)

            resolve(result);
        })
    });
}

function saveCollectionToCsv(name) {

}

exports.getBackupData = async () => {
    const result = await exports.getConnection();

    backupConnectionData = {
        client: result,
        DB : result.db()
    }
    const sysData = await exports.findOne("SysData", {data:'server'}, backupConnectionData.DB);

    if(sysData.lastBackup && wasInLast24Hours(sysData.lastBackup)) return undefined;
    if(sysData.isBackingUp) return undefined;

    await exports.findOneAndUpdate("SysData",{data:'server'},{isBackingUp:true}, backupConnectionData.DB);

    const volunteers = await exports.findMany("Volunteers", {},backupConnectionData.DB);
    const docotrs = await exports.findMany("Doctors", {},backupConnectionData.DB);
    const sessions = await exports.findMany("Sessions", {},backupConnectionData.DB);
    const hamalUsers = await exports.findMany("HamalUsers", {},backupConnectionData.DB);

    const backupText = `<Volunteers>
                            ${JSON.stringify(volunteers)}
                        </Volunteers>
                        <Doctor>
                            ${JSON.stringify(docotrs)}
                        </Doctors>
                        <Sessions>
                            ${JSON.stringify(sessions)}
                        </Sessions>
                        <HamalUsers>
                            ${JSON.stringify(hamalUsers)}
                        </HamalUsers>`;

    return backupText;
}

exports.finishBackup = (date) => {
    return new Promise((resolve,reject) => {
        exports.findOneAndUpdate("SysData",{data:'server'},{lastBackup:date,isBackingUp:false}, backupConnectionData.DB).then(result => {
            backupConnectionData.client.close();
            resolve();
        })
    })
}

module.exports = exports;