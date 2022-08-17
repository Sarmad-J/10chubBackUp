var Buttonsrc_H =
  "https://cdn.glitch.global/44390784-7e95-45e7-b832-fab882e58d98/plus.png?v=1660477909955";
var Buttonsrc_M =
  "https://cdn.glitch.global/44390784-7e95-45e7-b832-fab882e58d98/plus.png?v=1660477909955";

var ClickSubmit = 0;

var DropdownValue_H;
var DropdownValue_M;

var ourRequest = new XMLHttpRequest();
var tableH = document.getElementById("TableToday");
var tableM = document.getElementById("TableTommorow");

var EditRequest = new XMLHttpRequest();
EditRequest.open("POST", "https://10chub.glitch.me/edit");

var daysWords = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var daysWordsGerman = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];
const now = new Date();

let FeedBackEditDiv = document.getElementById("FeedBackEditDiv");

now.setDate(now.getDate());

const tod = new Date();
tod.setDate(tod.getDate() + 1);
const tom = new Date();
tom.setDate(tom.getDate() + 2);

var today = tod.getDay();
var tommorow = tom.getDay();
var ourData;
var UpDa;
var ii;
var Valid = false;

if (today === 6) {
  tod.setDate(tod.getDate() + 2);
}
if (today === 0) {
  tod.setDate(tod.getDate() + 1);
}
if (tommorow === 6) {
  tom.setDate(tom.getDate() + 2);
}
if (tommorow === 0) {
  tom.setDate(tom.getDate() + 2);
}
if (tommorow === 1) {
  tom.setDate(tom.getDate() + 1);
}

var today = tod.getDay();
var tommorow = tom.getDay();

ourRequest.open("GET", "https://10chub.glitch.me/info");
ourRequest.onload = function () {
  if (ourRequest.status >= 200 && ourRequest.status < 400) {
    ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData);
  } else {
    console.log("We connected to the server, but it returned an error.");
  }

  ourRequest.onerror = function () {
    console.log("Connection error");
  };

  if (window.location.href === "https://10chub.glitch.me/edit") {
    //console.log("Works");
    let butn = document.getElementById("SubmitChanges");
    butn.addEventListener("click", (event) => {
      console.log("Click of SubmitChangesButton");
      SubmitEdit();
    });
  }
};

ourRequest.send();

function renderHTML(data) {
  renderTable(today, tableH, "");
  renderTable(tommorow, tableM, "");

  if (UpdateHTML !== undefined) {
    UpdateHTML();
  }
}

var tableEdit;

