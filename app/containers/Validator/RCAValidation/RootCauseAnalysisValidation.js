import validator from "validator";

function RootCauseValidation(data) {
  console.log(data);
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.causeOfIncident)) {
    error.causeOfIncident = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.correctiveAction)) {
    error.correctiveAction = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.wouldItPreventIncident)) {
    error.wouldItPreventIncident = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.recommendSolution)) {
    error.recommendSolution = "This Field is Empty";
    isValid = false;
  }

  console.log(error);
  return { error, isValid };
}

export default RootCauseValidation;
