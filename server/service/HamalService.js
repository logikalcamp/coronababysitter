'use strict';
const MongoDB = require("../database/DataBase")
const {EmailService} = require("./EmailService")

var COLLECTION_NAME = "HamalUsers"

class HamalService {  
  constructor(MongoClient) {
    this.MongoClient = MongoClient;
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

          if (body.role == "volunteer") {
            userCollection = "Volunteers";
          } else {
            userCollection = "Doctors";
          }

          // Update the user status, add the user to the hamal's user approved/rejected users lists
          MongoDB.findByMongoId(userCollection, userId, this.MongoClient).then((result) => {
            var user = result;
            var userCollectionLowerCase = userCollection.toLowerCase()
            MongoDB.findOneAndUpdate(userCollection, { '_id': MongoDB.getMongoObjectId(userId) }, { "$set": { "isApproved": body.isApproved }}, this.MongoClient)
            MongoDB.findOneAndUpdate(COLLECTION_NAME, { '_id': MongoDB.getMongoObjectId(hamalUser._id) }, { "$push": { userCollectionLowerCase: user }}, this.MongoClient)

            var emailInfo;
            var emailService = new EmailService();
            if (body.isApproved) {
              emailInfo = emailService.getApproveEmail("http://localhost:3001/" + userCollectionLowerCase + "/" + user._id);
            } else {
              emailInfo = emailService.getRejectEmail();
            }

            emailService.sendEmail(user.email, emailInfo);

          }).catch((error) => {
            reject(error)
          });

        }).catch((error) => {
          reject(error)
        });

        var isDoctor = true;
        var userCollection = ""



        // Checks whether its a doctor or a volunteer
        if (body.role == "volunteer") isDoctor = false;
        if (isDoctor) {
          //possible validation (not tested)  MongoDB.findOne("Doctors", {"doctor._id" : MongoDB.getMongoObjectId(body.userId)}, this.MongoClient).then((result) => {
          //    if(!result) reject("error : couldn't find doctor to update");
          userCollection = "Doctors";
          MongoDB.findOneAndUpdate(userCollection, { '_id': MongoDB.getMongoObjectId(userId)},{isApproved : body.isApproved},this.MongoClient);
        }
        else {
          userCollection = "Volunteers"
          MongoDB.findOneAndUpdate(userCollection, { '_id': MongoDB.getMongoObjectId(userId)},{isApproved : body.isApproved},this.MongoClient);
        }
        
        user = MongoDB.findByMongoId(userCollection, userId, this.MongoClient)
        

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
