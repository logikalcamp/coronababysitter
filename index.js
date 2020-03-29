'use strict';

var {VolunteerService} = require("./server/service/VolunteerService");
var {SessionService} = require("./server/service/SessionService");
var {DoctorService} = require("./server/service/DoctorService");
var {HamalService} = require("./server/service/HamalService");
var {UtilsService} = require("./server/service/UtilsService");
var path = require('path');
var cors = require('cors');
var bodyParser=require('body-parser');
var express = require('express')
var oas3Tools = require('oas3-tools');
var serverPort = process.env.PORT || 3001;
// var app = express()
var dataBase = require("./server/database/DataBase")
// swaggerRouter configuration
var options = {
    controllers: path.join(__dirname, './server/controllers')
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'server/api/openapi.yaml'), options);
expressAppConfig.addValidator();
var app = expressAppConfig.getApp();

var http = require('http').Server(app);

app.use(cors());
app.set('trust proxy', true);

app.use(bodyParser.json())

app.use("*", async (req,res,next) => {
    if(req.baseUrl.startsWith("/api")) {
            req.MongoClient = await dataBase.getConnection();
            req.MongoDB = req.MongoClient.db();
            req.VolunteerService = new VolunteerService(req.MongoDB);
            req.SessionService = new SessionService(req.MongoDB);
            req.DoctorService = new DoctorService(req.MongoDB);
            req.HamalService = new HamalService(req.MongoDB);
            req.UtilsService = new UtilsService(req.MongoDB);
            next();
    }
    // res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    next();
})

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Initialize the Swagger middleware
var server = http.listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
});
