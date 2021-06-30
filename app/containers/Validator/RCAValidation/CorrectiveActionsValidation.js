import validator from "validator";

function CorrectiveActionValidation(data) {
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.managementControl.rcaSubType)) {
    error.managementControl = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.regionSupport.remarkType)) {
    error.regionSupport = "This Field is Empty";
    isValid = false;
  }

  return { error, isValid };
}

export default CorrectiveActionValidation;
