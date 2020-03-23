'use strict';

var utils = require('../utils/writer.js');
var Session = require('../service/SessionService');

module.exports.createSession = function createSession (req, res, next, body) {
  Session.createSession(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllSessionsByUser = function getAllSessionsByUser (req, res, next, body, userId) {
  Session.getAllSessionsByUser(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateSession = function updateSession (req, res, next, body, sessionId) {
  Session.updateSession(body, sessionId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
