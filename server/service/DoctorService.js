'use strict';

const randomize = require('randomatic');
const MongoDB = require("../database/DataBase");
const {EmailService} = require("./EmailService");
const { getPagingDbData } = require('../utils/paging');
const {HamalService} = require("./HamalService");

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
    return MongoDB.findMany(COLLECTION_NAME,{isApproved: false, isRejected: {$eq:null}}, this.MongoClient);
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
      MongoDB.findOne(COLLECTION_NAME, {email : body.email}, this.MongoClient).then((result) => {
        if(result) 
          reject("Doctor already exists");
        else {
          if ((body.secretCode) && (body.secretCode.toLowerCase() == "fightcorona2020")) {
            MongoDB.insertOne(COLLECTION_NAME,body, this.MongoClient).then((response, error) => {
              if (error) reject(error);
              var hamalService = new HamalService(this.MongoClient);
              hamalService.approveOrRejectUser({isApproved: true, hamalUserId: MongoDB.getMongoObjectId("5e887c4a77885033c8d53af5"), role: "doctor"},
                                               response.insertedId).then(resolve, reject);
            });
          } else {
            MongoDB.insertOne(COLLECTION_NAME,body, this.MongoClient).then(resolve, reject);
          }
        }
      });
    });
  }

  loginEmailDoctor(body) {
    return new Promise((resolve, reject) => {
      MongoDB.findOne(COLLECTION_NAME, { email: body.email }, this.MongoClient).then((result) => {
        if (result == null) reject("E-1"); // Doctor doesnt exist
        else if(!result.isApproved) reject ("E-2"); // Doctor not yet approved
        else if(!result.adress) reject ("E-3"); // Doctor hasnt finished process
        else {
          var emailService = new EmailService();
          var loginCode = randomize('0', 6).toString(); // Generate a 6-digit code.
          emailService.sendEmail(result.email, emailService.getLoginEmail(loginCode));

          if (!global.session.loginCodes) {
            global.session.loginCodes = {}
          }

          global.session.loginCodes[body.email] = loginCode
          resolve("Login email sent.")
        }
      }).catch((error) => {
        reject(error)
      });
    });
  }

  countAllDoctors() {
    return MongoDB.count(COLLECTION_NAME,{}, this.MongoClient);
  }
}

module.exports.DoctorService = DoctorService