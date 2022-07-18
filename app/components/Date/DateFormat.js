import moment from "moment";

/**
 * @file - DateFormat.js
 * @location /app/components/Date/DateFormat.js
 * @description Serves the required date format as dd-mmm-yyyy + time
 * @author Abhimanyu Soni <abhimanyus@teknobuilt.com>
 * @since v1.1.0
 **/

/**
 * function name: DateFormat
 * function description: Serves the required date format as dd-mmm-yyyy + time
 * @param string value - original date value with time
 * @param boolean time - pass as true if want to show time as well (default false)
 * @since v1.0.0
 * @author Abhimanyu Soni <abhimanyus@teknobuilt.com>
 * @example DateFormat(value, true/false/null);
 **/

const DateFormat = (value, time) => {
  if (time) {
    return moment(value).format("DD-MMM-YYYY, h:mm:ss a");
  } else {
    return moment(value).format("DD-MMM-YYYY");
  }
};

export default DateFormat;
