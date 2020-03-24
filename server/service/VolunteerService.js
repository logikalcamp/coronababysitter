'use strict';

const MongoDB = require("../database/DataBase")

class VolunteerService {
  COLLECTION_NAME = "Volunteers"
  constructor(MongoClient) {
    this.MongoClient = MongoClient;
  }

  /**
 * Update the volunteer's information after he got approved
 *
 * body Volunteer  (optional)
 * volId Integer 
 * no response value expected for this operation
 **/
  createVolunteer(body,volId) {
    return new Promise(function(resolve, reject) {
      resolve();
    });
  }
  /**
   * Update the volunteer's information after he got approved
   *
   * body Volunteer  (optional)
   * volId Integer 
   * no response value expected for this operation
   **/
  createVolunteer(body,volId) {
    return new Promise(function(resolve, reject) {
      resolve();
    });
  }

  /**
   * Get all volunteers
   *
   * returns List
   **/
  getAllVolunteers() {
    return MongoDB.findMany(this.COLLECTION_NAME,{}, this.MongoClient);
  }

  /**
   * Get a single volunteer by Id
   *
   * volId String 
   * returns Volunteer
   **/
  getVolunteerById(volId) {
    return MongoDB.findByMongoId(this.COLLECTION_NAME,volId);
  }


  /**
   * Register a new volunteer
   *
   * body Volunteer  (optional)
   * no response value expected for this operation
   **/
  registerVolunteer(body) {
    return new Promise((resolve, reject) => {
      // Check if ID was already inserted
      MongoDB.findOne(this.COLLECTION_NAME, {tz : body.tz}, this.MongoClient).then((result) => {
        if(result) 
          reject("Volunteer already exists");
        else {
          MongoDB.insertOne(this.COLLECTION_NAME,body, this.MongoClient).then(resolve, reject);
        }
      });
    });
  }
}

module.exports.VolunteerService = VolunteerService;


