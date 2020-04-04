'use strict';

var utils = require('../utils/writer.js');
var {VolunteerService} = require('../service/VolunteerService');

module.exports.createVolunteer = function createVolunteer (req, res, next, body, volId) {
  req.VolunteerService.createVolunteer(body, volId)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.getAllVolunteers = function getAllVolunteers (req, res, next, page) {
  req.VolunteerService.getAllVolunteers(page)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.getApprovedVolunteers = function getApprovedVolunteers (req, res, next, page) {
  req.VolunteerService.getApprovedVolunteers(page)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.getPendingVolunteers = function getPendingVolunteers (req, res, next) {
  req.VolunteerService.getPendingVolunteers()
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.getVolunteerById = function getVolunteerById (req, res, next, volId) {
  req.VolunteerService.getVolunteerById(volId)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.registerVolunteer = function registerVolunteer (req, res, next, body) {
  req.VolunteerService.registerVolunteer(body)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.loginEmailVolunteer = function loginEmailVolunteer (req, res, next, body) {
  req.VolunteerService.loginEmailVolunteer(body)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      if(response == "E-1" || response == "E-2"){
        utils.writeJson(req,res, response);
      } 
      else {
        res.status(400).json({'message': response.toString()});
      }
    });
};

module.exports.countAllVolunteers = function countAllVolunteers (req, res, next, body) {
  req.VolunteerService.countAllVolunteers(body)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.countPendingVolunteers = function countPendingVolunteers (req, res, next, body) {
  req.VolunteerService.countPendingVolunteers(body)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};
