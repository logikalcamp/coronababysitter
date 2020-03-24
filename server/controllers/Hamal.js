'use strict';

var utils = require('../utils/writer.js');
var Hamal = require('../service/HamalService');

module.exports.approveUser = function approveUser (req, res, next, body, userId) {
  Hamal.approveUser(body, userId)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      utils.writeJson(req,res, response);
    });
};

module.exports.createHamalUser = function createHamalUser (req, res, next, body) {
  Hamal.createHamalUser(body)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      utils.writeJson(req,res, response);
    });
};

module.exports.getAllHamalUsers = function getAllHamalUsers (req, res, next) {
  Hamal.getAllHamalUsers()
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      utils.writeJson(req,res, response);
    });
};
