import validator from "validator";

function RootCauseValidation(data) {
  console.log(data);
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.causeOfIncident)) {
    error.causeOfIncident = " please enter cause of incident";
    isValid = false;
  }

  if (validator.isEmpty(data.correctiveAction)) {
    error.correctiveAction = "please enter corrective action";
    isValid = false;
  }

  if (validator.isEmpty(data.wouldItPreventIncident)) {
    error.wouldItPreventIncident = "please enter, field is empty";
    isValid = false;
  }

  if (data.wouldItPreventIncident === "No" && validator.isEmpty(data.recommendSolution)) {
    error.recommendSolution = "please enter recommended solution";
    isValid = false;
  }

  console.log(error);
  return { error, isValid };
}

export default RootCauseValidation;
