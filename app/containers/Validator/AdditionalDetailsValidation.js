import validator from "validator";

function AdditionalDetailValidate(data) {

  const error = [];
  let isValid = true;
  for (let key in data) {
    const dataObj = data[key];
    if (dataObj) {
      if (validator.isEmpty(dataObj.answer.toString())) {
        if(dataObj.question == "Any part/equipment sent for analysis"){
          dataObj.error = "Please enter equipment";
        error.push(dataObj);
        isValid = false;
        }else if (dataObj.question == "Evidence analysis notes"){
          dataObj.error = "Please enter evidence analysis";
        error.push(dataObj);
        isValid = false;
        }else if (dataObj.question == "Evidence summary"){
          dataObj.error = "Please enter evidence summary";
        error.push(dataObj);
        isValid = false;
        }else if (dataObj.question == "Additional notes if any"){
          dataObj.error = "Please enter additional notes";
        error.push(dataObj);
        isValid = false;
        }
        
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

export default AdditionalDetailValidate;
