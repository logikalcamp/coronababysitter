var COLLECTION_NAME = "Codes";

const randomize = require('randomatic');
const MongoDB = require("../database/DataBase");

class CodeService {
  
  constructor(MongoClient) {
    this.MongoClient = MongoClient;
  };

  getNewCode(email) {
    var loginCode = randomize('0', 6).toString();
    
    if(email == 'testmailvolunteer@mail.com')
      return Promise.resolve("101010");
    
    return new Promise((resolve,reject) => {
      MongoDB.findOne(COLLECTION_NAME, {email: email},this.MongoClient).then(result => {

        if(result) {
          console.log(result)
          MongoDB.findOneAndUpdate(COLLECTION_NAME, {email:email}, {code:loginCode}, this.MongoClient).then(result => {
            resolve(loginCode);
          }).catch(reject);
        }
        else {
          MongoDB.insertOne(COLLECTION_NAME, {code: loginCode, email: email}, this.MongoClient).then(result => {
            resolve(loginCode);
          }).catch(reject);
        }
      }).catch(reject);
    })
  }

  checkExistingCode(email, code) {
    return new Promise((resolve,reject) => {
      if(email == 'testmailvolunteer@mail.com' && code == '101010') resolve({isValid:true,error:undefined}); // volunteer test user
      
        MongoDB.findOne(COLLECTION_NAME, {email}, this.MongoClient).then(result => {
            if(result) {
                resolve({
                    isValid : result.code == code,
                    error: undefined
                });
            }
            else {
                resolve({
                    isValid : false,
                    error: 'email was not found'
                });
            }
        }).catch(error => {
            reject(error)
        })
    })
  }

  deleteCode(email) {
    return MongoDB.deleteOne(COLLECTION_NAME, {email: email}, this.MongoClient);
  }
}

module.exports.CodeService = CodeService