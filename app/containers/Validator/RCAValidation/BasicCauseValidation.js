import validator from "validator";

function BasicCauseValidation(data) {
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.personal.rcaSubType)) {
    error.personal = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.wellnessFactors.rcaSubType)) {
    error.wellnessFactors = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.otherHumanFactor.rcaSubType)) {
    error.otherHumanFactor = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.leadership.rcaSubType)) {
    error.leadership = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.processes.rcaSubType)) {
    error.processes = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.otherJobFactors.rcaSubType)) {
    error.otherJobFactors = "This Field is Empty";
    isValid = false;
  }

  console.log(error);
  return { error, isValid };
}

export default BasicCauseValidation;
