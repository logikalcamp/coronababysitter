'use strict';

var {Roles} = require("../utils/enums");
const MongoDB = require("../database/DataBase")

var COLLECTION_NAME = "Sessions"

class SessionService {
  
  constructor(MongoClient) {
    this.MongoClient = MongoClient;
  }

    /**
   * Create a new session (from volunteer request usually)
   *
   * body Session  (optional)
   * no response value expected for this operation
   **/
  async createSession(body) {
    return new Promise((resolve, reject) => {
      // Check if a session with the same start time already exists for this doctor
      MongoDB.findOne(COLLECTION_NAME, {"doctor._id" : MongoDB.getMongoObjectId(body.doctor._id),
                                             startTime: body.startTime}, this.MongoClient).then((result) => {
        if(result) 
          reject("Session already exists");
        else {
          MongoDB.insertOne(COLLECTION_NAME,body, this.MongoClient).then(resolve, reject);
        }
      });
    });
  }


  /**
   * Get all sessions of a specified user (and role)
   *
   * body Body  (optional)
   * userId String 
   * returns List
   **/
  getAllSessionsByUser(body,userId) {
    var filter = null;

    if(body.role == Roles.volunteer) {
      filter = {"doctor._id" : MongoDB.getMongoObjectId(userId)}
    }
    else if (body.role == Roles.doctor) {
      filter = {$or: [{"filledBy._id" : MongoDB.getMongoObjectId(userId)}, 
                      {"requests": {"$elemMatch" : {_id : MongoDB.getMongoObjectId(userId)}}}]};
    }

    return MongoDB.findMany(COLLECTION_NAME, filter, this.MongoClient);
  }

  /**
   * Get all upcoming sessions of a specified volunteer
   * userId String 
   * returns List
   **/
  getAllUpcomingApprovedSessionsByVolunteer(userId) {
    return MongoDB.findMany(COLLECTION_NAME, {"filledBy._id" : MongoDB.getMongoObjectId(userId)}, this.MongoClient);
  }

  getAllUpcomingNotYetApprovedSessionsByVolunteer(userId) {
    var filter = {$and: [{"filledBy" : null}, 
    {"requests": {$elemMatch : {"_id" : MongoDB.getMongoObjectId(userId)}}}]};

    return MongoDB.findMany(COLLECTION_NAME, filter, this.MongoClient);
  
    //return MongoDB.findMany(COLLECTION_NAME, {"requests": {"$elemMatch" : {_id : MongoDB.getMongoObjectId(userId)}}}, this.MongoClient).then();
  }

  /**
   * Update a session
   *
   * body Session  (optional)
   * sessionId String 
   * no response value expected for this operation
   **/
  updateSession(body,sessionId) {
    return new Promise(function(resolve, reject) {
      resolve();
    });
  }
}

module.exports.SessionService = SessionService;



