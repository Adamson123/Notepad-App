function getDate(time) {
  const today = new Date();

  if (time === "year") {
    return today.getFullYear().toString().slice(2);
  } else if (time === "day") {
    return today.getDays();
  } else if (time === "hour") {
    return today.getHours();
  } else if (time === "minute") {
    return today.getMinutes();
  } else {
    return today.getSeconds();
  }
}

export default getDate;
