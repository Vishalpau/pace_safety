import validator from "validator";

function RootCauseValidation(data) {
  console.log(data);
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.causeOfIncident)) {
    error.causeOfIncident = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.correctiveAction)) {
    error.correctiveAction = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.wouldItPreventIncident)) {
    error.wouldItPreventIncident = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.recommendSolution)) {
    error.recommendSolution = "This field is empty";
    isValid = false;
  }

  console.log(error);
  return { error, isValid };
}

export default RootCauseValidation;
