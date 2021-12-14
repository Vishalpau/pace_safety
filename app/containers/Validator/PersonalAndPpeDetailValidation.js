import { ErrorOutlineSharp } from "@material-ui/icons";
import validator from "validator";

function PersonalAndPpeDetailValidate(data) {
  let isValid = true;
  let validateCheck = []
  const error = [];
  for (let key in data) {
    const dataObj = data[key];
    if (dataObj) {
      if (validator.isEmpty(dataObj.answer.toString())) {
        dataObj.error = "Please select any one";
        error.push(dataObj);
        validateCheck.push(false)
      } else {
        dataObj.error = "";
        error.push(dataObj)
      }
    }
  }

  if (error[0]["answer"] === "Yes") {
    error.slice(1, 4).map((value) => {
      if (value["answer"] === "N/A") {
        value["error"] = "Please select any one either YES or NO"
        validateCheck.push(false)
      } else {
        value["error"] = ""
      }
    })
  } else {
    error.slice(1, 4).map((value) => {
      value["error"] = ""
    })
  }

  if (error[9]["answer"] === "Yes") {
    error.slice(10, 12).map((value) => {
      if (value["answer"] === "N/A") {
        value["error"] = "Please select any one either YES or NO"
        validateCheck.push(false)
      } else {
        value["error"] = ""
      }
    })
  } else {
    error.slice(10, 12).map((value) => {
      value["error"] = ""
    })
  }

  isValid = validateCheck.length === 0 ? true : false

  return { error, isValid };
}

export default PersonalAndPpeDetailValidate;
