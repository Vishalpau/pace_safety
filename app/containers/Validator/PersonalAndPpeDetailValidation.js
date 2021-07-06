import validator from "validator";

function PersonalAndPpeDetailValidate(data) {
  console.log(data);
  let isValid = true;
  const error = [];
  for (let key in data) {
    const dataObj = data[key];
    if (dataObj) {
      if (validator.isEmpty(dataObj.answer.toString())) {
        dataObj.error = "This field is empty";
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

  console.log(error);
  return { error, isValid };
}

export default PersonalAndPpeDetailValidate;
