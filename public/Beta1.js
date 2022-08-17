"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var daysWords = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var daysWordsGerman = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
const now = new Date();
now.setDate(now.getDate());
var actualDate = document.getElementById("ActualTime");
actualDate.textContent = daysWordsGerman[now.getDay()] + ", " + now.toLocaleString("de-DE");
//console.log(daysWordsGerman[now.getDay()]);
now.setDate(now.getDate() + 1);
var WeekendDay = daysWords[now.getDay()];
const tom = new Date();
tom.setDate(tom.getDate() + 2);
const today = document.getElementById("HeadingDayH");
const tommorow = document.getElementById("HeadingDayM");
var dayCounter = 0;
if (now.getDay() === 6) {
    now.setDate(now.getDate() + 2);
    today.textContent = "Für Montag, den " + now.toLocaleDateString('de-DE');
}
else if (now.getDay() === 0) {
    now.setDate(now.getDate() + 1);
    today.textContent = "Für Montag, den " + now.toLocaleDateString("de-DE");
}
else {
    today.textContent = "Für Morgen, den " + now.toLocaleDateString("de-DE");
}
if (tom.getDay() === 6) {
    tom.setDate(tom.getDate() + 2);
    tommorow.textContent = "Für Montag, den " + tom.toLocaleDateString("de-DE");
}
else if (tom.getDay() === 0) {
    tom.setDate(tom.getDate() + 2);
    tommorow.textContent = "Für Dienstag, den " + tom.toLocaleDateString("de-DE");
}
else if (tom.getDay() === 1) {
    tom.setDate(tom.getDate() + 1);
    tommorow.textContent = "Für Dienstag, den " + tom.toLocaleDateString("de-DE");
}
else {
    tommorow.textContent = "Für Übermorgen, den " + tom.toLocaleDateString("de-DE");
}
//tommorow.textContent = "Für Übermorgen, den " + tom.toLocaleDateString();
const tableH = document.getElementsByClassName("TableToday");
const tableM = document.getElementsByClassName("TableTommorow");
/*
const days = fs.readFileSync('example.csv', {
    encoding: 'utf-8'
}).split('\n').map((row: string): string[] =>
{
    return row.split(',');
})

for (let day of days)
{
    if (day[0] === WeekendDay)
    {
        console.log(day[0]);
    }
}

const TestHeader = document.getElementById("Heading");
TestHeader.textContent = WeekendDay;*/ 
//# sourceMappingURL=Beta1.js.map
