'use strict';

var utils = require('../utils/writer.js');
var Volunteer = require('../service/VolunteerService');

module.exports.createVolunteer = function createVolunteer (req, res, next, body, volId) {
  Volunteer.createVolunteer(body, volId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllVolunteers = function getAllVolunteers (req, res, next) {
  Volunteer.getAllVolunteers()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getVolunteerById = function getVolunteerById (req, res, next, volId) {
  Volunteer.getVolunteerById(volId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.registerVolunteer = function registerVolunteer (req, res, next, body) {
  Volunteer.registerVolunteer(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
