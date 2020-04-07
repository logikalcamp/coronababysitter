'use strict';

const randomize = require('randomatic');
const MongoDB = require("../database/DataBase");
const {EmailService} = require("./EmailService");
const { getPagingDbData } = require('../utils/paging');
const {HamalService} = require("./HamalService");

var COLLECTION_NAME = "Doctors";

class DoctorService {
  
  constructor(MongoClient, _codeService) {
    this.MongoClient = MongoClient;
    this.codeService = _codeService;
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
  getApprovedDoctors(page, options) {
    var{from, to} = getPagingDbData(page, "doctors");

    const applyOptions = options.search || options.orderBy;

    var query = {}
    var filter = {
      isApproved: true,
      address : {$exists:true}
    };

    if(applyOptions) {
      query.$query = filter;
    }
    else {
      query = filter;
    }
      

      if(options.search) {
        query.$query.$or = [{firstName : {$regex:`.*${options.search}.*`}},{lastName : {$regex:`.*${options.search}.*`}},{address : {$regex:`.*${options.search}.*`}}];
      }

      if(options.orderBy) {
        query.$orderBy = {}
        query.$orderBy[options.orderBy.column] = options.orderBy.desc ? -1 : 1;
      }
      console.log(query);
      return MongoDB.findMany(COLLECTION_NAME,query, this.MongoClient,from,to);
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
            delete body.secretCode;
            MongoDB.insertOne(COLLECTION_NAME,body, this.MongoClient).then((response, error) => {
              if (error) reject(error);
              var hamalService = new HamalService(this.MongoClient);
              hamalService.approveOrRejectUser({isApproved: true, hamalUserId: MongoDB.getMongoObjectId("5e887c4a77885033c8d53af5"), role: "doctor"},
                                               response.insertedId).then(resolve, reject);
            });
          } else {
            body.isApproved = false;
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
        else if(!result.address) reject ("E-3"); // Doctor hasnt finished process
        else {
          if(result.email == "testmailvolunteer@mail.com") resolve("Test email user");

          this.codeService.getNewCode(result.email).then(loginCode => {
            var emailService = new EmailService();
          
            emailService.sendEmail(result.email, emailService.getLoginEmail(loginCode));
            resolve("Login email sent.")
          }).catch((error) => {
            reject(error)
          });
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