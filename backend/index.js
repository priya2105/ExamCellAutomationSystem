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
    var dbo = db.db("Exam_Cell_Automation");
    var myobj = dbo.collection("login").findOne({ ID: id1, Pass: password1 }, function (err, ress) {

      if (err) {
        console.log("error");
      }
      else if (ress.utype == "admin") {
        redirect1 = true;
        res.json({ status: true, result1: redirect1 });
        console.log("found1");
      }
      else if (ress.utype == "user") {
         console.log("user");
        redirect2 = true;
        res.json({
          status: true
          , result2: redirect2
        });
        console.log("found2");
    
      }
      else {
        console.log(" not found");
      }

      db.close();

    });
  });
});

app.post('/add_student', function (req, res) {
  var id = req.body.id1;
  var mail = req.body.email;
  var autopd;
  var alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var capalpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  var alphanum = Math.floor(Math.random() * 26);
  var capalphanum = Math.floor(Math.random() * 26);
  var digit = Math.floor(Math.random() * 10);
  autopd = alpha[alphanum] + digit + capalphanum + capalpha[capalphanum] + alpha[capalphanum] + capalpha[alphanum] + alphanum
  console.log(autopd);
  console.log(mail);
  var client_password;
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db("Exam_Cell_Automation");
    var myobj1 = dbo.collection("login").find({}).toArray(function (err1, ress) {
      var exist = 0;
      for (var i = 0; i < ress.length; i++) {
        if (id == ress[i].ID) {
          exist = 1;
          break;
        }
      }
      if (exist == 0) {
        console.log("if");
        var myobj = dbo.collection("login").insert({ ID: id, Pass: autopd, utype: "user", email: mail}, function (err1, ress) {
          if (err1) {
            res.json({ status: false, message: "Email id doesn't exist" });
          }
          else {

            var pass = autopd;
            var mailOptions = {
              from: "TEST",
              to: mail,
              subject: 'password',
              text: "Hello please enter your registration id and password is " + pass,
              tls: {
                rejectUnauthorized: false
              }
            }
            console.log("done");
            res.json({ key: "Student added" })
            transporter.sendMail(mailOptions, function (err2, info) {
              console.log(err2);
              if (err) {
                res.json({ status: false });
              }
              else {
                console.log(info);
                res.json({ status: true });
              }
            })
          }
        });
      }
      else {
        console.log("else");
        res.json({ key: "failed to add, student already exist" })
      }
      db.close();
    });

  });
})


