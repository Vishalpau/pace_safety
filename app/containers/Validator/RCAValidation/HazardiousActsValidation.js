import validator from "validator";

function HazardiousActsValidation(data) {
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.supervision.rcaRemark.toString())) {
    error.supervision = "Select at least one checkbox";
    isValid = false;
  }

  if (validator.isEmpty(data.workpackage.rcaRemark.toString())) {
    error.workpackage = "Select at least one checkbox";
    isValid = false;
  }

  if (validator.isEmpty(data.equipmentMachinery.rcaRemark.toString())) {
    error.equipmentMachinery = "Select at least one checkbox";
    isValid = false;
  }

  if (validator.isEmpty(data.behaviourIssue.rcaRemark.toString())) {
    error.behaviourIssue = "Select at least one checkbox";
    isValid = false;
  }

  if (validator.isEmpty(data.safetyIssues.rcaRemark.toString())) {
    error.safetyIssues = "Select at least one checkbox";
    isValid = false;
  }

  if (validator.isEmpty(data.ergonimics.rcaRemark.toString())) {
    error.ergonimics = "Select at least one checkbox";
    isValid = false;
  }

  if (validator.isEmpty(data.procedures.rcaRemark.toString())) {
    error.procedures = "Select at least one checkbox";
    isValid = false;
  }

  if (validator.isEmpty(data.others.rcaRemark.toString())) {
    error.others = "Fill the other field";
    isValid = false;
  }
  return { error, isValid };
}

export default HazardiousActsValidation;
