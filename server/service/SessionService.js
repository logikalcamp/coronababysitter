'use strict';

var getLookUp = function (tableFrom, local, foreign, as){
  return ({
    $lookup:{
    from: tableFrom,
    localField: local,
    foreignField: foreign,
    as: as
    }});
}

var {Roles} = require("../utils/enums");
const MongoDB = require("../database/DataBase");
const Location = require("../utils/location");
var COLLECTION_NAME = "Sessions_temp";

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
    var aggregate = [];

    if(body.role == Roles.doctor) {
        aggregate.push(getLookUp("Doctors_temp", "doctor", "_id", "doctor_o"));
        aggregate.push(getLookUp("Volunteers", "requests", "_id", "volunteers_array_o"));
        aggregate.push(getLookUp("Volunteers", "filledBy", "_id", "chosen_volunteer_o"));
        
        
        filter = {
          $match:{
            "doctor" : MongoDB.getMongoObjectId(userId)
          }};
          aggregate.push(filter);


    }
    else if (body.role == Roles.volunteer) {
      console.log("volun");
      aggregate.push(getLookUp("Volunteers", "requests", "_id", "volunteers_array_o"));
      aggregate.push(getLookUp("Doctors_temp", "doctor", "_id", "doctor_o"));
      aggregate.push(getLookUp("Volunteers", "filledBy", "_id", "chosen_volunteer_o"));

      filter = {$match:
        {$or: 
         [{"filledBy" : MongoDB.getMongoObjectId(userId)}, 
                     {"requests": {$in: [MongoDB.getMongoObjectId(userId)]
                     }}]}};
      aggregate.push(filter);
      }

    return MongoDB.findMany(COLLECTION_NAME, {aggregate : aggregate}, this.MongoClient);  }


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
    var filter = {$match : {$and: [{"filledBy" : null}, 
    {"requests": {$elemMatch : {"_id" : MongoDB.getMongoObjectId(userId)}}}]}};
    var aggregate = [];
    aggregate.push(getLookUp("Doctors_temp", "doctor", "_id", "doctor_o"));
    aggregate.push(getLookUp("Volunteers", "requests", "_id", "volunteers_array_o"));
    aggregate.push(getLookUp("Volunteers", "filledBy", "_id", "chosen_volunteer_o"));
    //aggregate.push(filter);

    return MongoDB.findMany(COLLECTION_NAME, {aggregate : aggregate}, this.MongoClient);
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



