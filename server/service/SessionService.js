'use strict';

var {Roles} = require("../utils/enums");
const MongoDB = require("../database/DataBase");
const Location = require("../utils/location");
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
   * Get all available sessions to volunteer, within X distance.
   * userId String 
   * returns List
   **/
  getAvailableSessions(userId) {
    return new Promise((resolve, reject) => {
      var X = 25;
      var user;
      console.log(userId);
      MongoDB.findOne("Volunteers", {"_id" : MongoDB.getMongoObjectId(userId)}, this.MongoClient).then((result1) => {
        user = result1;
        console.log(user);
        var sessions = [];
        MongoDB.findMany(COLLECTION_NAME, {}, this.MongoClient).then((result2) => {
          sessions = result2
          var available = [];
          sessions.forEach(element => {
            if(element){
              if(Location.getDistance(user.lat, user.long, element.doctor.lat, element.doctor.long) < 26){
                available.push(element);
              }
            }
          
          });
          resolve(available);
        });
    });
  });
  }

  /**
   * Get all upcoming sessions of a specified volunteer
   * userId String 
   * returns List
   **/
  getAllUpcomingApprovedSessionsByVolunteer(userId) {
    return MongoDB.findMany(COLLECTION_NAME, {"filledBy._id" : MongoDB.getMongoObjectId(userId)}, this.MongoClient);
  }

    /**
   * Get all upcoming, not yet approved sessions of a specified volunteer
   * userId String 
   * returns List
   **/
  getAllUpcomingNotYetApprovedSessionsByVolunteer(userId) {
    var filter = {$and: [{"filledBy" : null}, 
    {"requests": {$elemMatch : {"_id" : MongoDB.getMongoObjectId(userId)}}}]};

    return MongoDB.findMany(COLLECTION_NAME, filter, this.MongoClient);
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



