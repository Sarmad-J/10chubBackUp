//var fs = require("fs");
//var moment = require('moment');
//moment().format();

var JSONRequest = new XMLHttpRequest();
let FeedBackEdit = document.getElementById("FeedBackEditDiv");

let butn = document.getElementById("SubmitChanges");
//let Addbutn = document.getElementById("AddIcon");
let box = document.getElementById("EditInputBox");
var jsonFile;
var isExist = false;


//const path =
  //"/WorkFile/Work_" + moment().years() + "_" + moment().week();

butn.addEventListener("click", (event) => {
  //SubmitEdit();
});/*
Addbutn.addEventListener("click", (event) => {
  AddItem();
});
/*
JSONRequest.open("GET", "https://10chub.glitch.me/JSON&Data/HomeworkTable.json");
JSONRequest.onload = function () {
  if (JSONRequest.status >= 200 && JSONRequest.status < 400) {
    jsonFile = JSON.parse(JSONRequest.responseText);
    if (isExist) {
      JSONRequest.send();
    } else {
      fs.writeFile(
          "Work_" + moment().week() + "_" + moment().years() + ".json",
          JSONRequest.responseText,
            function (err) {
            if (err) throw err;
               console.log("File is created successfully.");
         
        }}}}
        else {
          console.log("We connected to the server, but it returned an error.");
        }
        JSONRequest.onerror = function () {
          console.log("Connection error");
        }};
*/
function AddItem()
{
  
}


 
function UpdateHTML() {
  console.log("DATA :");
  console.dir(ourData);
  //FeedBackEdit.insertAdjacentHTML('beforeend', "Bearbeiten Erfolgreich!");
}
