// save reference to important DOM elements
let currentDayEl = $('#currentDay');
let saveEl = $(".save");

const payloadKey = "payload"
const numofrows = 8;



// handle displaying the time
function displayTime() {
  let today = dayjs().format('dddd DD MMMM [,] YYYY');
  console.log(today);
  console.log(currentDayEl);
  currentDayEl.text(today);
}

function saveStorage(storeEvents){
  localStorage.setItem(payloadKey,JSON.stringify(storeEvents));
}

function loadStorage(item){
  let storage = JSON.parse(localStorage.getItem(payloadKey
));
  if (storage === null){
    localStorage.setItem(payloadKey, JSON.stringify([]));
  }
  if (item !== null){
    localStorage.setItem(payloadKey, JSON.stringify(item));
  }
  return storage;
}

function saveDayEvents(event){
  event.preventDefault();
  let row = $(event.target).attr('dataindex');
  console.log(row);
  saveStorage({"eventTime":19,"event":"test"});
}

function setEventText(row, text){
  console.log('setEventText')
$('table > tbody  > tr').each(function(index, tr) {
   console.log(index);
   console.log(tr);
   $(tr.cells[1]).text('help me') ;
});
}

function setBgColorRow(row , color){
  console.log('color rows')
$('table > tbody  > tr').each(function(index, tr) {
   console.log(index);
   console.log(tr);
   $(tr).css('background-color', 'green');
   $(tr.children[1].firstChild).css('background-color', 'green');
   $(tr.children[2]).css('background-color', 'blue');
});
}

function init(){
  loadStorage(null);
  setBgColorRow(1,'yellow');
}

init();
displayTime();

saveEl.on('click', saveDayEvents);