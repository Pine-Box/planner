const payloadKey = "payload"


const initialPayload = {
    "currentDay" : "",
    "9": {"event": ""},
    "10": {"event": ""},
    "11": {"event": ""},
    "12": {"event": ""},
    "13": {"event": ""},
    "14": {"event": ""},
    "15": {"event": ""},
    "16": {"event": ""},
    "17": {"event": ""},
    "18": {"event": ""},
};

const timeoffset = 9;

// save reference to important DOM elements
let currentDayElement = $('#currentDay');
let saveEl = $(".save");


// displays the current day
function displayDate() {
    let today = getCurrentDay();
    currentDayElement.text(today);

}

function getCurrentDay(){
   return dayjs().format('dddd DD MMMM [,] YYYY');
}

//gets the current hour (in 24hr time) when page refreshed
// this is used to set the row colors
function getCurrentHour() {
    return Number(dayjs().format('HH'));
}

//sets any initial input Event text
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
        $(btn).parent().css("background-color", "blue");
    });
}

// saves payload back to local storage
function saveStorage(payload){
    console.log("saveLocal: ", payload)
   localStorage.setItem(payloadKey,JSON.stringify(payload));
    return payload;
}

function saveToLocalCurrentDay(day){
    console.log("saveToLocalCurrentDay: ", day);
    let payload = loadStorage();
    payload["currentDay"] = day;
    console.log("currentDay to local", payload);
    localStorage.setItem(payloadKey,JSON.stringify(payload) );
}

function saveEventtoLocalStorage(row , eventText) {
    console.log("eventstore: ", row, eventText);
    let payload = loadStorage();
    let key = Number(row + timeoffset).toString();
    payload[key]["event"] = eventText;
    console.log("Event to local", payload);
    localStorage.setItem(payloadKey,JSON.stringify(payload) );
}

//loads local storage without updating the event text
function loadStorage(){
    let payload = localStorage.getItem(payloadKey);
    console.log( "loadstorage: ", payload) ;
    if (payload != null)
        return  JSON.parse(payload);
    return null;
}


function initialiseLocalStorage(day){
         let payload = initialPayload;
         payload["currentDay"] = day;
         payload = saveStorage(initialPayload);
        console.log("initialiseLocalStorage : ", payload);
        return payload;
}

//loads the local storage and refreshes the input event text
function initLoadStorage() {
     let day = getCurrentDay();
     let payload = loadStorage();
     if (payload === null) {
        return initialiseLocalStorage(day);
    }
    if (day === payload["currentDay"]){
    //set input text values
        let propertyName = "";
        for (let i = 9; i < 12; i++) {
            let row = (i - 9);
            let propertyName = i.toString();
            console.log(row, payload[propertyName]["event"])
            setInputEventText(row, payload[propertyName]["event"]);

        }
    } else {
        payload = initialiseLocalStorage(day);
    }
    return payload;
}

function saveDayEvent(event) {
    console.log('saveDayEvents', event);
    event.preventDefault();
    let payload = loadStorage();
    let btnid = event["target"].getAttributeNode("id").value;
    let inputid = btnid.replace("btn", "input")
    let row = Number(btnid.replace("btn",""));
    let eventText = $('#'+inputid).val();
    console.log("save event text", row, eventText);
    saveEventtoLocalStorage(row, eventText);
}

function clearStorage() {
    console.log('clearstorage')
    localStorage.removeItem(payloadKey);
}

function init() {
    //clearStorage();
    initLoadStorage();
    let currentHour = getCurrentHour();
    setBgColorRow(currentHour);
}

init();
displayDate();

saveEl.on('click', saveDayEvent);