app.post('/addmarks', function (req, res) {
  var id = req.body.id;
  var semester = req.body.semester;
  var  subject= req.body.subject;
  var int1 = req.body.int1;
  var int2=req.body.int2;
  var quiz=req.body.quiz;
  var surprise=req.body.surprise;
  var attendance=req.body.attendance;
  var total=req.body.total;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("connected");
    var dbo = db.db("Exam_Cell_Automation");
    var myobj = dbo.collection(id, function (err, ress1) {
      console.log("entered");
        if(semester=="1st" && subject=="c_programming"){
          console.log("1");
         var ob= dbo.collection("1").update({ RegdID:id},{$set:{
            "c_programming.0.internal1":int1,
            "c_programming.0.internal2":int2,
            "c_programming.0.quiz":quiz,
            "c_programming.0.surprise_test":surprise,
            "c_programming.0.attendance":attendance,
            "c_programming.0.total":total,
            
          }})}
         else if(semester=="1st" && subject=="Applied_mathematics_I"){
            console.log("1");
           var ob= dbo.collection("1").update({ RegdID:id},{$set:{
            "Applied_mathematics_I.0.internal1":int1,
            "Applied_mathematics_I.0.internal2":int2,
            "Applied_mathematics_I.0.quiz":quiz,
            "Applied_mathematics_I.0.surprise_test":surprise,
            "Applied_mathematics_I.0.attendance":attendance,
            "Applied_mathematics_I.0.total":total,
            
              
            }})}
            else if(semester=="1st" && subject=="Basic_Civil_Engineering"){
              console.log("1");
             var ob= dbo.collection("1").update({ RegdID:id},{$set:{
              "Basic_Civil_Engineering.0.internal1":int1,
"Basic_Civil_Engineering.0.internal2":int2,
"Basic_Civil_Engineering.0.quiz":quiz,
"Basic_Civil_Engineering.0.surprise_test":surprise,
"Basic_Civil_Engineering.0.attendance":attendance,
"Basic_Civil_Engineering.0.total":total,

              }})}
              else if(semester=="1st" && subject=="Applied_chemistry"){
                console.log("1");
               var ob= dbo.collection("1").update({ RegdID:id},{$set:{
                "Applied_chemistry.0.internal1":int1,
                "Applied_chemistry.0.internal2":int2,
                "Applied_chemistry.0.quiz":quiz,
                "Applied_chemistry.0.surprise_test":surprise,
                "Applied_chemistry.0.attendance":attendance,
                "Applied_chemistry.0.total":total,
                }})}
                else if(semester=="1st" && subject=="English_Communication"){
                  console.log("1");
                 var ob= dbo.collection("1").update({ RegdID:id},{$set:{
                  "English_Communication.0.internal1":int1,
"English_Communication.0.internal2":int2,
"English_Communication.0.quiz":quiz,
"English_Communication.0.surprise_test":surprise,
"English_Communication.0.attendance":attendance,
"English_Communication.0.total":total,

                  }})}  
                  else if(semester=="1st" && subject=="Professional_Ethics"){
                    console.log("1");
                   var ob= dbo.collection("1").update({ RegdID:id},{$set:{
                    "Professional_Ethics.0.internal1":int1,
"Professional_Ethics.0.internal2":int2,
"Professional_Ethics.0.quiz":quiz,
"Professional_Ethics.0.surprise_test":surprise,
"Professional_Ethics.0.attendance":attendance,
"Professional_Ethics.0.total":total,
 }})}  
 else if(semester=="2nd" && subject=="Data_Structure"){
  console.log("1");
 var ob= dbo.collection("1").update({ RegdID:id},{$set:{
  "Data_Structure.0.internal1":int1,
  "Data_Structure.0.internal2":int2,
  "Data_Structure.0.quiz":quiz,
  "Data_Structure.0.surprise_test":surprise,
  "Data_Structure.0.attendance":attendance,
  "Data_Structure.0.total":total,
  
}})}  
else if(semester=="2nd" && subject=="Applied_physics"){
  console.log("1");
 var ob= dbo.collection("1").update({ RegdID:id},{$set:{
  "Applied_physics.0.internal1":int1,
"Applied_physics.0.internal2":int2,
"Applied_physics.0.quiz":quiz,
"Applied_physics.0.surprise_test":surprise,
"Applied_physics.0.attendance":attendance,
"Applied_physics.0.total":total,

}})}  

else if(semester=="2nd" && subject==" Basic_electrical_engg"){
  console.log("1");
 var ob= dbo.collection("1").update({ RegdID:id},{$set:{
  "Basic_electrical_engg.0.internal1":int1,
"Basic_electrical_engg.internal2":int2,
"Basic_electrical_engg.0.quiz":quiz,
"Basic_electrical_engg.0.surprise_test":surprise,
"Basic_electrical_engg.0.attendance":attendance,
"Basic_electrical_engg.0.total":total,

}})}  

else if(semester=="2nd" && subject=="EVS"){
  console.log("1");
 var ob= dbo.collection("1").update({ RegdID:id},{$set:{
  "EVS.0.internal1":int1,
  "EVS.0.internal2":int2,
  "EVS.0.quiz":quiz,
  "EVS.0.surprise_test":surprise,
  "EVS.0.attendance":attendance,
  "EVS.0.total":total,
  

}})}  

else if(semester=="2nd" && subject=="Basic_mechanical_engg"){
  console.log("1");
 var ob= dbo.collection("1").update({ RegdID:id},{$set:{
  "Basic_mechanical_engg.0.internal1":int1,
"Basic_mechanical_engg.0.internal2":int2,
"Basic_mechanical_engg.0.quiz":quiz,
"Basic_mechanical_engg.0.surprise_test":surprise,
"Basic_mechanical_engg.0.attendance":attendance,
"Basic_mechanical_engg.0.total":total,

}})}  
else if(semester=="2nd" && subject==" Applied_mathematics_II"){
  console.log("1");
 var ob= dbo.collection("1").update({ RegdID:id},{$set:{
  "Applied_mathematics_II.0.internal1":int1,
  "Applied_mathematics_II.0.internal2":int2,
  "Applied_mathematics_II.0.quiz":quiz,
  "Applied_mathematics_II.0.surprise_test":surprise,
  "Applied_mathematics_II.0.attendance":attendance,
  "Applied_mathematics_II.0.total":total,
  

}})}  


        


          })})
})
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
        if(sem1=="1st"){
          console.log("1");
        var myobj = dbo.collection("1").insert({ 
                                                        RegdID:id1,
                                                        Name:name1,
                                                        Phone:phone1,
                                                        Email:email1,
                                                        Dept:dept1,
                                                        Sem:sem1,
                                                       c_programming:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                       Applied_mathematics_I:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                       Basic_Civil_Engineering:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                       Applied_chemistry:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                       English_Communication:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                       Professional_Ethics:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                       total:""

        }, function (err, ress) {

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
       else if(sem1=="2nd"){
        console.log("2");
        var myobj = dbo.collection("2").insert({ 
                                                        RegdID:id1,
                                                        Name:name1,
                                                        Phone:phone1,
                                                        Email:email1,
                                                        Dept:dept1,
                                                        Sem:sem1,
                                                        Data_Structue:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        Applied_physics:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        Basic_electrical_engg:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        EVS:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        Basic_mechanical_engg:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        Applied_mathematics_II:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        total:""

        }, function (err, ress) {

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
     else if(sem1=="3rd"){
      console.log("3");
        var myobj = dbo.collection("3").insert({ 
                                                        RegdID:id1,
                                                        Name:name1,
                                                        Phone:phone1,
                                                        Email:email1,
                                                        Dept:dept1,
                                                        Sem:sem1,
                                                        EEE:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        System_programming:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        Organisational_Behaviour:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        Software_engg:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        Discrete_Structure:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        JAVA:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        Artificial_Intelligence:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        total:""
        }, function (err, ress) {

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
      if(sem1=="4th"){
        console.log("4");
        var myobj = dbo.collection("4").insert({ 
                                                        RegdID:id1,
                                                        Name:name1,
                                                        Phone:phone1,
                                                        Email:email1,
                                                        Dept:dept1,
                                                        Sem:sem1,
                                                        COA:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        DAA:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        Engg_economics:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        Applied_mathematics_III:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        DBMS:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        FLAT:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        Data_analytics:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        total:""
        }, function (err, ress) {

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
      else if(sem1=="5th"){
        console.log("5");
        var myobj = dbo.collection("5").insert({ 
                                                        RegdID:id1,
                                                        Name:name1,
                                                        Phone:phone1,
                                                        Email:email1,
                                                        Dept:dept1,
                                                        Sem:sem1,
                                                        DWDM:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        Operating_system:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        Computer_Graphics:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        Ecommerce:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        Advance_JAVA:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        RTS:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        total:""
        }, function (err, ress) {

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
     else if(sem1=="6th"){
      console.log("6");
        var myobj = dbo.collection("6").insert({ 
                                                        RegdID:id1,
                                                        Name:name1,
                                                        Phone:phone1,
                                                        Email:email1,
                                                        Dept:dept1,
                                                        Sem:sem1,
                                                        CNDC:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        IWT:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        CD_WSN:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        OOSE_ML:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        GT:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        BCSI:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        Embedded_system:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        total:""
        }, function (err, ress) {

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
     else if(sem1=="7th"){
      console.log("7");
        var myobj = dbo.collection("7").insert({
                                                        RegdID:id1,
                                                        Name:name1,
                                                        Phone:phone1,
                                                        Email:email1,
                                                        Dept:dept1,
                                                        Sem:sem1,
                                                        Mobile_Computing:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        cryptography:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        soft_computing:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        IOT:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        total:""
                                                        
        }, function (err, ress) {

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
      else if(sem1=="8th"){
        console.log("8");
        var myobj = dbo.collection("8").insert({ 
                                                        RegdID:id1,
                                                        Name:name1,
                                                        Phone:phone1,
                                                        Email:email1,
                                                        Dept:dept1,
                                                        Sem:sem1,
                                                        Satellite_Comm_System:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        MEMS:[{internal1:"",internal2:"",quiz:"",surprise_test:"",assignment:"",attendance:""}],
                                                        total:""


        }, function (err, ress) {

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
app.post('/semester', function (req, res) {
  var id1 = req.body.id;
  var semester = req.body.semester;
  var loading;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("connected");
    console.log(semester);
    var dbo = db.db("Exam_Cell_Automation");
    if(semester=="1st"){
    var myobj1 = dbo.collection("1").find({}).toArray(function(err1 , ress){
      if (err1) {
        console.log(err1)
        }
    
          else {
            var arr = [];
            console.log(ress);
            for (var i = 0; i < ress.length; i++) {
              arr.push(ress[i]);
            }
            res.json({result:arr});
            
          }})}

    else if(semester=="2nd"){
   var myobj1 = dbo.collection("2").find({}).toArray(function(err1 , ress){
    if (err1) {
      console.log(err1)
      }
  
        else {
          var arr = [];
          console.log(ress);
          for (var i = 0; i < ress.length; i++) {
            arr.push(ress[i]);
          }
          res.json({result:arr});
          
        }})}
  if(semester=="3rd"){
 var myobj1 = dbo.collection("3").find({}).toArray(function(err1 , ress){
  if (err1) {
    console.log(err1)
    }

      else {
        var arr = [];
        console.log(ress);
        for (var i = 0; i < ress.length; i++) {
          arr.push(ress[i]);
        }
        res.json({result:arr});
        
      }})}
 if(semester=="4th"){
var myobj1 = dbo.collection("4").find({}).toArray(function(err1 , ress){
  if (err1) {
    console.log(err1)
    }

      else {
        var arr = [];
        console.log(ress);
        for (var i = 0; i < ress.length; i++) {
          arr.push(ress[i]);
        }
        res.json({result:arr});
        
      }})}
 if(semester=="5th"){
 var myobj1 = dbo.collection("5").find({}).toArray(function(err1 , ress){
  if (err1) {
    console.log(err1)
    }

      else {
        var arr = [];
        console.log(ress);
        for (var i = 0; i < ress.length; i++) {
          arr.push(ress[i]);
        }
        res.json({result:arr});
        
      }})}
 if(semester=="6th"){
  var myobj1 = dbo.collection("6").find({}).toArray(function(err1 , ress){
    if (err1) {
      console.log(err1)
      }
  
        else {
          var arr = [];
          console.log(ress);
          for (var i = 0; i < ress.length; i++) {
            arr.push(ress[i]);
          }
          res.json({result:arr});
          
        }})}
 if(semester=="7th"){
  var myobj1 = dbo.collection("7").find({}).toArray(function(err1 , ress){
    if (err1) {
      console.log(err1)
      }
  
        else {
          var arr = [];
          console.log(ress);
          for (var i = 0; i < ress.length; i++) {
            arr.push(ress[i]);
          }
          res.json({result:arr});
          
        }})}
 if(semester=="8th"){
   var myobj1 = dbo.collection("8").find({}).toArray(function(err1 , ress){
    if (err1) {
      console.log(err1)
      }
  
        else {
          var arr = [];
          console.log(ress);
          for (var i = 0; i < ress.length; i++) {
            arr.push(ress[i]);
          }
          res.json({result:arr});
          
        }})}
    });

});


app.post('/viewmarks', function (req, res) {
  var id = req.body.id;
  var sem = req.body.sem;
  var message = "View Marks";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Exam_Cell_Automation");
    if(sem =="1"){
      console.log("1");
    var myobj = dbo.collection("1").findOne({ RegdID: id}, function (err, ress) {
       if(ress)
       {
       
        for (var i = 0; i < ress.c_programming.length; i++)
        {
          var subject1_internal1=ress.c_programming[0].internal1;
          var subject1_internal2=ress.c_programming[0].internal2;
          var subject1_quiz=ress.c_programming[0].quiz;
          var subject1_surprise_test=ress.c_programming[0].surprise_test;
          var subject1_assignment=ress.c_programming[0].assignment;
          var subject1_attendence=ress.c_programming[0].attendance;
          var arr1=[subject1_internal1,subject1_internal2,subject1_quiz,subject1_surprise_test,subject1_assignment,subject1_attendence];
        }
        for (var i = 0; i < ress.c_programming.length; i++)
        {
          var subject2_internal1=ress.Applied_mathematics_I[0].internal1;
          var subject2_internal2=ress.Applied_mathematics_I[0].internal2;
          var subject2_quiz=ress.Applied_mathematics_I[0].quiz;
          var subject2_surprise_test=ress.Applied_mathematics_I[0].surprise_test;
          var subject2_assignment=ress.Applied_mathematics_I[0].assignment;
          var subject2_attendence=ress.Applied_mathematics_I[0].attendance;
          var arr2=[subject2_internal1,subject2_internal2,subject2_quiz,subject2_surprise_test,subject2_assignment,subject2_attendence];
          console.log(arr2);
        }
        for (var i = 0; i < ress.Basic_Civil_Engineering.length; i++)
        {
          var subject3_internal1=ress.Basic_Civil_Engineering[0].internal1;
          var subject3_internal2=ress.Basic_Civil_Engineering[0].internal2;
          var subject3_quiz=ress.Basic_Civil_Engineering[0].quiz;
          var subject3_surprise_test=ress.Basic_Civil_Engineering[0].surprise_test;
          var subject3_assignment=ress.Basic_Civil_Engineering[0].assignment;
          var subject3_attendence=ress.Basic_Civil_Engineering[0].attendance;
          var arr3=[subject3_internal1,subject3_internal2,subject3_quiz,subject3_surprise_test,subject3_assignment,subject3_attendence];
          console.log(arr3);
        }
        for (var i = 0; i < ress.Applied_chemistry.length; i++)
        {
          var subject4_internal1=ress.Applied_chemistry[0].internal1;
          var subject4_internal2=ress.Applied_chemistry[0].internal2;
          var subject4_quiz=ress.Applied_chemistry[0].quiz;
          var subject4_surprise_test=ress.Applied_chemistry[0].surprise_test;
          var subject4_assignment=ress.Applied_chemistry[0].assignment;
          var subject4_attendence=ress.Applied_chemistry[0].attendance;
          var arr4=[subject4_internal1,subject4_internal2,subject4_quiz,subject4_surprise_test,subject4_assignment,subject4_attendence];
          console.log(arr4);
        }
        for (var i = 0; i < ress.English_Communication.length; i++)
        {
          var subject5_internal1=ress.English_Communication[0].internal1;
          var subject5_internal2=ress.English_Communication[0].internal2;
          var subject5_quiz=ress.English_Communication[0].quiz;
          var subject5_surprise_test=ress.English_Communication[0].surprise_test;
          var subject5_assignment=ress.English_Communication[0].assignment;
          var subject5_attendence=ress.English_Communication[0].attendance;
          var arr5=[subject5_internal1,subject5_internal2,subject5_quiz,subject5_surprise_test,subject5_assignment,subject5_attendence];
          console.log(arr5);
        }
        for (var i = 0; i < ress.Professional_Ethics.length; i++)
        {
          var subject6_internal1=ress.Professional_Ethics[0].internal1;
          var subject6_internal2=ress.Professional_Ethics[0].internal2;
          var subject6_quiz=ress.Professional_Ethics[0].quiz;
          var subject6_surprise_test=ress.Professional_Ethics[0].surprise_test;
          var subject6_assignment=ress.Professional_Ethics[0].assignment;
          var subject6_attendence=ress.Professional_Ethics[0].attendance;
          var arr6=[subject6_internal1,subject6_internal2,subject6_quiz,subject6_surprise_test,subject6_assignment,subject6_attendence];
          console.log(arr6);
        }
        
        res.json({result1:arr1,result2:arr2,result3:arr3,result4:arr4,result5:arr5,result6:arr6});
    
       
       }
       else {
         console.log("does not exist");
       }
          
      });
    
        
      }
    else if(sem =="2"){
        console.log("2");
      var myobj = dbo.collection("2").findOne({ RegdID: id}, function (err, ress) {
         if(ress)
         {
         
          for (var i = 0; i < ress.Data_Structue.length; i++)
          {
            var subject1_internal1=ress.Data_Structue[0].internal1;
            var subject1_internal2=ress.Data_Structue[0].internal2;
            var subject1_quiz=ress.Data_Structue[0].quiz;
            var subject1_surprise_test=ress.Data_Structue[0].surprise_test;
            var subject1_assignment=ress.Data_Structue[0].assignment;
            var subject1_attendence=ress.Data_Structue[0].attendance;
            var arr1=[subject1_internal1,subject1_internal2,subject1_quiz,subject1_surprise_test,subject1_assignment,subject1_attendence];
          }
          for (var i = 0; i < ress.Applied_physics.length; i++)
          {
            var subject2_internal1=ress.Applied_physics[0].internal1;
            var subject2_internal2=ress.Applied_physics[0].internal2;
            var subject2_quiz=ress.Applied_physics[0].quiz;
            var subject2_surprise_test=ress.Applied_physics[0].surprise_test;
            var subject2_assignment=ress.Applied_physics[0].assignment;
            var subject2_attendence=ress.Applied_physics[0].attendance;
            var arr2=[subject2_internal1,subject2_internal2,subject2_quiz,subject2_surprise_test,subject2_assignment,subject2_attendence];
            console.log(arr2);
          }
          for (var i = 0; i < ress.Basic_electrical_engg.length; i++)
          {
            var subject3_internal1=ress.Basic_electrical_engg[0].internal1;
            var subject3_internal2=ress.Basic_electrical_engg[0].internal2;
            var subject3_quiz=ress.Basic_electrical_engg[0].quiz;
            var subject3_surprise_test=ress.Basic_electrical_engg[0].surprise_test;
            var subject3_assignment=ress.Basic_electrical_engg[0].assignment;
            var subject3_attendence=ress.Basic_electrical_engg[0].attendance;
            var arr3=[subject3_internal1,subject3_internal2,subject3_quiz,subject3_surprise_test,subject3_assignment,subject3_attendence];
            console.log(arr3);
          }
          for (var i = 0; i < ress.EVS.length; i++)
          {
            var subject4_internal1=ress.EVS[0].internal1;
            var subject4_internal2=ress.EVS[0].internal2;
            var subject4_quiz=ress.EVS[0].quiz;
            var subject4_surprise_test=ress.EVS[0].surprise_test;
            var subject4_assignment=ress.EVS[0].assignment;
            var subject4_attendence=ress.EVS[0].attendance;
            var arr4=[subject4_internal1,subject4_internal2,subject4_quiz,subject4_surprise_test,subject4_assignment,subject4_attendence];
            console.log(arr4);
          }
          for (var i = 0; i < ress.Basic_mechanical_engg.length; i++)
          {
            var subject5_internal1=ress.Basic_mechanical_engg[0].internal1;
            var subject5_internal2=ress.Basic_mechanical_engg[0].internal2;
            var subject5_quiz=ress.Basic_mechanical_engg[0].quiz;
            var subject5_surprise_test=ress.Basic_mechanical_engg[0].surprise_test;
            var subject5_assignment=ress.Basic_mechanical_engg[0].assignment;
            var subject5_attendence=ress.Basic_mechanical_engg[0].attendance;
            var arr5=[subject5_internal1,subject5_internal2,subject5_quiz,subject5_surprise_test,subject5_assignment,subject5_attendence];
            console.log(arr5);
          }
          for (var i = 0; i < ress.Applied_mathematics_II.length; i++)
          {
            var subject6_internal1=ress.Applied_mathematics_II[0].internal1;
            var subject6_internal2=ress.Applied_mathematics_II[0].internal2;
            var subject6_quiz=ress.Applied_mathematics_II[0].quiz;
            var subject6_surprise_test=ress.Applied_mathematics_II[0].surprise_test;
            var subject6_assignment=ress.Applied_mathematics_II[0].assignment;
            var subject6_attendence=ress.Applied_mathematics_II[0].attendance;
            var arr6=[subject6_internal1,subject6_internal2,subject6_quiz,subject6_surprise_test,subject6_assignment,subject6_attendence];
            console.log(arr6);
          }
          
          res.json({result1:arr1,result2:arr2,result3:arr3,result4:arr4,result5:arr5,result6:arr6});
      
         
         }
         else {
           console.log("does not exist");
         }
            
        });
      
          
        }
    else if(sem =="3"){
          console.log("3");
        var myobj = dbo.collection("3").findOne({ RegdID: id}, function (err, ress) {
           if(ress)
           {
           
            for (var i = 0; i < ress.EEE.length; i++)
            {
              var subject1_internal1=ress.EEE[0].internal1;
              var subject1_internal2=ress.EEE[0].internal2;
              var subject1_quiz=ress.EEE[0].quiz;
              var subject1_surprise_test=ress.EEE[0].surprise_test;
              var subject1_assignment=ress.EEE[0].assignment;
              var subject1_attendence=ress.EEE[0].attendance;
              var arr1=[subject1_internal1,subject1_internal2,subject1_quiz,subject1_surprise_test,subject1_assignment,subject1_attendence];
            }
            for (var i = 0; i < ress.System_programming.length; i++)
            {
              var subject2_internal1=ress.System_programming[0].internal1;
              var subject2_internal2=ress.System_programming[0].internal2;
              var subject2_quiz=ress.System_programming[0].quiz;
              var subject2_surprise_test=ress.System_programming[0].surprise_test;
              var subject2_assignment=ress.System_programming[0].assignment;
              var subject2_attendence=ress.System_programming[0].attendance;
              var arr2=[subject2_internal1,subject2_internal2,subject2_quiz,subject2_surprise_test,subject2_assignment,subject2_attendence];
              console.log(arr2);
            }
            for (var i = 0; i < ress.Basic_electrical_engg.length; i++)
            {
              var subject3_internal1=ress.Basic_electrical_engg[0].internal1;
              var subject3_internal2=ress.Basic_electrical_engg[0].internal2;
              var subject3_quiz=ress.Basic_electrical_engg[0].quiz;
              var subject3_surprise_test=ress.Basic_electrical_engg[0].surprise_test;
              var subject3_assignment=ress.Basic_electrical_engg[0].assignment;
              var subject3_attendence=ress.Basic_electrical_engg[0].attendance;
              var arr3=[subject3_internal1,subject3_internal2,subject3_quiz,subject3_surprise_test,subject3_assignment,subject3_attendence];
              console.log(arr3);
            }
            for (var i = 0; i < ress.EVS.length; i++)
            {
              var subject4_internal1=ress.EVS[0].internal1;
              var subject4_internal2=ress.EVS[0].internal2;
              var subject4_quiz=ress.EVS[0].quiz;
              var subject4_surprise_test=ress.EVS[0].surprise_test;
              var subject4_assignment=ress.EVS[0].assignment;
              var subject4_attendence=ress.EVS[0].attendance;
              var arr4=[subject4_internal1,subject4_internal2,subject4_quiz,subject4_surprise_test,subject4_assignment,subject4_attendence];
              console.log(arr4);
            }
            for (var i = 0; i < ress.Basic_mechanical_engg.length; i++)
            {
              var subject5_internal1=ress.Basic_mechanical_engg[0].internal1;
              var subject5_internal2=ress.Basic_mechanical_engg[0].internal2;
              var subject5_quiz=ress.Basic_mechanical_engg[0].quiz;
              var subject5_surprise_test=ress.Basic_mechanical_engg[0].surprise_test;
              var subject5_assignment=ress.Basic_mechanical_engg[0].assignment;
              var subject5_attendence=ress.Basic_mechanical_engg[0].attendance;
              var arr5=[subject5_internal1,subject5_internal2,subject5_quiz,subject5_surprise_test,subject5_assignment,subject5_attendence];
              console.log(arr5);
            }
            for (var i = 0; i < ress.Applied_mathematics_II.length; i++)
            {
              var subject6_internal1=ress.Applied_mathematics_II[0].internal1;
              var subject6_internal2=ress.Applied_mathematics_II[0].internal2;
              var subject6_quiz=ress.Applied_mathematics_II[0].quiz;
              var subject6_surprise_test=ress.Applied_mathematics_II[0].surprise_test;
              var subject6_assignment=ress.Applied_mathematics_II[0].assignment;
              var subject6_attendence=ress.Applied_mathematics_II[0].attendance;
              var arr6=[subject6_internal1,subject6_internal2,subject6_quiz,subject6_surprise_test,subject6_assignment,subject6_attendence];
              console.log(arr6);
            }
            
            res.json({result1:arr1,result2:arr2,result3:arr3,result4:arr4,result5:arr5,result6:arr6});
        
           
           }
           else {
             console.log("does not exist");
           }
              
          });
        
            
          }
      else {
        console.log(" not found");
      }
      db.close();
    });
  });

  app.post('/addnotice', function (req, res) {
    var notice = req.body.notice;
    console.log(notice);
    
    var date = req.body.date;
    console.log(date);
    
    var file = req.body.file;
    console.log(file);
    
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      console.log("connected");
      var dbo = db.db("Exam_Cell_Automation");
      var myobj = dbo.collection("Notice").insert({ Notice: notice, Date: date,  File: file }, function (err1, ress) {
        if (err1) {
          console.log(err1)
          
        }
        else {}
      })
    })
    })
    




app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});




