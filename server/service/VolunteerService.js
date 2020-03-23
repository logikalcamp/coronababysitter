'use strict';


/**
 * Update the volunteer's information after he got approved
 *
 * body Volunteer  (optional)
 * volId Integer 
 * no response value expected for this operation
 **/
exports.createVolunteer = function(body,volId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get all volunteers
 *
 * returns List
 **/
exports.getAllVolunteers = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "birthday" : "2000-01-23T04:56:07.000+00:00",
  "profession" : "profession",
  "address" : "address",
  "notes" : "notes",
  "city" : "city",
  "tz" : "tz",
  "facebook" : "http://example.com/aeiou",
  "photo" : "photo",
  "phone" : "phone",
  "hobbies" : "hobbies",
  "name" : "name",
  "institute" : "institute",
  "id" : "id",
  "email" : ""
}, {
  "birthday" : "2000-01-23T04:56:07.000+00:00",
  "profession" : "profession",
  "address" : "address",
  "notes" : "notes",
  "city" : "city",
  "tz" : "tz",
  "facebook" : "http://example.com/aeiou",
  "photo" : "photo",
  "phone" : "phone",
  "hobbies" : "hobbies",
  "name" : "name",
  "institute" : "institute",
  "id" : "id",
  "email" : ""
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a single volunteer by Id
 *
 * volId String 
 * returns Volunteer
 **/
exports.getVolunteerById = function(volId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "birthday" : "2000-01-23T04:56:07.000+00:00",
  "profession" : "profession",
  "address" : "address",
  "notes" : "notes",
  "city" : "city",
  "tz" : "tz",
  "facebook" : "http://example.com/aeiou",
  "photo" : "photo",
  "phone" : "phone",
  "hobbies" : "hobbies",
  "name" : "name",
  "institute" : "institute",
  "id" : "id",
  "email" : ""
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Register a new volunteer
 *
 * body Volunteer  (optional)
 * no response value expected for this operation
 **/
exports.registerVolunteer = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

