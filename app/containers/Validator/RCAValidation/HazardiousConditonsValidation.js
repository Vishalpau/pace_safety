import validator from "validator";

function HazardiousConditionsValidation(data) {
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.warningSystem.rcaRemark.toString())) {
    error.warningSystem = "Select at least one checkbox";
    isValid = false;
  }

  if (validator.isEmpty(data.energyTypes.rcaRemark.toString())) {
    error.energyTypes = "Select at least one checkbox";
    isValid = false;
  }

  if (validator.isEmpty(data.tools.rcaRemark.toString())) {
    error.tools = "Select at least one checkbox";
    isValid = false;
  }

  if (validator.isEmpty(data.safetyitems.rcaRemark.toString())) {
    error.safetyitems = "Select at least one checkbox";
    isValid = false;
  }

  if (validator.isEmpty(data.others.rcaRemark.toString())) {
    error.others = "Fill the information";
    isValid = false;
  }

  console.log(error);
  return { error, isValid };
}

export default HazardiousConditionsValidation;
