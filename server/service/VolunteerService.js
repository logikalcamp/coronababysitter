'use strict';

const MongoDB = require("../database/DataBase")
const {EmailService} = require("./EmailService")

var COLLECTION_NAME = "Volunteers";

class VolunteerService {
  //COLLECTION_NAME = "Volunteers"
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
   * Get all volunteers
   *
   * returns List
   **/
  getAllVolunteers() {
    return MongoDB.findMany(COLLECTION_NAME,{}, this.MongoClient);
  }

  /**
   * Get a single volunteer by Id
   *
   * volId String 
   * returns Volunteer
   **/
  getVolunteerById(volId) {
    return MongoDB.findByMongoId(COLLECTION_NAME,volId);
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
      MongoDB.findOne(COLLECTION_NAME, {tz : body.tz}, this.MongoClient).then((result) => {
        if(result) 
          reject("Volunteer already exists");
        else {
          MongoDB.insertOne(COLLECTION_NAME,body, this.MongoClient).then(resolve, reject);
        }
      });
    });
  }

  loginEmailVolunteer(body) {
    return new Promise((resolve, reject) => {
      MongoDB.findOne(COLLECTION_NAME, { tz: body.volTz }, this.MongoClient).then((result) => {
        if (result == null) reject("Volunteer not found.");
        else {
          var emailService = new EmailService();
          emailService.sendEmail(result.email, {'title': body.emailTitle, 'body': body.emailBody });
          resolve("Login email sent.")
        }
      }).catch((error) => {
        reject(error)
      });
    });
  }
}

module.exports.VolunteerService = VolunteerService;


