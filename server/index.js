'use strict';

var {VolunteerService} = require("./service/VolunteerService");
var {SessionService} = require("./service/SessionService");
var {DoctorService} = require("./service/DoctorService");
var {HamalService} = require("./service/HamalService");
var path = require('path');
var http = require('http');
var cors = require('cors');
var bodyParser=require('body-parser');
const fs = require('fs');
var formidable = require('formidable');

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

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.use(cors());
app.set('trust proxy', true);

app.use(bodyParser.json())

app.post('/api/uploadphoto', (req,res,next) => {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (err) {
  
          // Check for and handle any errors here.
  
          console.error(err.message);
          return;
        }
        else {
            const {GPhotos}     = require('upload-gphotos');
            const gphotos = new GPhotos();
    
            var username = 'appsitterseeker@gmail.com';
            var password = 'sitterseeker2020';
         
             (async () => {
                 await gphotos.signin({
                   username,
                   password,
                 });
                 
                 const album = await gphotos.searchAlbum({ title: 'Volunteers' });
         
                 const photo = await gphotos.upload({
                     stream: fs.createReadStream(files['customPhoto'].path),
                     size: (await fs.promises.stat(files['customPhoto'].path)).size,
                     filename: path.basename(files['customPhoto'].path),
                 });

                 console.log(photo)
             })().then(console.log).catch(console.error)
        }
        res.end()
    });
       


})

app.use("*", async (req,res,next) => {
    if(req.baseUrl.startsWith("/api")) {
            req.MongoClient = await dataBase.getConnection();
            req.MongoDB = req.MongoClient.db();
            req.VolunteerService = new VolunteerService(req.MongoDB);
            req.SessionService = new SessionService(req.MongoDB);
            req.DoctorService = new DoctorService(req.MongoDB);
            req.HamalService = new HamalService(req.MongoDB)
    }

    next()
})

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
});

