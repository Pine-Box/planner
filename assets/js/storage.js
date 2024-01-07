import {payloadKey,initialPayload,timeoffset} from "./data.js";

export function savePayloodToLocalStorage(payload) {
    console.log("savePayloodToLocalStorage: ", payload)
    localStorage.setItem(payloadKey, JSON.stringify(payload));
    return payload;
}


export function saveCurrentDayToLocalStorage(day) {
    console.log("saveCurrentDayToLocalStorage: ", day);
    let payload = getPayloadFromLocalStorage();
    payload["currentDay"] = day;
    console.log("currentDay to local", payload);
    localStorage.setItem(payloadKey, JSON.stringify(payload));
}

export function saveEventtoLocalStorage(row, eventText) {
    console.log("eventstore: ", row, eventText);
    let payload = getPayloadFromLocalStorage();
    let key = Number(row + timeoffset).toString();
    payload[key]["event"] = eventText;
    console.log("Event to local", payload);
    localStorage.setItem(payloadKey, JSON.stringify(payload));
}

//loads local storage without updating the event text
export function getPayloadFromLocalStorage() {
    let payload = localStorage.getItem(payloadKey);
    console.log("loadstorage: ", payload);
    if (payload != null)
        return JSON.parse(payload);
    return null;
}


export function initialiseLocalStorage(day) {
    let payload = initialPayload;
    payload["currentDay"] = day;
    payload = savePayloodToLocalStorage(initialPayload);
    console.log("initialiseLocalStorage : ", payload);
    return payload;
}

export function clearStorage() {
    console.log('clearstorage')
    localStorage.removeItem(payloadKey);
}



