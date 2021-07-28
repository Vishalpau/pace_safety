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

  if (data.injuryObject.length !== 0 && data.injuryObject.length > 255) {
    error.injuryObject = "Please fill less than 255 characters in injury object";
  }

  if (data.injuryStatus.length !== 0 && data.injuryStatus.length > 75) {
    error.injuryStatus = "Please fill less than 75 characters in injury status";
  }

  if (data.reasonForTestNotDone.length !== 0 && data.reasonForTestNotDone.length > 255) {
    error.reasonForTestNotDone = "Please fill less than 255 characters in injury status";
  }

  if (data.supervisorName.length !== 0 && data.supervisorName.length > 75) {
    error.supervisorName = "Please fill less than 45 characters in supervisor name";
  }

  if (data.attachments !== null) {
    if (data.attachments.name.split('.')[0] !== "png" || data.attachments.name.split('.')[0] !== "jpg") {
      error.attachments = "Only jpg and png allowed";
    }
  }
  console.log(error)
  return { error, isValid };
}

export default WorkerDetailValidator;
