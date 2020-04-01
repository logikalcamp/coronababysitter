'use strict';

const randomize = require('randomatic');
const MongoDB = require("../database/DataBase")
const {EmailService} = require("./EmailService")

const { getPagingDbData } = require('../utils/paging');

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
  getAllVolunteers(page) {
    var{from, to} = getPagingDbData(page, "volunteers");

    return MongoDB.findMany(COLLECTION_NAME,{}, this.MongoClient,from.to);
  }

  /**
   * Get all volunteers
   *
   * returns List
   **/
  getApprovedVolunteers(page) {
    var{from, to} = getPagingDbData(page, "volunteers");

    return MongoDB.findMany(COLLECTION_NAME,{isApproved: true}, this.MongoClient,from,to);
  }

  /**
   * Get all volunteers
   *
   * returns List
   **/
  getPendingVolunteers() {
    return MongoDB.findMany(COLLECTION_NAME,{isApproved: false}, this.MongoClient);
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
      MongoDB.findOne(COLLECTION_NAME, {email : body.email}, this.MongoClient).then((result) => {
        if(result) 
          reject("Volunteer already exists");
        else {
          body.isApproved = false;
          MongoDB.insertOne(COLLECTION_NAME,body, this.MongoClient).then(resolve, reject);
        }
      });
    });
  }

  loginEmailVolunteer(body, req) {
    return new Promise((resolve, reject) => {
      MongoDB.findOne(COLLECTION_NAME, { email: body.email }, this.MongoClient).then((result) => {
        if (result == null) reject("Volunteer not found");
        else if(!result.isApproved) reject ("Volunteer was not approved yet");
        else {
          var emailService = new EmailService();
          var loginCode = randomize('0', 6).toString(); // Generate a 6-digit code.
          emailService.sendEmail(result.email, emailService.getLoginEmail(loginCode));

          if (!global.session.loginCodes) {
            global.session.loginCodes = {};
          }

          global.session.loginCodes[body.email] = loginCode;
          resolve("Login email sent.")
        }
      }).catch((error) => {
        console.log("Error " + error);
        reject(error);
      });
    });
  }

  countAllVolunteers() {
    return MongoDB.count(COLLECTION_NAME,{isApproved: true}, this.MongoClient);
  }

  countPendingVolunteers() {
    return MongoDB.count(COLLECTION_NAME,{isApproved: false}, this.MongoClient);
  }
}

module.exports.VolunteerService = VolunteerService;
