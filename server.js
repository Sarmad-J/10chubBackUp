  /*BTRequest.onload = function(){
    if(BTRequest.status >= 200 && BTRequest.status < 400)
    {
        BlankTable = JSON.parse(BTRequest.responseText);
    }
    else{
        console.log("We connected to the server, but it returned an error.");
    };

    BTRequest.onerror = function() {
        console.log("Connection error");
    }

    };*/

  //BTRequest.send();
     /*
      fs.writeFile(
          __dirname + "/public/Work_" + moment().week() + "_" + moment().year() + ".json",
          BlankTable,
            function (err) {
            if (err) throw err;}
        )}*/
/*
var fs = require('fs').promises;
var path = require('path');

let express = require('express')
var bodyParser = require('body-parser')

const app = express()
//setting our view engine to ejs

//app.use('/', require('./routes/read'));
//app.use('/edit', require('./routes/edit'))
app.set('view engine','ejs')

let indexFile;
let editFile;

app.get('/edit', (req, res)=>{
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(editFile);
})
app.get('/', (req, res)=>{
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(indexFile);
})


var urlencodedParser = bodyParser.urlencoded({extended: false})

app.post('/', urlencodedParser, (req, res)=>{
   res.send(JSON.stringify(req.body))
})

app.listen(3001)

fs.readFile(__dirname + "/index.html")
    .then(contents => 
        {
            indexFile = contents;
        })
        .catch(err =>
            {
                console.log(`Could not read index.html file: ${err}`);
                process.exit(1);
       });

fs.readFile(__dirname + "/edit.html")
    .then(contents => 
        {
            editFile = contents;
        })
        .catch(err =>
            {
                console.log(`Could not read edit.html file: ${err}`);
                process.exit(1);
       });*/
'use strict';
const fs = require('fs');
var path = require('path');

const bodyParser = require("body-parser");


var moment = require('moment'); // require
moment().format(); 

const express = require("express");
const app = express();
const router = express.Router();

app.use(express.json());    

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var isExist = false;
var doExist = false;
var ActualEdit = false;

var pathOfFile = __dirname + "/public/WorkFile/Work_" + moment().week() + "_" + moment().year() + ".json";

function loadTable(response){
  const BlankJSON = fs.readFileSync(__dirname + "/public/HomeworkTable.json");
  const BlankTable = JSON.parse(BlankJSON);
  
    if (fs.existsSync(pathOfFile) === false){
      fs.writeFile(pathOfFile, JSON.stringify(BlankTable, null, 2), function (err) {
      if (err) throw err;
      console.log('Saved!');
      response.sendFile(pathOfFile);   
      })}
    else
    {
      response.sendFile(pathOfFile);
    }  
  
};

function loadBlankTable(response){
  response.sendFile(__dirname + "/public/HomeworkTable.json");
};

const Edit = false;
var UpdateData = {};
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

router.post("/getUpdate", function(req, res) {
    res.set("Content-Security-Policy", "default-src 'self'");
    UpdateData = JSON.stringify(req.body);
  
    res.send(req.body);
    console.log(UpdateData);
    console.log(typeof UpdateData);
  if (UpdateData !== "{}"){
  fs.writeFile(pathOfFile, JSON.parse(JSON.stringify(UpdateData, null, 2)), function (err) {
      if (err) throw err;
      console.log('Saved!');
      })};
  
});


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
app.get("/edit", function(request, response) {
  response.sendFile(__dirname + "/views/edit.html");
});
app.get("/info", function(request, response) {
  loadTable(response);
});
app.get("/blankTable", function(request, response){
        loadBlankTable(response);
});
app.get("/checkEdit", function(request, response){
        response.send(ActualEdit);
        console.log("CheckEdit received!");
        if (!ActualEdit)
        {
          ActualEdit = true;
        };
});

app.get("/finishedEdit", function(req, res) {
  ActualEdit = false;
  res.send("Finished");
  console.log("Received finishedEdit");
});


router.post("/handle",(request,response) => {
//code to perform particular action.
//To access POST variable use req.body()methods.
console.log(request.body);
});

// add router in the Express app.
app.use("/", router);

app.set('port', 3000);

//const { exec } = require("child_process");




// listen for requests :) 
const listener = app.listen(app.get('port'), function() {
console.log("Your app is listening on port " + listener.address().port);
});
