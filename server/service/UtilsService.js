'use strict';

const MongoDB = require("../database/DataBase")
const cheerio = require('cheerio')
const request = require('request')

class UtilsService {
  
  constructor(MongoClient) {
    this.MongoClient = MongoClient;
  };

  getFacebookPicture(body) {
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

  loginUser(body, session) {
    return new Promise((resolve, reject) => {
      var userSession = session.loginCodes[body.email];
      if (userSession) {
        var isValid = userSession == body.code

        // User is logged in, delete code from session.
        if (isValid) delete session.loginCodes[body.email];
        
        resolve({valid: isValid});
      } else {
        reject("No code available for this email.");
      }
    })
  }
}

module.exports.UtilsService = UtilsService