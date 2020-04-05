'use strict';
const MongoDB = require("../database/DataBase")
const {EmailService} = require("./EmailService")

var COLLECTION_NAME = "HamalUsers"

class HamalService {  
  constructor(MongoClient) {
    this.MongoClient = MongoClient;
  }

  checkHamalPassword(password) {
    return Promise.resolve(password == 'חיבוק');
  }

  /**
   * Approve or reject a user (doctor / volunteer)
   * userId String 
   * no response value expected for this operation
   **/
  approveOrRejectUser(body,userId){
      return new Promise((resolve, reject) => {
        MongoDB.findByMongoId(COLLECTION_NAME, body.hamalUserId, this.MongoClient).then((result) => {
          var hamalUser = result;
          var userCollection = "";
          var userLink = '';

          if (body.role == "volunteer") {
            userCollection = "Volunteers";
            userLink = "https://sitterseeker.robins.app/login";
          } else {
            userCollection = "Doctors";
            userLink = "https://sitterseeker.robins.app/doctors/" + user._id;
          }

          // Update the user status, add the user to the hamal's user approved/rejected users lists
          MongoDB.findByMongoId(userCollection, userId, this.MongoClient).then((result) => {
            try {
              var user = result;
              var userCollectionLowerCase = userCollection.toLowerCase()
              if(body.isApproved) {
                MongoDB.findOneAndUpdate(userCollection, { '_id': MongoDB.getMongoObjectId(userId) }, { "isApproved": body.isApproved }, this.MongoClient)
              } else {
                MongoDB.findOneAndUpdate(userCollection, { '_id': MongoDB.getMongoObjectId(userId) }, { "isApproved": body.isApproved, "isRejected" : true }, this.MongoClient)
              }
              
              MongoDB.findOneAndUpdate(COLLECTION_NAME, { '_id': MongoDB.getMongoObjectId(hamalUser._id.toString()) }, { "$push": { userCollectionLowerCase: user }}, this.MongoClient)

              var emailInfo;
              var emailService = new EmailService();
              if (body.isApproved) {
                emailInfo = emailService.getApproveEmail(userLink, body.role);
              } else {
                emailInfo = emailService.getRejectEmail();
              }

              emailService.sendEmail(user.email, emailInfo);
              resolve("Email sent!");
            }
            catch (error) {
              reject(error);
            }
          }).catch((error) => {
            reject(error);
          });
        }).catch((error) => {
          reject(error);
        });
      });
    }
  
 
  /**
   * Create new hamal user.
   * Hamal users must have unique names.
   * no response value expected for this operation
   **/
  createHamalUser(body) {
    return new Promise((resolve, reject) => {
      // Check if we have a hamal user with this name
      MongoDB.findOne(COLLECTION_NAME, {name : body.name}, this.MongoClient).then((result) => {
        if(result) 
          reject("a user with that name already exists");
        else 
          MongoDB.insertOne(COLLECTION_NAME, body, this.MongoClient).then(resolve, reject);

      });
    });
  }
 
  /**
   * Get all hamal users
   *
   * returns List
   **/
  getAllHamalUsers(body) {
     return MongoDB.findMany(COLLECTION_NAME, {}, this.MongoClient);
    
  }
}

module.exports.HamalService = HamalService;
