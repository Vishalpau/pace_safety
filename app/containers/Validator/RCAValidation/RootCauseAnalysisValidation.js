import validator from "validator";

function RootCauseValidation(data) {
  console.log(data);
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.causeOfIncident)) {
    error.causeOfIncident = "Fill the information";
    isValid = false;
  }

  if (validator.isEmpty(data.correctiveAction)) {
    error.correctiveAction = "Fill the information";
    isValid = false;
  }

  if (validator.isEmpty(data.wouldItPreventIncident)) {
    error.wouldItPreventIncident = "This field is empty";
    isValid = false;
  }

  if (data.wouldItPreventIncident === "Yes" && validator.isEmpty(data.recommendSolution)) {
    error.recommendSolution = "Fill the information";
    isValid = false;
  }

  console.log(error);
  return { error, isValid };
}

export default RootCauseValidation;
