// 'use strict';
// var {VolunteerService} = require("./server/service/VolunteerService");
// var {SessionService} = require("./server/service/SessionService");
// var {DoctorService} = require("./server/service/DoctorService");
// var {HamalService} = require("./server/service/HamalService");
// var path = require('path');
// var http = require('http');
// var cors = require('cors');
// var express = require('express')
// var bodyParser=require('body-parser');

// var oas3Tools = require('oas3-tools');
// var serverPort = 3001;

// var dataBase = require("./server/database/DataBase")

// const router = express.Router();
// const app = express();
// // swaggerRouter configuration
// // var options = {
// //     controllers: path.join(__dirname, './server/controllers')
// // };


// // var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'server/api/openapi.yaml'), options);
// // expressAppConfig.addValidator();
// // var app = expressAppConfig.getApp();

// app.use(cors());
// app.set('trust proxy', true);

// app.use(bodyParser.json())

// app.use('/api', router);

// // app.use("*", async (req,res,next) => {
// //     if(req.baseUrl.startsWith("/api")) {
// //             req.MongoClient = await dataBase.getConnection();
// //             req.MongoDB = req.MongoClient.db();
// //             req.VolunteerService = new VolunteerService(req.MongoDB);
// //             req.SessionService = new SessionService(req.MongoDB);
// //             req.DoctorService = new DoctorService(req.MongoDB);
// //             req.HamalService = new HamalService(req.MongoDB)
// //     }

// //     next()
// // })

// app.use(express.static(path.join(__dirname, 'client/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

// // Initialize the Swagger middleware
// http.Server(app).listen(serverPort, function () {
//     console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
// });

'use strict'
const path = require('path');
const express = require('express');
var cors = require('cors');
const API_PORT = process.env.PORT || 3001;
const router = express.Router();
const app = express();
var http = require('http').Server(app);

// const validation = require("./router/validation");
let bodyParser=require('body-parser');

app.use(cors());
app.set('trust proxy', true);

app.use(bodyParser.json())
app.use('/api', router);

router.get('/',(req,res)=>{
    res.send({response:"i am alive"}).status(200);
  })

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});



// app.listen(API_PORT,()=>{
//     console.log("server is runing on port ",API_PORT)
// })
var server = http.listen(API_PORT, () => {
  console.log('server is running on port', server.address().port);
});