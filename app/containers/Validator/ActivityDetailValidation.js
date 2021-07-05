import validator from "validator";

function ActivityDetailValidate(data) {
  console.log("data", data);

  const error = [];
  let isValid = true;
  for (let key in data) {
    console.log("key", key);
    const dataObj = data[key];
    if (dataObj) {
      if (validator.isEmpty(dataObj.answer.toString())) {
        dataObj.error = "This field is empty";
        isValid = false;
      } else {
        dataObj.error = "";
      }
      error.push(dataObj);
      continue;
    }

    error.push(dataObj);
  }

  // if(data[1]){
  //     {if (validator.isEmpty(data[1].answer.toString()))
  //         error.answer = "This Field is Empty"
  //     }
  // }
  console.log("------", error, isValid);
  return { error, isValid };
}

export default ActivityDetailValidate;
