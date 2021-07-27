import { is } from "immutable";
import validator from "validator";

function WorkerDetailValidator(data) {

  let isValid = true;
  const error = {};
  if (validator.isEmpty(data.name.toString())) {
    error.name = "Please fill name";
    isValid = false;
  }

  if (validator.isEmpty(data.workerType.toString())) {
    error.workerType = "Please fill worker type";
    isValid = false;
  }
  if (validator.isEmpty(data.department.toString())) {
    error.department = "Please fill department";
    isValid = false;
  }


  return { error, isValid };
}

export default WorkerDetailValidator;
