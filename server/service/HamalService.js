'use strict';


/**
 * Approve or reject a user (doctor / volunteer)
 *
 * body Body_1  (optional)
 * userId String 
 * no response value expected for this operation
 **/
exports.approveUser = function(body,userId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Create new hamal user
 *
 * body Hamal  (optional)
 * no response value expected for this operation
 **/
exports.createHamalUser = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get all hamal users
 *
 * returns List
 **/
exports.getAllHamalUsers = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "password" : "password",
  "volunteersApproved" : [ {
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
  } ],
  "tz" : "tz",
  "name" : "name",
  "id" : "id",
  "doctorsApproved" : [ {
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
  } ]
}, {
  "password" : "password",
  "volunteersApproved" : [ {
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
  } ],
  "tz" : "tz",
  "name" : "name",
  "id" : "id",
  "doctorsApproved" : [ {
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
  } ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

