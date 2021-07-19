import validator from "validator";

function AdditionalDetailValidate(data) {
  console.log("data", data);

  const error = [];
  let isValid = true;
  for (let key in data) {
    const dataObj = data[key];
    if (dataObj) {
      if (validator.isEmpty(dataObj.answer.toString())) {
        dataObj.error = "please enter label name";
        error.push(dataObj);
        isValid = false;
      } else {
        dataObj.error = "";
      }
      error.push(dataObj);
      continue;
    }
    error.push(dataObj);
  }
  console.log("------", error, isValid);
  return { error, isValid };
}

export default AdditionalDetailValidate;
