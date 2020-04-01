'use strict';

var getLookUp = (tableFrom, local, foreign, as) => {
  return ({
    $lookup:{
    from: tableFrom,
    localField: local,
    foreignField: foreign,
    as: as
    }});
}
var lookUpForSessions = (arr) => {
  arr.push(getLookUp("Doctors", "doctor_id", "_id", "doctor_o"));
  arr.push(getLookUp("Volunteers", "requests", "_id", "volunteers_array_o"));
  arr.push(getLookUp("Volunteers", "filledBy", "_id", "chosen_volunteer_o"));

}

var {Roles} = require("../utils/enums");
const MongoDB = require("../database/DataBase");
const Location = require("../utils/location");
var COLLECTION_NAME = "Sessions";

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
      MongoDB.findOne(COLLECTION_NAME, {"doctor._id" : MongoDB.getMongoObjectId(body.doctor_id),
                                             startTime: body.startTime}, this.MongoClient).then((result) => {
        if(result) 
          reject("Session already exists");
        else {
          body.doctor_id = MongoDB.getMongoObjectId(body.doctor_id);

          if (body.filledBy)
            body.filledBy = MongoDB.getMongoObjectId(body.filledBy);

          for (var i=0; i < body.requests.length; i++)
            body.requests[i] = MongoDB.getMongoObjectId(body.requests[i]);
          
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
        lookUpForSessions(aggregate);
        
        filter = {
          $match:{
            "doctor_id" : MongoDB.getMongoObjectId(userId)
          }};
          aggregate.push(filter);


    }
    else if (body.role == Roles.volunteer) {
      lookUpForSessions(aggregate);

      filter = {$match:
        {$or: 
         [{"filledBy" : MongoDB.getMongoObjectId(userId)}, 
                     {"requests": {$elemMatch: { $eq : MongoDB.getMongoObjectId(userId)}}}]}};
      aggregate.push(filter);
      }

    return MongoDB.findManyAggregate(COLLECTION_NAME, {aggregate : aggregate}, this.MongoClient);  }


  /**
   * Get all available sessions to volunteer, within X distance.
   * userId String 
   * returns List
   **/
  getAvailableSessions(userId) {
    return new Promise((resolve, reject) => {
      var X = 25;
      var user;
      MongoDB.findOne("Volunteers", {"_id" : MongoDB.getMongoObjectId(userId)}, this.MongoClient).then((result1) => {
        user = result1;
        var sessions = [];
        var aggregate = [];
        lookUpForSessions(aggregate);
        var filter = {$match : {filledBy: null}};
        aggregate.push(filter);  
        MongoDB.findManyAggregate(COLLECTION_NAME, {aggregate: aggregate}, this.MongoClient).then((result2) => {
          sessions = result2;
          var available = [];
        /*  sessions.forEach((element) => {
            if(element){
              console.log(element);
              console.log(user.lat + "   "+ user.lon + "    " + element.doctor_o.lat +"   " + element.doctor_o.long);
              if(Location.getDistance(user.lat, user.lon, (element.doctor_o).pop.lat, (element.doctor_o).pop.lon) < X){
                available.push(element);
              }
            }
          
          });
         */
         resolve(sessions);
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
    var aggregate = [];
    lookUpForSessions(aggregate);
    var filter = {$match: {
      "filledBy": MongoDB.getMongoObjectId(userId)
            }
    };
    aggregate.push(filter);
    return MongoDB.findManyAggregate(COLLECTION_NAME, {aggregate : aggregate}, this.MongoClient);
  }

    /**
   * Get all upcoming, not yet approved sessions of a specified volunteer
   * userId String 
   * returns List
   **/
  getAllUpcomingNotYetApprovedSessionsByVolunteer(userId) {
    var filter = {$match : {$and: [{"filledBy" : null}, 
    {"requests": {$elemMatch : { $eq : MongoDB.getMongoObjectId(userId)}}},
    {"startTime" : {$gte : new Date(new Date().setHours(0,0,0))}}]}};
    var aggregate = [];

    lookUpForSessions(aggregate);
    aggregate.push(filter);


    return MongoDB.findManyAggregate(COLLECTION_NAME, {aggregate : aggregate}, this.MongoClient);
  }

  getAllUpcomingNotYetApprovedSessions() {
    var filter = {$match : {$and: [{"filledBy" : null},
                                   {"startTime" : {$gte : new Date(new Date().setHours(0,0,0))}}]}};
    var aggregate = [];

    lookUpForSessions(aggregate);
    aggregate.push(filter);


    return MongoDB.findManyAggregate(COLLECTION_NAME, {aggregate : aggregate}, this.MongoClient);
  }

    /**
   * Get all upcoming, not yet approved sessions of a specified volunteer
   * userId String 
   * returns List
   **/
  countMatchedSessions(userId) {
    return MongoDB.count(COLLECTION_NAME, {filledBy:{$exists:true, $ne:null}}, this.MongoClient);
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

  getDoctorSessions(body, doctorId) {
    var isFilled = (body.isFilled) ? { "$ne": null } : null; // If user wants the filled sessions, get all not empty objects.
    var filter = {$match:
          {$and :[{"doctor_id": MongoDB.getMongoObjectId(doctorId)}, {"filledBy": isFilled }]}};
    var aggregate = [];
    lookUpForSessions(aggregate);
    aggregate.push(filter);
    return MongoDB.findManyAggregate(COLLECTION_NAME, {aggregate: aggregate}, this.MongoClient);
  }
}

module.exports.SessionService = SessionService;



