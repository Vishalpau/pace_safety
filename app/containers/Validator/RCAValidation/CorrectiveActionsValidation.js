import validator from "validator";

function CorrectiveActionValidation(data) {
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.managementControl.rcaRemark.toString())) {
    error.managementControl = "Select at least one checkbox";
    isValid = false;
  }

  if (validator.isEmpty(data.regionSupport.rcaRemark.toString())) {
    error.regionSupport = "Fill the information";
    isValid = false;
  }

  return { error, isValid };
}

export default CorrectiveActionValidation;
