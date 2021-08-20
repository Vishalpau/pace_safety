import { is } from "immutable";
import validator from "validator";

function LessionLearnedValidator(data) {
  let isValid = true;
  const error = {};

  for (let i = 0; i < data.length; i++) {
    if (validator.isEmpty(data[i].teamOrDepartment.toString())) {
      error[`teamOrDepartment${[i]}`] = "Please select team or department";
      isValid = false;
    }
    if (validator.isEmpty(data[i].learnings.toString())) {
      error[`learnings${[i]}`] = "Please enter Team/Department learnings";
      isValid = false;
    }
  }

  return { error, isValid };
}

export default LessionLearnedValidator;
