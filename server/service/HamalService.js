'use strict';
const MongoDB = require("../database/DataBase")
var COLLECTION_NAME = "HamalUsers"

class HamalService {  constructor(MongoClient) {
    this.MongoClient = MongoClient;
  }

  /**
   * Approve or reject a user (doctor / volunteer)
   * userId String 
   * no response value expected for this operation
   **/
  approveUser(body,userId){
      return new Promise((resolve, reject) => {

        var isDoctor = true;
        // Checks whether its a doctor or a volunteer
        if(body.role == "volunteer") isDoctor = false;
        if(isDoctor)
        //possible validation (not tested)  MongoDB.findOne("Doctors", {"doctor._id" : MongoDB.getMongoObjectId(body.userId)}, this.MongoClient).then((result) => {
        //    if(!result) reject("error : couldn't find doctor to update");
          MongoDB.findOneAndUpdate("Doctors", { '_id': MongoDB.getMongoObjectId(userId)},{isApproved : true},this.MongoClient).then(resolve, reject);
          
        else
          MongoDB.findOneAndUpdate("Volunteers", { '_id': MongoDB.getMongoObjectId(userId)},{isApproved : true},this.MongoClient).then(resolve, reject);
        });
        
    }
  
 
  /**
   * Create new hamal user.
   * Hamal users must have unique names.
   * no response value expected for this operation
   **/
  createHamalUser(body) {
    return new Promise((resolve, reject) => {
      // Check if we have a hamal user with this name
      MongoDB.findOne(COLLECTION_NAME, {name : body.name}, this.MongoClient).then((result) => {
        if(result) 
          reject("a user with that name already exists");
        else 
          MongoDB.insertOne(COLLECTION_NAME, body, this.MongoClient).then(resolve, reject);

      });
    });
  }
 
  /**
   * Get all hamal users
   *
   * returns List
   **/
  getAllHamalUsers(body) {
     return MongoDB.findMany(COLLECTION_NAME, {}, this.MongoClient);
    
  }
}

module.exports.HamalService = HamalService;
