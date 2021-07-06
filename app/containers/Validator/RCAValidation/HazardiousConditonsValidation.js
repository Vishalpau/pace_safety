import validator from "validator";

function HazardiousConditionsValidation(data) {
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.warningSystem.rcaRemark.toString())) {
    error.warningSystem = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.energyTypes.rcaRemark.toString())) {
    error.energyTypes = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.tools.rcaRemark.toString())) {
    error.tools = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.safetyitems.rcaRemark.toString())) {
    error.safetyitems = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.others.rcaRemark.toString())) {
    error.others = "This field is empty";
    isValid = false;
  }

  console.log(error);
  return { error, isValid };
}

export default HazardiousConditionsValidation;
