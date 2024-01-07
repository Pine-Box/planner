import {payloadKey,initialPayload,timeoffset} from "./data.js";

//saves the payload directly to local storage
export function savePayloodToLocalStorage(payload) {
    localStorage.setItem(payloadKey, JSON.stringify(payload));
    return payload;
}


//saves the current day to local storage
export function saveCurrentDayToLocalStorage(day) {
    let payload = getPayloadFromLocalStorage();
    payload["currentDay"] = day;
    savePayloodToLocalStorage(payload);
}

//loads payload from local storage and updates the event before saving the payload
export function saveEventtoLocalStorage(row, eventText) {
    let payload = getPayloadFromLocalStorage();
    let key = Number(row + timeoffset).toString();
    payload[key]["event"] = eventText;
    savePayloodToLocalStorage(payload);
}

//loads local storage without updating the event text
export function getPayloadFromLocalStorage() {
    let payload = localStorage.getItem(payloadKey);
    if (payload != null)
        return JSON.parse(payload);
    return null;
}


// initialises the planner when its a new day
export function initialiseLocalStorage(day) {
    let payload = initialPayload;
    payload["currentDay"] = day;
    payload = savePayloodToLocalStorage(initialPayload);
    return payload;
}

//clears the local storage planner
export function clearStorage() {
    localStorage.removeItem(payloadKey);
}



