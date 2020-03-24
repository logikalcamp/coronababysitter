'use strict';

var {VolunteerService} = require("./service/VolunteerService");

var path = require('path');
var http = require('http');

var oas3Tools = require('oas3-tools');
var serverPort = 3001;

var dataBase = require("./database/DataBase")

// swaggerRouter configuration
var options = {
    controllers: path.join(__dirname, './controllers')
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
expressAppConfig.addValidator();
var app = expressAppConfig.getApp();

app.use("*", async (req,res,next) => {
    if(req.baseUrl.startsWith("/api")) {
            req.MongoClient = await dataBase.getClient();
            req.VolunteerService = new VolunteerService(req.MongoClient);
    }

    next()
})

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
});

