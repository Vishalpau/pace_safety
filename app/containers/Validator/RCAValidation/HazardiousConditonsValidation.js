import validator from "validator";

function HazardiousConditionsValidation(data) {
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.warningSystem.rcaSubType)) {
    error.warningSystem = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.energyTypes.rcaSubType)) {
    error.energyTypes = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.tools.rcaSubType)) {
    error.tools = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.safetyitems.rcaSubType)) {
    error.safetyitems = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.others.rcaSubType)) {
    error.others = "This Field is Empty";
    isValid = false;
  }

  console.log(error);
  return { error, isValid };
}

export default HazardiousConditionsValidation;
