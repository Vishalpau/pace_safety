import validator from "validator";

function HazardiousActsValidation(data) {
  let isValid = true;
  const error = {};
  console.log(data.supervision.rcaSubType);

  if (validator.isEmpty(data.supervision.rcaRemark.toString())) {
    error.supervision = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.workpackage.rcaRemark.toString())) {
    error.workpackage = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.equipmentMachinery.rcaRemark.toString())) {
    error.equipmentMachinery = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.behaviourIssue.rcaRemark.toString())) {
    error.behaviourIssue = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.safetyIssues.rcaRemark.toString())) {
    error.safetyIssues = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.ergonimics.rcaRemark.toString())) {
    error.ergonimics = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.procedures.rcaRemark.toString())) {
    error.procedures = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.others.rcaRemark.toString())) {
    error.others = "This Field is Empty";
    isValid = false;
  }

  console.log(error);
  return { error, isValid };
}

export default HazardiousActsValidation;