function renderTable(index, tableElement, inputText, DisableDel) {
  if (window.location.href === "https://10chub.glitch.me/edit") {
    var Edit = true;
  } else {
    var Edit = false;
  }

  tableEdit = "<table>";
  if (Edit) {
    tableEdit += `
    <tr>
  <td>
    <select id="fach_${index}" name="Fächer" >
    <!--<option value="">---Bitte wähle ein Fach---</option>-->
    <option value="Deutsch" id="Deutsch_${index}">Deutsch</option>
    <option value="Mathe" id="Mathe_${index}">Mathe</option>
    <option value="Erdkunde" id="Erdkunde_${index}">Erdkunde</option>
    <option value="Englisch" id="Englisch_${index}">Englisch</option>
    <option value="Kunst" id="Kunst_${index}">Kunst</option>
    <option value="Chemie" id="Chemie_${index}">Chemie</option>
    <option value="Informatik" id="Informatik_${index}">Informatik</option>
    <option value="Latein" id="Latein_${index}">Latein</option>
    <option value="Latein (Zusatzkurs)" id="Latein (Zusatzkurs)_${index}">Latein (Zusatzkurs)</option>
    <option value="Ethik" id="Ethik_${index}">Ethik</option>
    <option value="Katholische Religion" id="Katholische Religion_${index}">Katholische Religion</option>
    <option value="Evangelische Religion" id="Evangelische Religion_${index}">Evangelische Religion</option>
    <option value="Sport" id="Sport_${index}">Sport</option>
    <option value="Spanisch" id="Spanisch_${index}">Spanisch</option>
    <option value="Geschichte" id="Geschichte_${index}">Geschichte</option>
    <option value="Physik" id="Physik_${index}">Physik</option>
    <option value="Französisch" id="Französisch_${index}">Französisch</option>
  </select>
  </td>
  <td>
  <input type="text" id="TextFieldInput_${index}" value=${inputText}>
  </td>
  <td></td>
  <td>`;
    if (index === today) {
      tableEdit += `<img src= "${Buttonsrc_H}" class = "AddIcon" id="AddIcon_${index}" onclick="submit_addFunction(0, ${index})">`;
    } else {
      tableEdit += `<img src= "${Buttonsrc_M}" class = "AddIcon" id="AddIcon_${index}" onclick="submit_addFunction(0, ${index})">`;
    }
    `</td>
  </tr>
  `;
  }

  tableEdit += `
  <tr><th>Fächer</th><th>Aufgaben</th><th></th><th></th></tr>
  `;
  var htmlString = tableEdit;

  for (ii = 0; ii < ourData[index].Subjects.length; ii++) {
    if (Edit) {
      htmlString += `<tr>
                           <td id='SubjectPlace'>${
                             ourData[index].Subjects[ii]
                           }</td>
                           <td>${ourData[index].Work[ii].replace(
                             /[^\w\-]+/g,
                             ""
                           )}</td>
                           <td id="IconTD">
  <img src="https://cdn.glitch.global/44390784-7e95-45e7-b832-fab882e58d98/pencil_Icon.png?v=1660477476523" id="Icon" onclick="editFunction(${ii}, ${index})">
  </td>`;
      if (DisableDel) {
        htmlString += `<td id="IconTD">
  <img src="https://cdn.glitch.global/44390784-7e95-45e7-b832-fab882e58d98/delete_Icon.png?v=1660477125278" id="DelIcon" style = "opacity: 0.4;" class = "DelButton_${index}">
  </td>
                        </tr>`;
      } else {
        htmlString += `<td id="IconTD">
  <img src="https://cdn.glitch.global/44390784-7e95-45e7-b832-fab882e58d98/delete_Icon.png?v=1660477125278" id="DelIcon" onclick="delFunction(${ii}, ${index})" style = "opacity: 1;" class = "DelButton_${index}">
  </td>
                        </tr>`;
      }
    } else {
      htmlString += `<tr>
                           <td id='SubjectPlace'>${ourData[index].Subjects[ii]}</td>
                           <td>${ourData[index].Work[ii]}</td>
                           <td></td><td></td>
                        </tr>`;
    }

    /*
        htmlString += "<tr>";
        htmlString += "<td id='SubjectPlace'>" + data[today].Subjects[ii] + "</td>";
        htmlString += "<td>" + data[today].Work[ii] + "</td>";
        htmlString += "</tr>";
        */
  }

  htmlString += "</table>";

  tableElement.insertAdjacentHTML("beforeend", htmlString);
}
var fachID;
var selectElement;
var selectValue;
var inputElement;

var editID;

function editFunction(item, index) {
  const actualObject = ourData;
  var selectedWork = JSON.stringify(actualObject[index].Work[item]);
  var subjectElement = actualObject[index].Subjects[item];
  if (today === index) {
    Buttonsrc_H =
      "https://cdn.glitch.global/44390784-7e95-45e7-b832-fab882e58d98/content-save-edit.png?v=1660575148143";
  } else {
    Buttonsrc_M =
      "https://cdn.glitch.global/44390784-7e95-45e7-b832-fab882e58d98/content-save-edit.png?v=1660575148143";
  }

  if (today === index) {
    tableH.innerHTML = "";
    renderTable(index, tableH, selectedWork, true);
    console.log(selectedWork);
  } else {
    tableM.innerHTML = "";
    renderTable(index, tableM, selectedWork, true);
  }

  console.log(document.getElementById("fach_" + index).value);
  document.getElementById("fach_" + index).value = subjectElement;
  editID = actualObject[index].Subjects.indexOf(subjectElement);
  UpDa = JSON.stringify(actualObject);
}

function delFunction(item, index) {
  const actualObject = ourData;
  actualObject[index].Subjects.splice(item, 1);
  console.log(actualObject[index].Subjects);
  actualObject[index].Work.splice(item, 1);

  if (today === index) {
    tableH.innerHTML = "";
    renderTable(index, tableH, "");
  } else {
    tableM.innerHTML = "";
    renderTable(index, tableM, "");
  }
  UpDa = JSON.stringify(actualObject);
}

