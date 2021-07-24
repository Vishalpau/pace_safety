import validator from "validator";

function ActivityDetailValidate(data) {

  const error = [];
  let isValid = true;
  for (let key in data) {
    const dataObj = data[key];
    if (dataObj) {
      if (validator.isEmpty(dataObj.answer.toString())) {
        dataObj.error = "Please select any one";
        isValid = false;
      } else {
        dataObj.error = "";
      }
      error.push(dataObj);
      continue;
    }

    error.push(dataObj);
  }

  return { error, isValid };
}

export default ActivityDetailValidate;
