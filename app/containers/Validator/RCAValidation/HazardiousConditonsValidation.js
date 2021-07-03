import validator from "validator";

function HazardiousConditionsValidation(data) {
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.warningSystem.rcaRemark.toString())) {
    error.warningSystem = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.energyTypes.rcaRemark.toString())) {
    error.energyTypes = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.tools.rcaRemark.toString())) {
    error.tools = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.safetyitems.rcaRemark.toString())) {
    error.safetyitems = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.others.rcaRemark.toString())) {
    error.others = "This Field is Empty";
    isValid = false;
  }

  console.log(error);
  return { error, isValid };
}

export default HazardiousConditionsValidation;
