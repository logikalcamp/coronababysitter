'use strict';

var utils = require('../utils/writer.js');
var {DoctorService} = require('../service/DoctorService');

module.exports.createDoctor = function createDoctor (req, res, next, body, docId) {
  req.DoctorService.createDoctor(body, docId)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.getAllDoctors = function getAllDoctors (req, res, next,page) {
  req.DoctorService.getAllDoctors(page)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.getApprovedDoctors = function getApprovedDoctors (req, res, next,page) {
  req.DoctorService.getApprovedDoctors(page)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.getPendingDoctors = function getPendingDoctors (req, res, next,page) {
  req.DoctorService.getPendingDoctors(page)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.getDoctorById = function getDoctorById (req, res, next, docId) {
  req.DoctorService.getDoctorById(docId)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.registerDoctor = function registerDoctor (req, res, next, body) {
  req.DoctorService.registerDoctor(body)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.loginEmailDoctor = function loginEmailDoctor (req, res, next, body) {
  req.DoctorService.loginEmailDoctor(body)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.countAllDoctors = function countAllDoctors (req, res, next, body) {
  req.DoctorService.countAllDoctors(body)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};
