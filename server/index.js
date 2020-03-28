'use strict';

var {VolunteerService} = require("./service/VolunteerService");
var {SessionService} = require("./service/SessionService");
var {DoctorService} = require("./service/DoctorService");
var {HamalService} = require("./service/HamalService");
var {UtilsService} = require("./service/UtilsService");
var path = require('path');
var http = require('http');
var cors = require('cors');
var bodyParser=require('body-parser');

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
    }

    next()
})

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
});

