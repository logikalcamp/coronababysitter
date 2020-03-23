'use strict';

var utils = require('../utils/writer.js');
var Doctor = require('../service/DoctorService');

module.exports.createDoctor = function createDoctor (req, res, next, body, docId) {
  Doctor.createDoctor(body, docId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllDoctors = function getAllDoctors (req, res, next) {
  Doctor.getAllDoctors()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getDoctorById = function getDoctorById (req, res, next, docId) {
  Doctor.getDoctorById(docId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.registerDoctor = function registerDoctor (req, res, next, body) {
  Doctor.registerDoctor(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