function submit_addFunction(item, index) {
  if (
    document.getElementById("AddIcon_" + index).src ===
    "https://cdn.glitch.global/44390784-7e95-45e7-b832-fab882e58d98/plus.png?v=1660477909955"
  ) {
    Valid = false;
    ValidInput(index, "plus");
    if (Valid) {
      console.dir(ourData[index]);
      selectElement = document.getElementById("fach_" + index);
      selectValue = selectElement.options[selectElement.selectedIndex].value;
      fachID = document.getElementById(selectValue + "_" + index);
      inputElement = document.getElementById("TextFieldInput_" + index);
      console.log(fachID);
      const actualObject = ourData;

      actualObject[index].Subjects.push(fachID.innerHTML);
      actualObject[index].Work.push(inputElement.value);

      if (index === today) {
        tableH.innerHTML = "";
        renderTable(index, tableH, "");
        console.log("Heute");
      } else {
        tableM.innerHTML = "";
        renderTable(index, tableM, "");
        console.log("Morgen");
      }
      UpDa = JSON.stringify(actualObject);
    }
  } else {
    ValidInput(index, "submit");

    if (Valid) {
      console.log("Test");
      const actualObject = ourData;
      selectElement = document.getElementById("fach_" + index);
      selectValue = selectElement.options[selectElement.selectedIndex].value;
      fachID = document.getElementById(selectValue + "_" + index);
      inputElement = document.getElementById("TextFieldInput_" + index);

      //var id = actualObject[index].Subjects.indexOf(fachID.innerHTML);
      var id = selectElement.options[selectElement.selectedIndex];
      var subject = selectElement.options[selectElement.selectedIndex].value;
      console.log(id);

      actualObject[index].Work[editID] = inputElement.value;
      actualObject[index].Subjects[editID] = subject;
      if (today === index) {
        Buttonsrc_H =
          "https://cdn.glitch.global/44390784-7e95-45e7-b832-fab882e58d98/plus.png?v=1660477909955";
      } else {
        Buttonsrc_M =
          "https://cdn.glitch.global/44390784-7e95-45e7-b832-fab882e58d98/plus.png?v=1660477909955";
      }

      if (index === today) {
        tableH.innerHTML = "";
        renderTable(index, tableH, "", false);
        console.log("Heute");
      } else {
        tableM.innerHTML = "";
        renderTable(index, tableM, "", false);
        console.log("Morgen");
      }

      UpDa = JSON.stringify(actualObject);
    }
  }
}

function SubmitEdit() {
  if (ClickSubmit === 0) {
    ClickSubmit += 1;
    var UpdateRequest = new XMLHttpRequest();

    UpdateRequest.open("POST", "https://10chub.glitch.me/getUpdate");

    UpdateRequest.setRequestHeader("Accept", "application/json");
    UpdateRequest.setRequestHeader("Content-Type", "application/json");

    UpdateRequest.onload = () => console.log(UpdateRequest.responseText);

    UpdateRequest.onload = function () {
      if (UpdateRequest.status >= 200 && UpdateRequest.status < 400) {
      } else {
        console.log("We connected to the server, but it returned an error.");
      }

      UpdateRequest.onerror = function () {
        console.log("Connection error");
      };
    };
    UpdateRequest.send(UpDa);

    var FinishEditPost = new XMLHttpRequest();
    console.log("Sending finishedEdit");
    FinishEditPost.open("GET", "https://10chub.glitch.me/finishedEdit");
    FinishEditPost.send();
    FinishEditPost.onload = function () {
      window.open("https://10chub.glitch.me/", (name = "_self"));
    };
    console.log("It has worked!");
  }
}

function ValidInput(index, type) {
  var Obj;

  if (UpDa === undefined) {
    Obj = ourData;
  } else {
    Obj = JSON.parse(UpDa);
  }
  var ValidNumber = 0;

  let x = document.getElementById("TextFieldInput_" + index).value;
  if (x === "") {
    alert("Das Feld darf nicht leer sein!");
  } else if (x.length > 300) {
    alert("Deine Antwort ist zu lang!");
  } else {
    ValidNumber += 1;
  }
  if (type === "plus") {
    let y = document.getElementById("fach_" + index).value;
    if (Obj[index].Subjects.indexOf(y) !== -1) {
      alert("Das Fach existiert bereits!");
    } else {
      ValidNumber += 1;
    }

    if (ValidNumber === 2) {
      Valid = true;
    } else {
      Valid = false;
    }
  } else {
    if (ValidNumber === 1) {
      Valid = true;
    } else {
      Valid = false;
    }
  }
}

if (window.location.href === "https://10chub.glitch.me/") {
  var EditButton = document.getElementById("SubmitEdit");

  EditButton.addEventListener("click", (event) => {
    var EditPossibleRequest = new XMLHttpRequest();
    EditPossibleRequest.open("GET", "https://10chub.glitch.me/checkEdit");

    EditPossibleRequest.send();

    EditPossibleRequest.onload = function () {
      if (
        EditPossibleRequest.status >= 200 &&
        EditPossibleRequest.status < 400
      ) {
        var EditCheck = EditPossibleRequest.responseText;
        console.log(
          "Response of EditCheck: " + EditPossibleRequest.responseText
        );
        console.log(
          "Type of the Response: " + typeof EditPossibleRequest.responseText
        );
        if (EditCheck === "false") {
          window.open("https://10chub.glitch.me/edit", (name = "_self"));
        } else {
          alert("Gerade bearbeitet jemand schon die Tabelle!");
        }
      } else {
        console.log("We connected to the server, but it returned an error.");
      }

      EditPossibleRequest.onerror = function () {
        console.log("Connection error");
      };
    };
  });
}
