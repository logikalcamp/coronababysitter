'use strict';

var utils = require('../utils/writer.js');
var {VolunteerService} = require('../service/VolunteerService');

module.exports.createVolunteer = function createVolunteer (req, res, next, body, volId) {
  req.VolunteerService.createVolunteer(body, volId)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      utils.writeJson(req,res, response);
    });
};

module.exports.getAllVolunteers = function getAllVolunteers (req, res, next) {
  req.VolunteerService.getAllVolunteers()
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      utils.writeJson(req,res, response);
    });
};

module.exports.getVolunteerById = function getVolunteerById (req, res, next, volId) {
  req.VolunteerService.getVolunteerById(volId)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      utils.writeJson(req,res, response);
    });
};

module.exports.registerVolunteer = function registerVolunteer (req, res, next, body) {
  req.VolunteerService.registerVolunteer(body)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      utils.writeJson(req,res, response);
    });
};
