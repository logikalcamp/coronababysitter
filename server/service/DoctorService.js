'use strict';

const MongoDB = require("../database/DataBase")

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
      return MongoDB.findOneAndUpdate(this.COLLECTION_NAME, { '_id': MongoDB.getMongoObjectId(docId) }, body, this.MongoClient);
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
}

module.exports.DoctorService = DoctorService