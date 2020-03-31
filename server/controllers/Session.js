'use strict';

var utils = require('../utils/writer.js');
var Session = require('../service/SessionService');

module.exports.createSession = function createSession (req, res, next, body) {
  req.SessionService.createSession(body)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.getAllSessionsByUser = function getAllSessionsByUser (req, res, next, body, userId) {
  req.SessionService.getAllSessionsByUser(body, userId)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.getAllUpcomingNotYetApprovedSessionsByVolunteer = function getAllUpcomingNotYetApprovedSessionsByVolunteer (req, res, next, userId) {
  req.SessionService.getAllUpcomingNotYetApprovedSessionsByVolunteer(userId)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.getAllUpcomingApprovedSessionsByVolunteer = function getAllUpcomingApprovedSessionsByVolunteer (req, res, next, userId) {
  req.SessionService.getAllUpcomingApprovedSessionsByVolunteer(userId)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.getAvailableSessions = function getAvailableSessions (req, res, next, userId) {
  req.SessionService.getAvailableSessions(userId)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.updateSession = function updateSession (req, res, next, body, sessionId) {
  req.SessionService.updateSession(body, sessionId)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};
