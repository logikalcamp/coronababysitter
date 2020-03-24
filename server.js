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
const request = require('request')
const cheerio = require('cheerio');


let bodyParser=require('body-parser');


app.use(cors());
app.set('trust proxy', true);

app.use(bodyParser.json())

app.use('/api', router);

io.on("connection", (socket) => {

});



// request({
//   method: 'GET',
//   url: "https://he-il.facebook.com/omri.peretz.186"
// }, (err, res, body) => {

//   if (err) return console.error(err);

//   let $ = cheerio.load(body);

//   let title = $('title');
//   let main = $('.mainContainer')

//   console.log(title.text(),"2----1",main.children().length);
// });

// request('https://www.facebook.com/aviram.roisman', function (error, response, html) {
//   if (!error && response.statusCode == 200) {
//     var $ = cheerio.load(html);
//     console.log(html)
//     $('span').each(function(i, element){
//       var a = $(this).prev();
//       console.log(a.text());
//     });
//   }
//   else{
//     console.log("shite")
//   }
// })


//$('#fbTimelineHeadline .profilePicThumb img').attr('src')

router.post('/getimage',(req,res)=>{
  request(req.body.url,
  {
    headers: {
      'user-agent': 'curl/7.47.0',
      'accept-language': 'en-US,en',
      'accept': '*/*'
    }
  }, function (error, response, body) {
    if (error) {
      throw (error);
    }
    if (response.statusCode === 200) {
      var $ = cheerio.load(body);
      let back = $('#fbTimelineHeadline .profilePicThumb img').attr('src')
      console.log($('#fbTimelineHeadline .profilePicThumb img').attr('src'))
      res.send(back)
      // console.log(JSON.stringify(scraper(body), null, 2));
    } else {
      console.log('HTTP Error: ' + response.statusCode);
    }
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