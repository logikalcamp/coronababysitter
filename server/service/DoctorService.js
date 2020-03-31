'use strict';

const MongoDB = require("../database/DataBase")
const {EmailService} = require("./EmailService")
const { getPagingDbData } = require('../utils/paging');

var COLLECTION_NAME = "Doctors";

class DoctorService {
  
  constructor(MongoClient) {
    this.MongoClient = MongoClient;
  };

  /**
   * Update the doctor's information after he got approved
   *
   * body Doctor  (optional)
   * docId String 
   * no response value expected for this operation
   **/
  createDoctor(body, docId) {
      return MongoDB.findOneAndUpdate(COLLECTION_NAME, { '_id': MongoDB.getMongoObjectId(docId) }, body, this.MongoClient);
  }


  /**
   * Get all doctors
   *
   * returns List
   **/
  getAllDoctors() {
    return MongoDB.findMany(COLLECTION_NAME, {}, this.MongoClient);
  }

  /**
   * Get all approved doctors
   *
   * returns List
   **/
  getApprovedDoctors(page) {
    var{from, to} = getPagingDbData(page, "doctors");

    return MongoDB.findMany(COLLECTION_NAME,{isApproved: true}, this.MongoClient,from,to);
  }

  /**
   * Get all pending doctors
   *
   * returns List
   **/
  getPendingDoctors(page) {
    var{from, to} = getPagingDbData(page, "doctors");

    return MongoDB.findMany(COLLECTION_NAME,{isApproved: false}, this.MongoClient,from,to);
  }

  /**
   * Get a single doctor by Id
   *
   * docId Integer 
   * returns Doctor
   **/
  getDoctorById(docId) {
    return MongoDB.findByMongoId(COLLECTION_NAME, docId, this.MongoClient);
  }


  /**
   * Register a new doctor
   *
   * body Doctor  (optional)
   * no response value expected for this operation
   **/
  registerDoctor(body) {
    return new Promise((resolve, reject) => {

      // Check if ID was already inserted
      MongoDB.findOne(COLLECTION_NAME, {tz : body.tz}, this.MongoClient).then((result) => {
        if(result) 
          reject("Doctor already exists");
        else {
          MongoDB.insertOne(COLLECTION_NAME,body, this.MongoClient).then(resolve, reject);
        }
      });
    });
  }

  loginEmailDoctor(body, session) {
    return new Promise((resolve, reject) => {
      MongoDB.findOne(COLLECTION_NAME, { email: body.email }, this.MongoClient).then((result) => {
        if (result == null) reject("Doctor not found.");
        else {
          var emailService = new EmailService();
          var loginCode = randomize('0', 6).toString(); // Generate a 6-digit code.
          emailService.sendEmail(result.email, emailService.getLoginEmail(loginCode));

          if (!session.loginCodes) {
            session.loginCodes = {}
          }

          session.loginCodes[body.email] = loginCode
          resolve("Login email sent.")
        }
      }).catch((error) => {
        reject(error)
      });
    });
  }
}

module.exports.DoctorService = DoctorService