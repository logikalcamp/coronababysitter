'use strict';


const MongoDB = require("../database/DataBase")
const {EmailService} = require("./EmailService")
const {HamalService} = require("./HamalService");

const { getPagingDbData } = require('../utils/paging');

var COLLECTION_NAME = "Volunteers";

class VolunteerService {
  //COLLECTION_NAME = "Volunteers"
  constructor(MongoClient, _codeService) {
    this.MongoClient = MongoClient;
    this.codeService = _codeService
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
    return MongoDB.findMany(COLLECTION_NAME,{isApproved: false, isRejected: {$eq:null}}, this.MongoClient);
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
          if ((body.secretCode) && (body.secretCode.toLowerCase() == "fightcorona2020")) {
            delete body.secretCode;
            MongoDB.insertOne(COLLECTION_NAME,body, this.MongoClient).then((response, error) => {
              if (error) reject(error);
              var hamalService = new HamalService(this.MongoClient);
              hamalService.approveOrRejectUser({isApproved: true, hamalUserId: MongoDB.getMongoObjectId("5e887c4a77885033c8d53af5"), role: "volunteer"},
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

  loginEmailVolunteer(body, req) {
    return new Promise((resolve, reject) => {
      MongoDB.findOne(COLLECTION_NAME, { email: body.email }, this.MongoClient).then((result) => {
        if (result == null) reject("E-1");
        else if(!result.isApproved) reject ("E-2");
        else {
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

  countAllVolunteers() {
    return MongoDB.count(COLLECTION_NAME,{isApproved: true}, this.MongoClient);
  }

  countPendingVolunteers() {
    return MongoDB.count(COLLECTION_NAME,{isApproved: false, isRejected: {$eq:null}}, this.MongoClient);
  }
}

module.exports.VolunteerService = VolunteerService;
module.exports.VOL_COLLECTION_NAME = COLLECTION_NAME;
