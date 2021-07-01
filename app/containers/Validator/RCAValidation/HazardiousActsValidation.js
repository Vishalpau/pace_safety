import validator from "validator";

function HazardiousActsValidation(data) {
  let isValid = true;
  const error = {};
  console.log(data.supervision.rcaSubType);

  if (validator.isEmpty(data.supervision.rcaSubType)) {
    error.supervision = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.workpackage.rcaSubType)) {
    error.workpackage = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.equipmentMachinery.rcaSubType)) {
    error.equipmentMachinery = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.behaviourIssue.rcaSubType)) {
    error.behaviourIssue = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.safetyIssues.rcaSubType)) {
    error.safetyIssues = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.ergonimics.rcaSubType)) {
    error.ergonimics = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.procedures.rcaSubType)) {
    error.procedures = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.others.rcaSubType)) {
    error.others = "This Field is Empty";
    isValid = false;
  }

  console.log(error);
  return { error, isValid };
}

export default HazardiousActsValidation;
