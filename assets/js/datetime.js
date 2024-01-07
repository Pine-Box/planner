//formats the current day
export function getCurrentDay() {
    return dayjs().format('dddd DD MMMM [,] YYYY');
}

//gets the current hour (in 24hr time) when page refreshed
// this is used to set the row colors
export function getCurrentHour() {
    return Number(dayjs().format('HH'));
}