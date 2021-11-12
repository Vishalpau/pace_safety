import { is } from "immutable";
import validator from "validator";

function LessionLearnedValidator(data) {
  let isValid = true;
  const error = {};

  for (let i = 0; i < data.length; i++) {
    if (validator.isEmpty(data[i].teamOrDepartment.toString())) {
      error[`teamOrDepartment${[i]}`] = "Please enter cause";
      isValid = false;
    }
    if (validator.isEmpty(data[i].learnings.toString())) {
      error[`learnings${[i]}`] = "Please enter learnings";
      isValid = false;
    }
    if(data[i].teamOrDepartment.length>64){
      error[`teamOrDepartment${[i]}`] = "Ensure this field has no more than 65 characters";
      isValid = false;
    }
  }

  return { error, isValid };
}

export default LessionLearnedValidator;
