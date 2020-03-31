'use strict';

var utils = require('../utils/writer.js');
var {UtilsService} = require('../service/UtilsService');

module.exports.getFacebookPicture = function getFacebookPicture (req, res, next, body) {
  req.UtilsService.getFacebookPicture(body)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.loginUser = function loginUser (req, res, next, body) {
  req.UtilsService.loginUser(body)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

