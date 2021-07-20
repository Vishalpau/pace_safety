import { is } from "immutable";
import validator from "validator";

function WorkerDetailValidator(data) {
  // console.log(data);
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.name.toString())) {
    error.name = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.workerType.toString())) {
    error.workerType = "This field is empty";
    isValid = false;
  }
  if (validator.isEmpty(data.department.toString())) {
    error.department = "This field is empty";
    isValid = false;
  }

  // const result =

  // console.log("roor", error, isValid);
  return { error, isValid };
}

export default WorkerDetailValidator;
