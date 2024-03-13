function getDayOfYear(date) {
  var start = new Date(date.getFullYear(), 0, 0);
  var diff = date - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var dayOfYear = Math.floor(diff / oneDay);
  return dayOfYear;
}



function getDate(time) {
  const today = new Date();

  if (time === "year") {
    return today.getFullYear().toString().slice(2);
  } else if (time === "day") {
    return getDayOfYear(today)
  } else if (time === "hour") {
    return today.getHours();
  } else if (time === "minute") {
    return today.getMinutes();
  } else {
    return today.getSeconds();
  }
}

export default getDate;
