'use strict';


/**
 * Update the doctor's information after he got approved
 *
 * body Doctor  (optional)
 * docId String 
 * no response value expected for this operation
 **/
exports.createDoctor = function(body,docId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get all doctors
 *
 * returns List
 **/
exports.getAllDoctors = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "profession" : "profession",
  "address" : "address",
  "notes" : "notes",
  "phone" : "phone",
  "city" : "city",
  "hobbies" : "hobbies",
  "children" : [ {
    "isFemale" : true,
    "age" : 0
  }, {
    "isFemale" : true,
    "age" : 0
  } ],
  "tz" : "tz",
  "name" : "name",
  "institute" : "institute",
  "id" : "id",
  "email" : ""
}, {
  "profession" : "profession",
  "address" : "address",
  "notes" : "notes",
  "phone" : "phone",
  "city" : "city",
  "hobbies" : "hobbies",
  "children" : [ {
    "isFemale" : true,
    "age" : 0
  }, {
    "isFemale" : true,
    "age" : 0
  } ],
  "tz" : "tz",
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
 * Get a single doctor by Id
 *
 * docId Integer 
 * returns Doctor
 **/
exports.getDoctorById = function(docId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "profession" : "profession",
  "address" : "address",
  "notes" : "notes",
  "phone" : "phone",
  "city" : "city",
  "hobbies" : "hobbies",
  "children" : [ {
    "isFemale" : true,
    "age" : 0
  }, {
    "isFemale" : true,
    "age" : 0
  } ],
  "tz" : "tz",
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
 * Register a new doctor
 *
 * body Doctor  (optional)
 * no response value expected for this operation
 **/
exports.registerDoctor = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

