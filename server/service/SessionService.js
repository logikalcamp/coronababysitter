'use strict';


/**
 * Create a new session (from volunteer request usually)
 *
 * body Session  (optional)
 * no response value expected for this operation
 **/
exports.createSession = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get all sessions of a specified user (and role)
 *
 * body Body  (optional)
 * userId String 
 * returns List
 **/
exports.getAllSessionsByUser = function(body,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "doctor" : {
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
  },
  "timeRequested" : "2000-01-23T04:56:07.000+00:00",
  "timeApproved" : "2000-01-23T04:56:07.000+00:00",
  "recurring" : "once",
  "startTime" : "2000-01-23T04:56:07.000+00:00",
  "id" : "id",
  "requests" : [ {
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
  "endTime" : "2000-01-23T04:56:07.000+00:00",
  "tasks" : [ {
    "taskName" : "taskName",
    "taskSelected" : true
  }, {
    "taskName" : "taskName",
    "taskSelected" : true
  } ],
  "didHappen" : true
}, {
  "doctor" : {
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
  },
  "timeRequested" : "2000-01-23T04:56:07.000+00:00",
  "timeApproved" : "2000-01-23T04:56:07.000+00:00",
  "recurring" : "once",
  "startTime" : "2000-01-23T04:56:07.000+00:00",
  "id" : "id",
  "requests" : [ {
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
  "endTime" : "2000-01-23T04:56:07.000+00:00",
  "tasks" : [ {
    "taskName" : "taskName",
    "taskSelected" : true
  }, {
    "taskName" : "taskName",
    "taskSelected" : true
  } ],
  "didHappen" : true
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a session
 *
 * body Session  (optional)
 * sessionId String 
 * no response value expected for this operation
 **/
exports.updateSession = function(body,sessionId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

