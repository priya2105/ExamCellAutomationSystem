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
var url = "mongodb://reemameher1997:kalpana123@cluster0-shard-00-00-q4nr2.mongodb.net:27017,cluster0-shard-00-01-q4nr2.mongodb.net:27017,cluster0-shard-00-02-q4nr2.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
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


app.post('/login', function (req, res) {
  var id1 = req.body.id;
  console.log(id1);
  var password1 = req.body.password;
  var redirect1 = req.body.redirect1;
  var redirect2 = req.body.redirect2;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("connected");
    var dbo = db.db("hostel_management");
    var myobj = dbo.collection("login").findOne({ ID: id1, Pass: password1 }, function (err, ress) {

      if (err) {
        console.log("error");
      }
      else if (ress.utype == "admin") {
        redirect1 = true;
        res.json({ status: true, result1: redirect1, name: ress.name, result:"successfull admin" });
        console.log("found1");
      }
      else if (ress.utype == "user") {

        redirect2 = true;
        res.json({
          status: true
          , result2: redirect2, name: ress.name , result:"successfull user"
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




app.post('/details', function (req, res) {
  var id1 = req.body.id;
  var name1 = req.body.name
  var phone1 = req.body.phone;
  var dept1 = req.body.dept;
  var email1 = req.body.email;
  var sem1 = req.body.sem;

  var loading;
  var message = "Data has been uploaded";
  var message1 = "Data already exists";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("connected");
    var dbo = db.db("Exam_Cell_Automation");
    var myobj1 = dbo.collection("student_details").findOne({ ID: id1 }, function (err2, ress3) {
      if (ress3) {
        console.log("if loop");
        res.json({ result: message1});
      }
      else {
        console.log("else loop");
        var myobj = dbo.collection("student_details").insert({ ID: id1, Name: name1, Phone: phone1, dept: dept1, email: email1 , sem:sem1}, function (err, ress) {

          if (err) {
            console.log("error");
          }
          else if (ress) {

            res.json({ status: true, result: message, loading:false});
            console.log("found");
          }
          else {
            console.log(" not found");
          }


          db.close();
        });
      }
    });
  });

});






app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});




