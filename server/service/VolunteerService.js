'use strict';

const MongoDB = require("../database/DataBase")

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

    return MongoDB.findMany(COLLECTION_NAME,{}, this.MongoClient, from, to);
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
}

module.exports.VolunteerService = VolunteerService;


