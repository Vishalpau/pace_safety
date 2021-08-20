import { is } from "immutable";
import validator from "validator";

function WorkerDetailValidator(data) {

  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.name.toString())) {
    error.name = "please enter name";
    isValid = false;
  }

  if (validator.isEmpty(data.workerType.toString())) {
    error.workerType = "please select worker type";
    isValid = false;
  }
  if (validator.isEmpty(data.department.toString())) {
    error.department = "please select department";
    isValid = false;
  }

  if (data.injuryObject.length !== 0 && data.injuryObject.length > 255) {
    error.injuryObject = "please enter less than 255 characters in injury object";
  }

  if (data.injuryStatus.length !== 0 && data.injuryStatus.length > 75) {
    error.injuryStatus = "please enter less than 75 characters in injury status";
  }

  if (data.reasonForTestNotDone.length !== 0 && data.reasonForTestNotDone.length > 255) {
    error.reasonForTestNotDone = "please enter less than 255 characters in injury status";
  }

  if (data.supervisorName.length !== 0 && data.supervisorName.length > 75) {
    error.supervisorName = "please enter less than 45 characters in supervisor name";
  }

  return { error, isValid };
}

export default WorkerDetailValidator;
