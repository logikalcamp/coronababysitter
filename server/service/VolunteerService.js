'use strict';

const DB = require("../database/DataBase")

class VolunteerService {
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
    return DB.findMany("Volunteers",{}, this.MongoClient);
  }

  /**
   * Get a single volunteer by Id
   *
   * volId String 
   * returns Volunteer
   **/
  getVolunteerById(volId) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = {
    "birthday" : "2000-01-23T04:56:07.000+00:00",
    "profession" : "profession",
    "address" : "address",
    "notes" : "notes",
    "city" : "city",
    "tz" : "tz",
    "facebook" : "http://example.com/aeiou",
    "photo" : "photo",
    "phone" : "phone",
    "hobbies" : "hobbies",
    "name" : "name",
    "institute" : "institute",
    "id" : "id",
    "email" : ""
  };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }


  /**
   * Register a new volunteer
   *
   * body Volunteer  (optional)
   * no response value expected for this operation
   **/
  registerVolunteer(body) {
    return new Promise(function(resolve, reject) {
      resolve();
    });
  }
}

module.exports.VolunteerService = VolunteerService;


