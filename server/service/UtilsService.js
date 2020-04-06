'use strict';

const MongoDB = require("../database/DataBase")
const cheerio = require('cheerio')
const request = require('request')

class UtilsService {
  
  constructor(MongoClient, _codeService) {
    this.MongoClient = MongoClient;
    this.codeService = _codeService;
  };

  getFacebookPicture(body) {
    console.log(body)
    return new Promise((resolve, reject) => {
      try {
        request(body.facebookURL, { headers: {'user-agent': 'curl/7.47.0', 'accept-language': 'en-US,en', 'accept': '/' } }, ((error, response, body) => {
            if (error) {
              console.log(error)
              throw (error);
            }
            if (response.statusCode === 200) {
              var $ = cheerio.load(body);
              let pictureURL = $('#fbTimelineHeadline .profilePicThumb img').attr('src');

              if (pictureURL) resolve({'pictureURL': pictureURL});
              else throw "Picture not found";
            }
        }));
      } catch (err) {
        reject(err)
      }
    });
  }

  loginUser(body) {
    return new Promise((resolve, reject) => {
      this.codeService.checkExistingCode(body.email, body.code).then(result => {
        if(body.email != 'testmailvolunteer@mail.com')
          this.codeService.deleteCode(body.email);

        if(!result.error) {
          MongoDB.findOne("Volunteers", { email: body.email }, this.MongoClient).then((volunteer) => {
            if (volunteer)
              
              resolve({valid: result.isValid, user: volunteer});
            else {
              MongoDB.findOne("Doctors", { email: body.email }, this.MongoClient).then((doctor) => {
                resolve({valid: result.isValid, user: doctor});
              }).catch((error) => {
                reject(error);
              });
            }
          }).catch((error) => {
            reject(error);
          });
        }
        else {
          reject(result.error)
        }
      })
    })
  }
}

module.exports.UtilsService = UtilsService