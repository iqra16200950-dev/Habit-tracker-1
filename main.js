// Get the date
let date = new Date();
console.log(date);

//Extract the current date info
let currentMonth = date.getMonth();
let currentDay = date.getDay();
let currentDate = date.getDate();
let currentYear = date.getFullYear();

// current month -1| day of the week| current date/number| current year
console.log(currentMonth, currentDay, currentDate, currentYear);

// Date info - Array
let months = [
    "January",      //0
    "February",     //1
    "March",        //2
    "April",        //3
    "May",          //4
    "June",         //5
    "July",         //6
    "August",       //7
    "September",    //8
    "October",      //9
    "November",     //10
    "December"      //11
];

// Set the correct month
let title = document.getElementById("title");
title.innerHTML = `&#128151;${months[currentMonth]}&#128151;`;

// Update the calendar info - Habit Title
let habitTitle = document.getElementById("habitTitle");
let habit = localStorage.getItem("habit");

    //Setting the habit onClick
habitTitle.onclick = () => {

    let habits = prompt("What\'s your habit?", habitTitle.innerHTML);
    if(habits.length == 0){
        habit = localStorage.setItem("habit", "Click to set your habit");
        habitTitle.innerHTML = "Click to set your habit";
    }else{
        habit = localStorage.setItem("habit", habits);
        habitTitle.innerHTML = habits;
    }
}
    //Keeping the habit title even after refresh page
if (habit === null) {
    habit = localStorage.setItem("habit", "Click to set your habit");
    habitTitle.innerHTML = "Click to set your habit";
} else {
    habitTitle.innerHTML = localStorage.getItem("habit");
}
console.log(`habit: ${habit}`);

// Set the total days
let daysInTheMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let daysInThisMonth = daysInTheMonthList[currentMonth];

let daysCompleted = 0;
let totalDays = document.getElementById("totalDays");
totalDays.innerHTML = `0/${daysInThisMonth}`;

// Setup the calendar days
let dayCount = 0;
let rowCount = 0;

let days = document.getElementsByClassName("days");
for (let i = 0; i < days.length; i++) {
    let day = days[rowCount].getElementsByClassName("day");
    for (let j = 0; j < day.length; j++) {

        if (dayCount == currentDate - 1) {
            day[j].setAttribute("style", "color:pink");
            day[j].setAttribute("style", "border:2px solid black");
        }
        if (dayCount < daysInThisMonth) {
            day[j].innerHTML = dayCount + 1;
            day[j].setAttribute("id", "day" + (dayCount +1));
            dayCount++;
        } else {
            day[j].innerHTML = "";
            day[j].setAttribute("style", "background-color:rgb(247, 222, 247)");
        }
    }
    rowCount++;
}

// Setting day completed - array
let completed = new Array(31);
for (let i = 0; i < dayCount; i++) {
    var tempString = `${currentMonth + 1}-${i + 1}-${currentYear}`;
    //console.log(`storing date: ${tempString}`);
    var tempDay = localStorage.getItem(tempString);
    //console.log(tempDay);
    if (tempDay == null || tempDay == "false") {
        localStorage.setItem(tempString, false);
    } else if (tempDay == "true") {
        daysCompleted++;
    }
    totalDays.innerHTML = `${daysCompleted}/${daysInThisMonth}`;
}
//console.log(`completed array: ${completed}`);
//console.log(`total days completed: ${daysCompleted}`);

// Check storage and update completed array
for (let i = 0; i < currentDate; i++) {
    var tempString = `${currentMonth + 1}-${i + 1}-${currentYear}`;
    console.log(tempString);

    var chosenDay = localStorage.getItem(tempString);
//    console.log(`${i +1}: ${chosenDay}`);
    var chosenDayDiv = document.getElementById(`day${i + 1}`);
    if (chosenDay === "true") {
        chosenDayDiv.style.backgroundColor = "pink";
    } else if (chosenDay === "false") {
        chosenDayDiv.style.backgroundColor = "rgb(247, 222, 247)";
    }
}

// Update completed on calendar
var dayDivs = document.querySelectorAll(".day");
for (let i = 0; i < currentDate; i++) {
    dayDivs[i].onclick = (e) => {
        var num = e.target.innerText;
        var selectedDate = document.getElementById(e.target.id);
        var storageString = `${currentMonth + 1}-${num}-${currentYear}`;

        if (localStorage.getItem(storageString) === "false"){
            selectedDate.style.backgroundColor = "pink";
            localStorage.setItem(storageString, true);
            daysCompleted++;
        } else if (localStorage.getItem(storageString) === "true"){
            selectedDate.style.backgroundColor = "rgb(247, 222, 247)";
            localStorage.setItem(storageString, false);
            daysCompleted--;
        }
        totalDays.innerHTML = `${daysCompleted}/${dayCount}`;
        console.log(daysCompleted, currentDate);
        if (daysCompleted === currentDate) {
            alert("Great progress !");
        }
    }
}

// Reset button
var resetButton = document.getElementById("resetButton");
resetButton.onclick = () => {
    for (let i = 0; i < dayCount; i++) {
        var tempStrings = `${currentMonth + 1}-${i + 1}-${currentYear}`;
        console.log(tempStrings);
        localStorage.setItem(tempStrings, "false");
        var curDay = document.getElementById(`day${i + 1}`);
        curDay.style.backgroundColor = "white";
    }
    daysCompleted = 0;
    totalDays.innerHTML = `${daysCompleted}/${daysInThisMonth}`;
    habitTitle.innerHTML = "Click to set your habit";
};