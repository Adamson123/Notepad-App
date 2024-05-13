import dayjs from "../../package/esm/index.js";



function getDate(time) {
  const today = dayjs();
  if (time === "year") {
    return today.format('YY');
  } else if (time === "day") {
    return today.format('DD');
  } else if (time === "hour") {
    return today.format('h') + today.format('a');
  } else if (time === "minute") {
    return today.format('MM');
  } else {
    return today.format('ss');
  }
}

export default getDate;
