import validator from "validator";

function BasicCauseValidation(data) {
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.personal.rcaRemark.toString())) {
    error.personal = "Select at least one checkbox";
    isValid = false;
  }

  if (validator.isEmpty(data.wellnessFactors.rcaRemark.toString())) {
    error.wellnessFactors = "Select at least one checkbox";
    isValid = false;
  }

  if (validator.isEmpty(data.otherHumanFactor.rcaRemark.toString())) {
    error.otherHumanFactor = "Fill other human factor";
    isValid = false;
  }

  if (validator.isEmpty(data.leadership.rcaRemark.toString())) {
    error.leadership = "Select at least one checkbox";
    isValid = false;
  }

  if (validator.isEmpty(data.processes.rcaRemark.toString())) {
    error.processes = "Select at least one checkbox";
    isValid = false;
  }

  if (validator.isEmpty(data.otherJobFactors.rcaRemark.toString())) {
    error.otherJobFactors = "Fill other job factor";
    isValid = false;
  }

  console.log(error);
  return { error, isValid };
}

export default BasicCauseValidation;
