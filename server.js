'use strict'
const path = require('path');
const express = require('express');
var cors = require('cors');
const API_PORT = process.env.PORT || 3001;
const router = express.Router();
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const mongoose = require('mongoose');
const rp = require('request-promise');
const $ = require('cheerio');


let bodyParser=require('body-parser');


app.use(cors());
app.set('trust proxy', true);

app.use(bodyParser.json())

app.use('/api', router);

io.on("connection", (socket) => {

});

router.post('/getimage',(req,res)=>{
  console.log(req.body.url)
  rp(req.body.url)
  .then(function(html){
    //success!
    console.log(html)
    console.log( $('.photoContainer',html).text())
    // let divi = $('.photoContainer',html).text()
    // console.log(divi)
  })
  .catch(function(err){
    //handle error
  });
})

router.get('/',(req,res)=>{
    res.send({response:"i am alive"}).status(200);
  })

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

var server = http.listen(API_PORT, () => {
  console.log('server is running on port', server.address().port);
});