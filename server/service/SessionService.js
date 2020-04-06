'use strict';

const {VOL_COLLECTION_NAME} = require('./VolunteerService')
const {getTimeInIsrael} = require('../utils/dates');

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
      console.log(body)
        if(result) 
          reject("Session already exists");
        else {
          body.doctor_id = MongoDB.getMongoObjectId(body.doctor_id);

          if (body.filledBy)
            body.filledBy = MongoDB.getMongoObjectId(body.filledBy);

          for (var i=0; i < body.requests.length; i++)
            body.requests[i] = MongoDB.getMongoObjectId(body.requests[i]);

          if (body.timeApproved)
            body.timeApproved =getTimeInIsrael(body.timeApproved);
            
          body.timeRequested = getTimeInIsrael(body.timeRequested);
          body.startTime = getTimeInIsrael(body.startTime);
          body.endTime = getTimeInIsrael(body.endTime);
          
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
      var id = MongoDB.getMongoObjectId(userId);
      MongoDB.findOne("Volunteers", {"_id" : id}, this.MongoClient).then((result1) => {
        user = result1;
        var sessions = [];
        var aggregate = [];
        lookUpForSessions(aggregate);
        var filter = {$match : {filledBy: null, requests : {$nin : [id]}}};
        aggregate.push(filter);  
        MongoDB.findManyAggregate(COLLECTION_NAME, {aggregate: aggregate}, this.MongoClient).then((result2) => {
          sessions = result2;
          var available = [];
          console.log(sessions);
          sessions.forEach((element) => {
            if(element){
              console.log(Location.getDistance(user.pos.lat, user.pos.lng, element.doctor_o[0].pos.lat, element.doctor_o[0].pos.lng));

              console.log(user.pos.lat + "   "+ user.pos.lng + "    " + element.doctor_o[0].pos.lat +"   " + element.doctor_o[0].pos.lng);
              if(Location.getDistance(user.pos.lat, user.pos.lng, element.doctor_o[0].pos.lat, element.doctor_o[0].pos.lng) < X){
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

  addRequestToSession(sessionId, volunteerId) {
    return new Promise((resolve, reject) => {
      var sessionId_oi = MongoDB.getMongoObjectId(sessionId);
      var volunteerId_oi = MongoDB.getMongoObjectId(volunteerId);

      if(!sessionId_oi || !volunteerId_oi) reject ("Ids are not in correct format");
      console.log(sessionId_oi, volunteerId_oi);
      Promise.all([MongoDB.findOne(COLLECTION_NAME, {_id : sessionId_oi}, this.MongoClient), MongoDB.findOne(VOL_COLLECTION_NAME, {_id : volunteerId_oi}, this.MongoClient)]).then(results => {
        console.log(results)
        if(!results[0] || !results[1]) reject("Error")

        MongoDB.update(COLLECTION_NAME, {_id : sessionId_oi}, {
          $push : {requests : volunteerId_oi}
        }, this.MongoClient).then(resolve).catch(console.log)
      }).catch(reject);
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

  async approveSession(sessionId, volunteerId) {
    try {
        var results = await Promise.all([MongoDB.findOne(COLLECTION_NAME, {_id: MongoDB.getMongoObjectId(sessionId), requests: MongoDB.getMongoObjectId(volunteerId)}, this.MongoClient),
                MongoDB.findByMongoId(VOL_COLLECTION_NAME,volunteerId, this.MongoClient)]);

        if(results[0] && results[1]) {
          var session = results[0];

          var startDate = getTimeInIsrael(session.startTime);
          var endDate = getTimeInIsrael(session.endTime);

          startDate.setMinutes(startDate.getMinutes() - 30);
          endDate.setMinutes(endDate.getMinutes() + 30);

          var filter = {
            startTime : {
              $gte: startDate,
              $lte: endDate
            },
            _id:{$ne : MongoDB.getMongoObjectId(sessionId)}
          }

          var updateQuery = {
            $pull : { requests : MongoDB.getMongoObjectId(volunteerId)}
          }

          var removeVolunteerFromSessionsResult =
             await MongoDB.update(COLLECTION_NAME, filter, updateQuery, this.MongoClient);

          var setFilledByResult = 
            await MongoDB.findOneAndUpdate(COLLECTION_NAME, {_id:MongoDB.getMongoObjectId(sessionId)}, {filledBy:MongoDB.getMongoObjectId(volunteerId)}, this.MongoClient);

          return {approved:true}
        }
    }
    catch (error) {
      throw error;
    }
  }

  deleteSession(sessionId) {
    return MongoDB.deleteOne(COLLECTION_NAME,{_id:MongoDB.getMongoObjectId(sessionId)}, this.MongoClient);
  }
}

module.exports.SessionService = SessionService;



