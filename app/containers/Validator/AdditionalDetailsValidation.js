import validator from "validator";

function AdditionalDetailValidate(data) {
  console.log("data", data);

  const error = [];
  let isValid = true;
  for (let key in data) {
    const dataObj = data[key];
    if (dataObj) {
      if (validator.isEmpty(dataObj.answer.toString())) {
        dataObj.error = "This filed is empty";
        error.push(dataObj);
        isValid = false;
        continue;
      }
    }

    error.push(dataObj);
  }

  // if(data[1]){
  //     {if (validator.isEmpty(data[1].answer.toString()))
  //         error.answer = "this filed is empty"
  //     }
  // }
  console.log("------", error, isValid);
  return { error, isValid };
}

export default AdditionalDetailValidate;
