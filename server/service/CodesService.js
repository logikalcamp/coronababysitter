var COLLECTION_NAME = "Codes";

const randomize = require('randomatic');
const MongoDB = require("../database/DataBase");

class CodeService {
  
  constructor(MongoClient) {
    this.MongoClient = MongoClient;
  };

  getNewCode(email) {
    var loginCode = randomize('0', 6).toString();
    return new Promise((resolve,reject) => {
        MongoDB.insertOne(COLLECTION_NAME, {code: loginCode, email: email}, this.MongoClient).then(result => {
            resolve(loginCode);
        }).catch(error => {
            reject(error);
        })
    })
  }

  checkExistingCode(email, code) {
    return new Promise((resolve,reject) => {
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