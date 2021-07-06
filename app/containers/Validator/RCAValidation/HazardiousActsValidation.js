import validator from "validator";

function HazardiousActsValidation(data) {
  let isValid = true;
  const error = {};
  console.log(data.supervision.rcaSubType);

  if (validator.isEmpty(data.supervision.rcaRemark.toString())) {
    error.supervision = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.workpackage.rcaRemark.toString())) {
    error.workpackage = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.equipmentMachinery.rcaRemark.toString())) {
    error.equipmentMachinery = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.behaviourIssue.rcaRemark.toString())) {
    error.behaviourIssue = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.safetyIssues.rcaRemark.toString())) {
    error.safetyIssues = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.ergonimics.rcaRemark.toString())) {
    error.ergonimics = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.procedures.rcaRemark.toString())) {
    error.procedures = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.others.rcaRemark.toString())) {
    error.others = "This field is empty";
    isValid = false;
  }

  console.log(error);
  return { error, isValid };
}

export default HazardiousActsValidation;
