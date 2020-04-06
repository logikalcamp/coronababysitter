'use strict';

var utils = require('../utils/writer.js');

module.exports.checkHamalPassword = function checkHamalPassword (req, res, next, body, userId) {
  req.HamalService.checkHamalPassword(body.pingval)
     .then(function (response) {
       utils.writeJson(req,res, response);
     })
     .catch(function (response) {
       // utils.writeJson(req,res, response);
       res.status(400).json({'message': response.toString()});
     });
 };

module.exports.approveOrRejectUser = function approveOrRejectUser (req, res, next, body, userId) {
 req.HamalService.approveOrRejectUser(body, userId)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.createHamalUser = function createHamalUser (req, res, next, body) {
  req.HamalService.createHamalUser(body)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.getAllHamalUsers = function getAllHamalUsers (req, res, next) {
  req.HamalService.getAllHamalUsers()
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};
