// save reference to important DOM elements
import {getCurrentDay, getCurrentHour} from "./datetime.js";
import {initialiseLocalStorage, getPayloadFromLocalStorage, saveEventtoLocalStorage, clearStorage} from "./storage.js";

import {timeoffset} from "./data.js"

let currentDayElement = $('#currentDay');
let saveElement = $(".save");


// displays the current day
function displayDate() {
    let today = getCurrentDay();
    currentDayElement.text(today);
}

//sets any input Event text
function setInputEventText(row, text) {
    $('input').each(function (index, input) {
        if (row === index) {
            console.log('setting input text', row, text);
            $(input).val(text);
        }
    });
}

// gets event text for a defined row
function getEventText(row) {
    $('input').each(function (index, input) {
        if (index === row) {
            return $(input).val();
        }
    });
}

//sets the alternative colors for rows that are outside the current hour
function setAlternativeColorRow(element, is_in_the_past) {
    if (is_in_the_past)
        element.css("background-color", "grey");
    else
        element.css("background-color", "orange");
}

//main function to set the rows colours for the current hour
function setBgColorRow(currentHour) {
    $("tbody > tr").each(function (index, tr) {
        if (currentHour === index + timeoffset)
            $(tr).css("background-color", "green");
        else
            setAlternativeColorRow($(tr), (currentHour > index + timeoffset))
    });
    $("input").each(function (index, input) {
        if (currentHour === index + timeoffset)
            $(input).css("background-color", "green");
        else
            setAlternativeColorRow($(input), (currentHour > index + timeoffset))

    });
    $("button").each(function (index, btn) {
        $(btn).parent().css("background-color", "#0d6efd;");
    });
}


//loads the local storage and refreshes the input event text
function initLoadStorage() {
    let day = getCurrentDay();
    let payload = getPayloadFromLocalStorage();
    if (payload === null) {
        return initialiseLocalStorage(day);
    }
    //check if local storage contains current day events
    // - true display events
    // - false clear all events and set current day
    if (day === payload["currentDay"]) {
        //set input text values
        for (let i = timeoffset; i < 19; i++) {
            let row = (i - timeoffset);
            let propertyName = i.toString();
            console.log(row, payload[propertyName]["event"])
            setInputEventText(row, payload[propertyName]["event"]);

        }
    } else {
        payload = initialiseLocalStorage(day);
    }
    return payload;
}

//eventlistener callback - saves event to local storage
function saveDayEvent(event) {
    console.log('saveDayEvents', event);
    event.preventDefault();
    let payload = getPayloadFromLocalStorage();
    let btnid = event["target"].getAttributeNode("id").value;
    let inputid = btnid.replace("btn", "input")
    let row = Number(btnid.replace("btn", ""));
    let eventText = $('#' + inputid).val();
    console.log("save event text", row, eventText);
    saveEventtoLocalStorage(row, eventText);
}


// initialises the scheduler and sets background colors
function init() {
    //clearStorage(); use this for debugging
    initLoadStorage();
    let currentHour = getCurrentHour();
    setBgColorRow(currentHour);
}

init();
displayDate();

saveElement.on('click', saveDayEvent);