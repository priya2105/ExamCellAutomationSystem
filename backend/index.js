var express = require('express');
var app = express();
var mongo = require('mongodb');
var assert = require('assert');
var bodyParser = require('body-parser');
var cors = require('cors');
var ObjectId = require('mongodb').ObjectId;
var module2 = require('./folder/module2.js');
var mongo = require('mongodb');
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://127.0.0.1:27017/Employee";
var url = "mongodb://priya2105:priya2105@timesheet-shard-00-00-bzikt.mongodb.net:27017,timesheet-shard-00-01-bzikt.mongodb.net:27017,timesheet-shard-00-02-bzikt.mongodb.net:27017/timesheet?ssl=true&replicaSet=TimeSheet-shard-0&authSource=admin&retryWrites=true";
var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: '21priya05@gmail.com',
    pass: 'Priya1234'
  }
});

app.set('port', (process.env.PORT || 8000));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/modpule2Path', module2);


app.post('/m', function (req, res) {
  var empid = req.body.name1;
  console.log(empid);
  var pass1 = req.body.pass1;
  var redirect1 = req.body.redirect1;
  var redirect2 = req.body.redirect2;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("connected");
    //console.log(name1);
    var dbo = db.db("timesheet");
    // var myobj1 = { name: "rubina", password: "priya" };
    var myobj = dbo.collection("user_details").findOne({ id: empid, password: pass1 }, function (err, ress) {

      if (err) {
        console.log("error");
      }
      else if (ress.utype == "admin") {
        redirect1 = true;
        res.json({ status: true, result1: redirect1, name: ress.name });
        console.log("found1");
      }
      else if (ress.utype == "user") {

        redirect2 = true;
        res.json({
          status: true
          , result2: redirect2, name: ress.name
        });
        console.log("found2");
        console.log(ress.name);
      }
      else {
        console.log(" not found");
      }

      db.close();

    });
  });


});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});




