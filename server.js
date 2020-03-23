'use strict'
const path = require('path');
const express = require('express');
var cors = require('cors');
const API_PORT = process.env.PORT || 3001;
const router = express.Router();
var http = require('http');
var io = require('socket.io')(http);
var oas3Tools = require('oas3-tools');

let bodyParser=require('body-parser');

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'server/api/openapi.yaml'), options);
expressAppConfig.addValidator();
var app = expressAppConfig.getApp();


app.use(cors());
//app.set('trust proxy', true);

//app.use(bodyParser.json())

app.use('/api', router);

io.on("connection", (socket) => {

});

// swaggerRouter configuration
var options = {
  controllers: path.join(__dirname, './controllers')
};

router.get('/',(req,res)=>{
    res.send({response:"i am alive"}).status(200);
  })

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Initialize the Swagger middleware
http.createServer(app).listen(API_PORT, function () {
  console.log('Your server is listening on port %d (http://localhost:%d)', API_PORT, API_PORT);
  console.log('Swagger-ui is available on http://localhost:%d/docs', API_PORT);
});