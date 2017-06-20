function date(year,month,day) {

    let date = new Date(year, month-1, day);
    let Day = 24*60*60*1000;
    let nextDate = new Date(date.getTime() + Day);
    return nextDate.getFullYear() + "-" + (nextDate.getMonth() + 1) + '-' + nextDate.getDate();
}

console.log(date(2016,9,30));