import validator from "validator";

function BasicCauseValidation(data) {
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.personal.rcaRemark.toString())) {
    error.personal = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.wellnessFactors.rcaRemark.toString())) {
    error.wellnessFactors = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.otherHumanFactor.rcaRemark.toString())) {
    error.otherHumanFactor = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.leadership.rcaRemark.toString())) {
    error.leadership = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.processes.rcaRemark.toString())) {
    error.processes = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.otherJobFactors.rcaRemark.toString())) {
    error.otherJobFactors = "This field is empty";
    isValid = false;
  }

  console.log(error);
  return { error, isValid };
}

export default BasicCauseValidation;
