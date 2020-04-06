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

module.exports.getAllFilledSessions = function getAllFilledSessions (req, res) {
  req.SessionService.getAllFilledSessions()
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.volunteerWithraw = function deletvolunteerWithraweSession (req, res, next,body) {
  req.SessionService.volunteerWithraw(body)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
}


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


module.exports.getAllNotAssignedSessions = function getAllNotAssignedSessions (req, res, next) {
  req.SessionService.getAllNotAssignedSessions()
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

module.exports.getAllUpcomingNotYetApprovedSessions = function getAllUpcomingNotYetApprovedSessions (req, res, next) {
  req.SessionService.getAllUpcomingNotYetApprovedSessions()
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

module.exports.addRequestToSession = function addRequestToSession (req, res, next, body, sessionId) {
  req.SessionService.addRequestToSession(sessionId, body.volunteerId)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.countMatchedSessions = function countMatchedSessions (req, res, next, body) {
  req.SessionService.countMatchedSessions(body)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.countUrgentPendingSessions = function countUrgentPendingSessions (req, res, next) {
  utils.writeJson(req,res,{count: 0});
  // req.SessionService.countUrgentSessions(body)
  //   .then(function (response) {
  //     utils.writeJson(req,res, response);
  //   })
  //   .catch(function (response) {
  //     // utils.writeJson(req,res, response);
  //     res.status(400).json({'message': response.toString()});
  //   });
};

module.exports.getDoctorSessions = function getDoctorSessions (req, res, next, body, doctorId) {
  req.SessionService.getDoctorSessions(body, doctorId)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};

module.exports.approveSession = function approveSession (req, res, next,body,sessionId) {
  req.SessionService.approveSession(sessionId, body.volunteerId)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      if(response == "E-1" || response == "E-2" || response == "E-3"){
        utils.writeJson(req,res, response);
      } 
      else {
        res.status(400).json({'message': response.toString()});
      }
    });
};

module.exports.deleteSession = function deleteSession (req, res, next,body) {
  req.SessionService.deleteSession(body.sessionId)
    .then(function (response) {
      utils.writeJson(req,res, response);
    })
    .catch(function (response) {
      // utils.writeJson(req,res, response);
      res.status(400).json({'message': response.toString()});
    });
};