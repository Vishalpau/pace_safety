import validator from "validator";

function CorrectiveActionValidation(data) {
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.managementControl.rcaRemark.toString())) {
    error.managementControl = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.regionSupport.rcaRemark.toString())) {
    error.regionSupport = "This field is empty";
    isValid = false;
  }

  return { error, isValid };
}

export default CorrectiveActionValidation;
