'use strict';

var {VolunteerService} = require("./server/service/VolunteerService");
var {SessionService} = require("./server/service/SessionService");
var {DoctorService} = require("./server/service/DoctorService");
var {HamalService} = require("./server/service/HamalService");
var {UtilsService} = require("./server/service/UtilsService");
var {ImageService} = require("./server/service/ImageService");
var {EmailService} = require("./server/service/EmailService");
var {CodeService} = require("./server/service/CodesService");
var path = require('path');
var cors = require('cors');
var bodyParser=require('body-parser');
var express = require('express')
var oas3Tools = require('oas3-tools');
var formidable = require('formidable');
var serverPort = process.env.PORT || 3001;

var env = process.env.NODE_ENV || 'dev'

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

app.post('/api/uploadphoto', async (req,res,next) => {
    var form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, file) => {
        if (err) {
  
          // Check for and handle any errors here.
  
          console.error(err.message);
          return;
        }
        else {
            var imageService = new ImageService();

            var photo = await imageService.uploadImageToCloud(file['photoFile'].path);

            if(photo != undefined) {
                res.send({photo: photo});
            }
            else {
                res.status(500)
                res.end("Error uploading photo");
            }
        }
    });
});

app.use("*", async (req,res,next) => {
    if(req.baseUrl.startsWith("/api")) {
            req.MongoClient = await dataBase.getConnection();
            req.MongoDB = req.MongoClient.db();
            req.CodeService = new CodeService(req.MongoDB);
            req.VolunteerService = new VolunteerService(req.MongoDB,req.CodeService);
            req.SessionService = new SessionService(req.MongoDB);
            req.DoctorService = new DoctorService(req.MongoDB,req.CodeService);
            req.HamalService = new HamalService(req.MongoDB);
            req.UtilsService = new UtilsService(req.MongoDB,req.CodeService);
    }
    
    next();
})

if(env === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const backupCheck = async () => {
    var title = 'DB Backup ' + new Date().toUTCString()

    try {
        const backupData = await dataBase.getBackupData();

        if(backupData) {
            const emailService = new EmailService();

            await emailService.sendEmail("appsitterseeker@gmail.com", {
                title: title,
                body: "File attached",
                attachments:[{
                    filename:title + ".txt",
                    content: backupData
                }]
            });

            dataBase.finishBackup(new Date());
        }
    } 
    catch (error) {
        await emailService.sendEmail("appsitterseeker@gmail.com", {
            title: "FAILED " + title,
            body: "Backup FAILED\nError : \n" +error
        });
    }

    setTimeout(backupCheck, 12 * 60 * 60 * 1000);
}

// Initialize the Swagger middleware
var server = http.listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);

    // Backup Code
    backupCheck();
});

global.session = {};
