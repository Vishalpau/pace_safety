import moment from "moment";

const DateFormat = (value, time) => {
  if (time) {
    return moment(value).format("DD-MMM-YYYY, h:mm:ss a");
  } else {
    return moment(value).format("DD-MMM-YYYY");
  }
};

export default DateFormat;
